<template>
  <div class="sketch-window">
    <!--Windows 窗口栏-->
    <WindowNavTop windowName="editor-sketch" :globalID="globalID">
      <p class="win-title">{{ 'filepath' }}</p>
    </WindowNavTop>
    <div class="sketch-box">
      <!--工具类标签卡-->
      <ul class="ctrl-tabs">
        <li class="tab" v-for="(item, index) in items" @click.stop="_collapse = true" :key="index">
          <input v-if="item.checked" type="radio" :name="name" v-model="value" :id="`radiotab_sketch_${index}`"
            :value="item.value" checked>
          <input v-else type="radio" :name="name" v-model="value" :id="`radiotab_sketch_${index}`" :value="item.value">
          <label :for="`radiotab_sketch_${index}`">{{ item.label }}</label>
        </li>
        <!--标签工具展开按钮-->
        <li class="collapse-toggle" @click="tootleCollapse">
          <jc-icon v-if="_collapse" name="collapse-up"></jc-icon>
          <jc-icon v-else name="collapse-down"></jc-icon>
        </li>
      </ul>
      <!--标签工具-->
      <div class="collapse-wrapper" v-show="_collapse">
        <!--画笔工具盒子-->
        <div v-if="value === 'pens'" class="tools-toggle-box">
          <div class="base-tools-wrapper">
            <ul class="base-tools">
              <li ref="selector">
                <jc-icon name="select-outline"></jc-icon>
                <p>选择工具</p>
              </li>
              <li ref="eraser">
                <jc-icon name="eraser-color"></jc-icon>
                <p>笔画橡皮</p>
              </li>
              <li ref="trapTool">
                <jc-icon name="trap-tool-color"></jc-icon>
                <p>套索工具</p>
              </li>
              <li ref="pen">
                <jc-icon name="pen-color"></jc-icon>
                <p>钢笔工具</p>
              </li>
            </ul>
          </div>

          <hr>
          <ul class="pen-selector">

          </ul>
        </div>
        <!--操作工具盒子-->
        <div v-else-if="value === 'actions'" class="tools-toggle-box">
          <p>{{ value }}</p>
        </div>
        <!--视图工具盒子-->
        <div v-else-if="value === 'views'" class="tools-toggle-box">
          <p>{{ value }}</p>
        </div>
        <!--帮助工具盒子-->
        <div v-else-if="value === 'helps'" class="tools-toggle-box">
          <p>{{ value }}</p>
        </div>
        <div v-else class="tools-toggle-box">
          【错误】未知工具盒子：<p>{{ value }}</p>
        </div>
      </div>


      <!--内容区域-->
      <div class="contents">

        <!--左侧快速形状-->
        <div :class="['quick-shapes', { 'quick-shapes-hide': !openSideBar, 'quick-shapes-show': openSideBar }]">
          <div class="side-bar-skech" v-if="openSideBar">
            <h2>模板库</h2>
            <input type="text" placeholder="搜索形状">

            <ul class="shap-selector">
              <li 
                v-for="(item, index) in templates" 
                :key="index"
                @click="shapPewviewRefresh(item.children)"
              >
                {{item.title}}
              </li>
            </ul>
            <hr>
            <h4>基本形状</h4>
            <ul class="shap-preview" v-if="showPreviewSPData">
              <p>{{previewSPData}}</p>
              <li v-for="(item, index) in previewSPData" :key="index">
                <jc-icon :name="item.icon"></jc-icon>
                <p>{{ item.title }}</p>
              </li>

              <!-- <li>
                <jc-icon name="shape-rectangle"></jc-icon>
                <p>矩形</p>
              </li>
              <li>
                <jc-icon name="shape-square"></jc-icon>
                <p>正方形</p>
              </li>
              <li >
                <jc-icon name="shape-circle"></jc-icon>
                <p>圆形</p>
              </li>
              <li>
                <p>椭圆形</p>
              </li>
              <li>
                <jc-icon name="shape-right-triangle"></jc-icon>
                <p>直角三角形</p>
              </li>
              <li>
                <jc-icon name="shape-triangle"></jc-icon>
                <p>三角形</p>
              </li> -->
              
            </ul>
          </div>
        </div>

        <!--画板-->
        <div class="canvas-box">
          <div :class="['side-bar-skech-toggle', {'side-bar-skech-toggle-open':openSideBar,'side-bar-skech-toggle-close':!openSideBar, }]" @click.stop="openSideBar = !openSideBar">
            <jc-icon v-if="openSideBar" name="arrow-double-left-color"></jc-icon>
            <jc-icon v-else name="arrow-double-right-color"></jc-icon>
          </div>
          <canvas ref="sketchCanvas" width=300 height=300></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";
import WindowNavTop from '@components/NavBarWindowTop/Index.vue';
import { GLOBAL_WINDOW_ID } from '@index/enums/cache_enums';

