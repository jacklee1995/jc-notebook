<template>
  <div class="markdown-window">
    <WindowNavTop windowName="editor-markdown">
      <template v-slot:left>
        <ul class="top-ctrl">
          <li><jc-icon name="save"></jc-icon></li>
          <li><jc-icon name="action-undo"></jc-icon></li>
          <li><jc-icon name="action-restore"></jc-icon></li>
        </ul>
      </template>
      <template v-slot:title>
        <div class="win-title">
          <p >{{ basename }}</p>
          <jc-icon v-show="unsave" name="dot" ></jc-icon>
        </div>
        
        
      </template>
    </WindowNavTop>
    <div class="markdown-editor">
      <ul class="ctrl-tabs">
        <li class="tab" v-for="(item, index) in items" @click.stop="_collapse = true" :key="index">
          <input v-if="item.checked" type="radio" :name="name" v-model="value" :id="`radiotab_sketch_${index}`"
            :value="item.value" checked>
          <input v-else type="radio" :name="name" v-model="value" :id="`radiotab_sketch_${index}`" :value="item.value">
          <label :for="`radiotab_sketch_${index}`">{{ item.label }}</label>
        </li>
        <!--标签工具展开按钮-->
        <li class="collapse-toggle" @click="_collapse = !_collapse">
          <jc-icon v-if="_collapse" name="collapse-up"></jc-icon>
          <jc-icon v-else name="collapse-down"></jc-icon>
        </li>
      </ul>

      <div class="collapse-wrapper" v-show="_collapse">
        <!--画笔工具盒子-->
        <div v-if="value === 'files'" class="tools-toggle-box">
          <div class="base-tools-wrapper">
            <ul class="base-tools">
              <li ref="selector" @click="newMarkdownFile"><jc-icon name="file"></jc-icon>
                <p>新建</p>
              </li>
              <li ref="openfile" @click="openFile"><jc-icon name="folder-open"></jc-icon>
                <p>打开</p>
              </li>
              <li ref="savefile" @click="saveValue"><jc-icon name="save"></jc-icon>
                <p>保存</p>
              </li>
              <li ref="savefileas" @click="saveAs" >
                <p>另存为</p>
              </li>
              <li ref="export" @click="exportAs"><jc-icon name="save"></jc-icon>
                <p>导出</p>
              </li>
              <li ref="closefile" @click="close"><jc-icon name="close-circle-color"></jc-icon>
                <p>关闭</p>
              </li>
              <li ref="renamefile">
                <p>重命名</p>
              </li>
              <li ref="sharefile"><jc-icon name="share"></jc-icon>
                <p>共享</p>
              </li>
              <li ref="printfile"><jc-icon name="printer"></jc-icon>
                <p>打印</p>
              </li>
            </ul>
          </div>

          <hr>
          <ul class="pen-selector">

          </ul>
        </div>
        <!--开始工具盒子-->
        <div v-else-if="value === 'start'" class="tools-toggle-box">
          <p>{{ value }}</p>
        </div>
        <!--插入工具盒子-->
        <div v-else-if="value === 'insert'" class="tools-toggle-box">
          <p>{{ value }}</p>
        </div>
        <!--视图工具盒子-->
        <div v-else-if="value === 'views'" class="tools-toggle-box">
          <ul class="vies-mode">
            <li @click="toggleMode(1)">
              <input name="viewmode" value="同屏" />
            </li>
            <li @click="toggleMode(2)">全屏</li>
            <li @click="toggleMode(3)">预览</li>
          </ul>
        </div>
        <!--发布工具盒子-->
        <div v-else-if="value === 'publish'" class="tools-toggle-box">
        </div>
        <!--帮助工具盒子-->
        <div v-else-if="value === 'helps'" class="tools-toggle-box">
          <div class="card">
            <jc-icon name="help-circle"></jc-icon>
            <P>帮助</P>
          </div>
          <div class="card">
            <jc-icon name="meme-smile"></jc-icon>
            <P>反馈</P>
          </div>
          <hr>
        </div>
        <div v-else class="tools-toggle-box">
          【错误】未知工具盒子：<p>{{ value }}</p>
        </div>
      </div>
      <div class="code-editor">
        <!--编辑器区域-->
        <div :class="{ 'editor-box': true, 'hide-elem': mode === 3, 'show-elem': mode === 2, 'elem-harf': mode === 1 }">
          <EditorVue :init_value="init_value" ref="monacoEditor" />
        </div>
        <!--视图器区域-->
        <div :class="{ 'viewer-box': true, 'hide-elem': mode === 2, 'show-elem': mode === 3, 'elem-harf': mode === 1 }">
          <ViewerVue ref="viewer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ViewerVue from './Viewer.vue';