export default defineComponent({
  components: { WindowNavTop },
  props: {
    toolDatas: {
      default: {
        name: "radiotab_sketch",
        value: "",
        items: [
          { label: "画笔", value: "pens", checked: true },
          { label: "操作", value: "actions", checked: false },
          { label: "视图", value: "views", checked: false },
          { label: "帮助", value: "helps", checked: false },
        ]
      }
    },
    collapse: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    let toolDatas = props.toolDatas;
    let value = props.toolDatas.value;
    value = (toolDatas.items[0] as { label: string, value: string, checked?: boolean }).value;
    // let _collapse = ;
    let eraserEnabled = ref(false);
    let lineWidth = ref(0);
    let context = reactive({});
    let myCanvas = reactive({});
    let globalID = ref(localStorage.getItem(GLOBAL_WINDOW_ID));
    localStorage.setItem(GLOBAL_WINDOW_ID, '')
    return {
      globalID,
      name: toolDatas.name,
      value: ref(value),
      items: toolDatas.items,
      _collapse: ref(props.collapse),
      openSideBar: ref(true),
      eraserEnabled,
      lineWidth,
      myCanvas,
      context,
      showPreviewSPData:ref(false),
      previewSPData:reactive({}),
      templates: [
        { title: "快速形状", children:[] },
        { title: "基本形状", children:[
          {title:"矩形", icon:"shape-rectangle"},
          {title:"正方形", icon:"shape-square"},
          {title:"圆形", icon:"shape-circle"},
          {title:"椭圆形", icon:"shape-rectangle"},
          {title:"直角三角形", icon:"shape-right-triangle"},
          {title:"三角形", icon:"shape-shape-triangle"},
        ] },
        { title: "图案形状", children:[] },
        { title: "箭头形状", children:[] },
        { title: "我的形状", children:[] },
        { title: "工程", children:[] },
        { title: "常规", children:[] },
      ]
    };
  },
  methods: {
    tootleCollapse() {
      this._collapse = !this._collapse;
    },

    shapPewviewRefresh(datas){
      this.showPreviewSPData = true;
      console.log("previewSPData =",this.previewSPData);
      
      this.previewSPData = datas
    },

    /**重置Canvas尺寸 */
    setCanvasSize(canvas) {
      let pageWidth = document.documentElement.clientWidth
      let pageHeight = document.documentElement.clientHeight

      canvas.width = pageWidth
      canvas.height = pageHeight
    },
    /**更具窗口变化进行尺寸调整 */
    autoSetCanvasSize(canvas) {
      this.setCanvasSize(canvas)
      window.onresize = function () {
        this.setCanvasSize(canvas)
      }
    },
    /**绘制圆形 */
    drawCircle(x, y, radius) {
      this.context.beginPath()
      this.context.arc(x, y, radius, 0, Math.PI * 2);
      this.context.fill()
    },
    /**绘制直线 */
    drawLine(x1, y1, x2, y2) {
      this.context.beginPath();
      this.context.moveTo(x1, y1) // 起点
      this.context.lineWidth = this.lineWidth
      this.context.lineTo(x2, y2) // 终点
      this.context.stroke()
      this.context.closePath()
    },
    listenToUser(canvas) {
      let using = false
      let lastPoint = {
        x: undefined,
        y: undefined
      }
      // 特性检测
      if (document.body.ontouchstart !== undefined) {
        // 触屏设备 苏菲就是个触屏设备啊哥
        canvas.ontouchstart = function (aaa) {
          let x = aaa.touches[0].clientX
          let y = aaa.touches[0].clientY
          console.log(x, y)
          using = true
          if (this.eraserEnabled) {
            this.context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            lastPoint = {
              "x": x,
              "y": y
            }
          }
        }
        canvas.ontouchmove = function (aaa) {
          console.log('边摸边动')
          let x = aaa.touches[0].clientX
          let y = aaa.touches[0].clientY

          if (!using) { return }

          if (this.eraserEnabled) {
            this.context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            let newPoint = {
              "x": x,
              "y": y
            }
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        }
        canvas.ontouchend = function () {
          console.log('摸完了')
          using = false
        }
      } else {
        // 非触屏设备
        canvas.onmousedown = function (aaa) {
          let x = aaa.clientX
          let y = aaa.clientY
          using = true
          if (this.eraserEnabled) {
            this.context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            lastPoint = {
              "x": x,
              "y": y
            }
          }
        }
        canvas.onmousemove = function (aaa) {
          let x = aaa.clientX
          let y = aaa.clientY

          if (!using) { return }

          if (this.eraserEnabled) {
            this.context.clearRect(x - 5, y - 5, 10, 10)
          } else {
            let newPoint = {
              "x": x,
              "y": y
            }
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        }
        canvas.onmouseup = function (aaa) {
          using = false
        }
      }
    },
    // **************** 事件回调们
    penOnclick() {
      this.eraserEnabled = false
      this.pen.classList.add('active')
      this.eraser.classList.remove('active')
    },
    /**橡皮擦 */
    eraserOnclick() {
      this.eraserEnabled = true
      this.eraser.classList.add('active')
      this.pen.classList.remove('active')
    },
    /**清空画板 */
    clearOnclick() {
      this.context.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    },
    /**下载图片 */
    downloadOnclick() {
      let url = this.myCanvas.toDataURL("image/png")
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.href = url
      a.download = '我的画儿'
      a.target = '_blank'
      a.click()
    },
    /**细画笔 */
    thinOnclick() {
      this.lineWidth = 5
    },
    /**粗画笔 */
    thickOnclick() {
      this.lineWidth = 10
    },
    /**红色 */
    redOnclick() {
      this.context.fillStyle = 'red'
      this.context.strokeStyle = 'red'
      // red.classList.add('active')
      // green.classList.remove('active')
      // blue.classList.remove('active')
    },
    /**绿色 */
    greenOnclick() {
      this.context.fillStyle = 'green'
      this.context.strokeStyle = 'green'
      // red.classList.remove('active')
      // green.classList.add('active')
      // blue.classList.remove('active')
    },
    /**蓝色 */
    blueOnclick() {
      this.context.fillStyle = 'blue'
      this.context.strokeStyle = 'blue'
      // red.classList.remove('active')
      // green.classList.remove('active')
      // blue.classList.add('active')
    }
  },
  mounted() {
    // let yyy = document.getElementById('xxx');
    this.myCanvas = this.$refs.sketchCanvas;
    this.context = this.myCanvas.getContext('2d');
    this.lineWidth = 5
    this.autoSetCanvasSize(this.myCanvas)
    this.listenToUser(this.myCanvas)
    this.eraserEnabled = false;
  }
});
</script>

<style lang="scss" scoped>
.sketch-window {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  p.win-title {
    color: #cccccc;
  }
}

.sketch-box {
  width: 100%;
  height: 100%;
  flex-flow: 1;
  // padding: 9px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;




  /**标签 */
  ul.ctrl-tabs {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    background-color: #3955A3;
    list-style: none;

    li.tab {
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: center;
      user-select: none;
      cursor: pointer;

      input[type="radio"] {
        outline: none;
        appearance: none;
        -webkit-appearance: none;
        position: absolute;
      }

      input[type="radio"]:checked {
        &~label {
          color: #3955A3;
          background-color: #F3F3F3;
          font-weight: bold;
        }
      }

      label {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;

        &:hover {
          background-color: #0a1a46;
        }
      }
    }

    li.collapse-toggle {
      position: absolute;
      right: 9px;
      user-select: none;
      width: 26px;
      height: 21px;
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      font-size: 19px;
      cursor: pointer;
      color: #d1d1d1;

      &:hover {
        background-color: #344164;
      }
    }
  }

  /**画笔工具盒子 */
  .tools-toggle-box {
    width: 100%;
    height: 100px;
    // margin: 3px 0 0 0;
    background-color: #F3F3F3;
    display: flex;
    flex-direction: row;

    .base-tools-wrapper {
      height: 90px;
      width: 320px;

      ul.base-tools {
        display: grid;
        grid-gap: 6px;
        grid: 50% / auto auto auto;

        li {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          user-select: none;
          cursor: pointer;
          border: transparent 1px dashed;

          &:hover {
            border: #344164 1px dashed;
          }
        }
      }
    }

    ul.pen-selector {}
  }

  /**内容区 */
  .contents {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-grow: 1;
    background-color: #cdcdcd;

    .quick-shapes {
      height: 100%;
      background-color: #dfdfdf;
      padding: 6px 9px 0 9px;
      .side-bar-skech {
        display: flex;
        flex-direction: column;
      
        h2 {
          user-select: none;
          color: #3955A3;
        }

        input {
          width: 95%;
        }

        ul.shap-selector{
          display: flex;
          flex-direction: column;
          li {
            width: 100%;
            cursor: pointer;
            // padding-left: 9px;
            &:hover {
              background-color: #b8cbff;
            }
          }
        }
        h4 {
          user-select: none;
          color: #3955A3;
        }
        ul.shap-preview{
          display: grid;
          grid-gap: 1px;
          grid: repeat(3,40px) / auto auto auto;
          li {
            cursor: move;
            list-style: none;
            user-select: none;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            &:hover {
              background-color: #d2deff;
            }
            span {
              font-size: 23px;
              padding: 0 3px 0 1px;
            }
            p {
              font-size: 12px;
            }
          }
          
        }
      }
    }

    .quick-shapes-show {
      min-width: 256px;
    }

    .quick-shapes-hide {
      width: 0px;
    }

    .canvas-box {
      height: 100%;
      width: 0;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      /**切换按钮 */
      .side-bar-skech-toggle {
        width: 19px;
        height: 19px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 6px;
        
        z-index: 2;

        &:hover {
          background-color: #92afff;
        }
      }
      .side-bar-skech-toggle-open {
        left: -26px;
      }
      .side-bar-skech-toggle-close {
        left: 9px;
        background-color: #EBEBEB;
      }

      canvas {
        height: 100%;
        width: 100%;
        flex-flow: 1;
        display: block;
        background: rgb(170, 170, 170);
        // position: fixed;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>