import EditorVue from './Editor.vue';
import example from "./md-example";
import WindowNavTop from '../../components/NavBarWindowTop/Index.vue';
import { IS_FIRST_OPEN_MARKDOWN_EDITOR } from '../../constants/cache_enums';
const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require('electron');
import { setupOpenFileIpc } from './path_ipc';


export default defineComponent({
  components: { ViewerVue, EditorVue, WindowNavTop },
  props: {
    path: {
      type: String,
      default: ''
    },
    init_value: {
      type: String,
      default: ""
    },
    toolDatas: {
      default: {
        name: "radiotab_sketch",
        value: "",
        items: [
          { label: "文件", value: "files", checked: true },
          { label: "开始", value: "start", checked: false },
          { label: "插入", value: "insert", checked: false },
          { label: "视图", value: "views", checked: false },
          { label: "发布", value: "publish", checked: false },
          { label: "帮助", value: "helps", checked: false },
        ]
      }
    },
    collapse: {
      type: Boolean,
      default: true,
    }
  },
  setup(props) {
    let starttingScrollFromEditor = false;
    let starttingScrollFromViewer = false;
    let filepath = ref(props.path);
    let toolDatas = props.toolDatas;
    let value = props.toolDatas.value;
    value = (toolDatas.items[0] as { label: string, value: string, checked?: boolean }).value;

    return {
      mode: ref(1),
      init_value: props.init_value,
      starttingScrollFromEditor,
      starttingScrollFromViewer,
      filepath,
      basename: ref(''),
      value: ref(value),
      name: toolDatas.name,
      items: toolDatas.items,
      _collapse: ref(props.collapse),
      unsave:ref(false)
    };
  },
  mounted() {
    // 初始使用编辑器
    const isFirstOpen = localStorage.getItem(IS_FIRST_OPEN_MARKDOWN_EDITOR);
    if (!isFirstOpen) {
      this.init_value = example.example;
    } else {
      this.init_value = ''
    }

    localStorage.setItem(IS_FIRST_OPEN_MARKDOWN_EDITOR, "NOT");

    // 如果是新建文件
    if (this.filepath === '') {
      setupOpenFileIpc()
        .then(
          (_path: string) => {
            this.filepath = _path;
            this.basename = path.basename(_path);
            // 非新建文件，这种一般是从系统打开文件，可直接读取
            if(this.filepath !== 'new-file'){
              this.setValue(this.readFile(_path));
            }
            // 新建文件（无文件路径）
            else{
              // 标记文件未保存
              this.unsave = true;
            }
          }
        )
    } 
    
    // 否则直接打开文件
    else {
      this.init_value = this.readFile(this.filepath)
    }
  },
  methods: {
    getCurrentWindow(){
      return require('@electron/remote').getCurrentWindow();
    },
    windowClose(){
      const id = this.getCurrentWindow().id;
      ipcRenderer.send("ipc-window-manager-by-id",{
        action: 'hide',
        id: id
      })
    },
    /**重置编辑器文本 */
    setValue(value: string): void {
      (this.$refs.monacoEditor as any).setValue(value);
    },
    /**获取编辑器中的文本 */
    getValue(): string {
      return (this.$refs.monacoEditor as any).getValue();
    },
    saveValue() {
      const value = (this.$refs.monacoEditor  as any).getValue();
      if(this.filepath==='new-file'){
        ipcRenderer.send('select-path-to-savefile',{
          title:'new-file',
          filePath:this.filepath
        })
        console.log('value =',value);
      }
      else{
        console.log('value =',value);
        
      }

      // 文件保存后，标记文件已经保存
      this.unsave = false;
    },
    saveAs(){

    },
    exportAs(){

    },
    close(){
      this.windowClose()
    },
    readFile(filepath: string) {
      return fs.readFileSync(filepath).toString();
    },
    // 用于切换是否显示行号
    toggleLinNum() {
      (this.$refs.monacoEditor as any).toggleLineNumBar();
    },
    // 用于切换是否使用代码地图
    toggleCodeMap() {
      (this.$refs.monacoEditor as any).toggleCodeMap();
    },
    // 用于切换编辑器显示模式
    toggleMode(mode: number) {
      this.mode = mode;
    },
    onChangeContent(str: string) {
      this.unsave = true; // 标记改动为保存
      (this.$refs.viewer as any).contentChanged(str)
    },
    getMarkdownContent() {
      return (this.$refs.monacoEditor as any).getMarkdownContent();
    },
    setViewerScroll(rate: number) {
      // TODO:由于离开页面导致 this.$refs.xx 的 BUG 暂时通过刷新解决，之后需要考察是否有其它方式
      (this.$refs.viewer as any).setViewerScroll(rate)
    },
    setEditorScroll(rate: number) {
      (this.$refs.monacoEditor as any).setEditorScroll(rate)
    },

    /**新建 Markdown 笔记 */
    newMarkdownFile() {
      ipcRenderer.send('create-new-file', 'markdown')
    },

    /**打开本地文件 */
    openFile() {
      ipcRenderer.send('select-file-or-path', 'open-files')
    }
  },

});
</script>

<style lang="scss" scoped>
$controller-height: 25px;

.markdown-window {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
ul.top-ctrl{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  li {
    list-style: none;
    span {
      -webkit-app-region: no-drag;
      color: #ffffff;
      padding: 0 6px 0 3px;
      cursor: pointer;

    }

    &:hover {
      background-color: #0a1a46;
    }
  }
}
  .win-title {
    color: #dbdbdb;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      // 文字溢出自动省略号
      max-width: 360px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.markdown-editor {
  height: 0;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  ul.ctrl-tabs {
    -webkit-app-region: drag;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    background-color: #3A476D;
    list-style: none;

    li.tab {
      -webkit-app-region: no-drag;
      width: 50px;
      height: 100%;
      display: flex;
      justify-content: center;
      user-select: none;
      cursor: pointer;
      font-size: 12px;

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
      -webkit-app-region: no-drag;
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

  .collapse-wrapper {
    .tools-toggle-box {
      width: 100%;
      height: 76px;
      // margin: 3px 0 0 0;
      background-color: #F3F3F3;
      display: flex;
      flex-direction: row;

      .base-tools-wrapper {
        // height: 90px;
        width: 210px;

        ul.base-tools {
          display: grid;
          grid:
            'auto auto auto'
            'auto auto auto'
            'auto auto auto'
            'auto auto auto'
          ;

          li {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            user-select: none;
            height: 20px;
            cursor: pointer;

            span {
              margin-right: 3px;
              color: #344164;
            }

            border: transparent 1px dashed;

            &:hover {
              border: #344164 1px dashed;
            }
          }
        }
      }

      ul.vies-mode {
        list-style: none;
        display: flex;
        flex-direction: column;

        li {
          margin: 0 2px 0 2px;
          cursor: pointer;
        }
      }

      ul.pen-selector {}

      .card {
        cursor: pointer;

        span {
          font-size: 30px;
          padding: 7px;
          color: #3955A3;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 9px;

        &:hover {
          background-color: #e2e2e2;
          color: #007ab3;
        }
      }
    }

  }

  .code-editor {
    width: 100%;
    height: 0;
    flex-grow: 1; // 占满剩下的宽度
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .editor-box {
      height: 100%;
      width: 50%;
      display: block;
      background-color: rgb(255, 241, 224);
    }

    .viewer-box {
      height: 100%;
      display: block;
      background-color: rgb(216, 216, 216);
    }

    .elem-harf {
      width: 50%;
    }

    .hide-elem {
      display: none;
    }

    .show-elem {
      width: 100%;
    }
  }
}
</style>