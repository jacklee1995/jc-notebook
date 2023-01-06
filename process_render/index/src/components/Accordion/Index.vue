<template>
  <slot name="up"></slot>
  <nav>
    <!-- 遍历一级目录 -->
    <ul v-for="(item1, index1) in datas" :key="index1" :class="['content','content1']"
      @click.stop="triggle1(`item_${index1}`)">
      
      <RouterLink v-if="item1.path" :to="item1.path">{{item1.title}}</RouterLink>
      <a v-else>{{ item1.title }}</a>
      <jc-icon  name="jcicon-down">1</jc-icon>
      

      <Slide :ref="`item_${index1}`" time="1s" :show="false">
        <ul>
          <!-- 遍历二级目录 -->
          <li v-for="(item2, index2) in item1.children" :key="index2">
            <ul :class="['content','content2']" @click.stop="triggle2(`item_${index1}_${index2}`)">
              <RouterLink v-if="item2.path" class="router-link" :to="item2.path">{{item2.title}}
              </RouterLink>
              <a v-else>{{ item2.title }}</a>
              <Slide :ref="`item_${index1}_${index2}`" time="1s" :show="false">
                <!-- 遍历三级目录 -->
                <ul :class="['content','content3']">
                  <li v-for="(item3, index3) in item2.children" :key="index3"
                    :class="['content','content3']">
                    <RouterLink v-if="item3.path" :to="item3.path">{{item3.title}}</RouterLink>
                    <a v-else>{{ item3.title }}</a>
                  </li>
                </ul>
              </Slide>
            </ul>
          </li>
        </ul>
      </Slide>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type AccordingDataType from '@index/types/accroding';
import Slide from "@index/components/Animations/SlideUpDown.vue";

export default defineComponent({
  props: ['datas'],
  components: { Slide },
  setup(props) {
    return {
      datas: props.datas as AccordingDataType,
      toggleTime: 100,
      animatePrecision: 3
    }
  },
  methods: {
    triggle1(id: string) {
        // console.log("id =",id);
        // console.log("this.$refs[id] =",this.$refs[id][0]);
        
      ((this.$refs[id] as any)[0] as any).toggle()
    },
    triggle2(id: string) {
      ((this.$refs[id] as any)[0] as any).toggle()
    }
    // toogleHide(...params: any[]) {
    //   let VDom = params[0].currentTarget.firstElementChild.nextElementSibling;
    //   if (VDom !== null) {
    //   this.toogle(VDom, this.toggleTime)
    //   }
    // },
    // toogle(element: HTMLElement, time: number) {
    //   if (element.offsetHeight === 0) {
    //   this.slideDown2(element, time)
    //   } else {
    //   this.slideUp2(element, time)
    //   }
    // },
    // slideUp2(element: HTMLElement, time: number) {
    //   let children = element.children;
    //   let arr = []

    //   for (let item of children) {
    //   arr.push(item)
    //   }
    //   let len = arr.length;
    //   while (arr.length != 0) {
    //   let _ = arr.pop();
    //   // this.slideUp2(_ as HTMLElement, time/len);
    //   this.slideUp(_ as HTMLElement, time / (0.3 * len))
    //   }
    //   this.slideUp(element, time)
    // },

    // slideDown2(element: HTMLElement, time: number) {
    //   let children = element.children;
    //   let arr = [];
    //   for (let item of children) {
    //   arr.push(item)
    //   }
    //   arr = arr.reverse()
    //   let len = arr.length;
    //   while (arr.length != 0) {
    //   let _ = arr.pop();
    //   // this.slideDown2(_,time/len)
    //   _.style.display = "block";
    //   }
    //   this.slideDown(element, time)
    // },


    // slideUp(element: HTMLElement, time: number) {
    //   // 获取元素总高度
    //   let totalHeight = element.offsetHeight;
    //   // 定义一个变量保存元素当前高度
    //   let currentHeight = totalHeight;
    //   // 计算每次减去的值
    //   let decrement = totalHeight / (time / this.animatePrecision);

    //   // 开始循环定时器
    //   let timer = setInterval(function () {
    //   // 减去当前高度的一部分
    //   currentHeight = currentHeight - decrement;
    //   // 把当前高度赋值给height属性
    //   element.style.height = currentHeight + "px";

    //   // 如果当前高度小于等于0，就关闭定时器
    //   if (currentHeight <= 0) {
    //     // 关闭定时器
    //     clearInterval(timer);
    //     // 把元素display设置为none
    //     element.style.display = "none";
    //     // 把元素高度值还原
    //     element.style.height = totalHeight + "px";
    //   }
    //   }, 10);
    // },
    // slideDown(element: HTMLElement, time: number) {
    //   // 获取元素总高度
    //   element.style.display = "block";    // 1.显示元素，元素变为可见
    //   let totalHeight = element.offsetHeight;   // 2.保存总高度
    //   element.style.height = "0px";     // 3.再将元素高度设置为0，元素又变为不可见
    //   // 定义一个变量保存元素当前高度
    //   let currentHeight = 0;      // 当前元素高度为0
    //   // 计算每次增加的值
    //   let increment = totalHeight / (time / this.animatePrecision);
    //   // 开始循环定时器
    //   let timer = setInterval(function () {
    //   // 增加一部分高度
    //   currentHeight = currentHeight + increment;
    //   // 把当前高度赋值给height属性
    //   element.style.height = currentHeight + "px";
    //   // 如果当前高度大于或等于总高度则关闭定时器
    //   if (currentHeight >= totalHeight) {
    //     // 关闭定时器
    //     clearInterval(timer);
    //     // 把高度设置为总高度
    //     element.style.height = totalHeight + "px";
    //   }
    //   }, 10);
    // }
  },
})
</script>

<style lang="scss">
ul,
li {
  list-style: none;
}
$content1_color: rgb(127, 182, 0);
$content2_color: #bea200;
nav {
  height: 100%;
  width: 100%;
  min-width: 280px;
  font-size: 12px;
  text-align: left;
  color: #ffffff;
  margin: 0;

  ul {
    width: 100%;

    &.content {
      width: 100%;
      padding: 0px;
      font-weight: bold;
      transition-property: all;
      a {
        user-select: none;

        &:checked {
          color: #ffffff;
        }
      }
    }

    &.content1 {
      cursor: pointer;
      font-size: 19px;
      padding-left: 2px;

      a {
        color: $content1_color;
        &:hover{
          color: #ffffff;
          text-shadow: 0 0 3px $content1_color,0 0 6px $content1_color,0 0 2px $content1_color,0 0 2px $content1_color;
        }
        
      }
    }

    &.content2 {
      cursor: pointer;
      font-size: 16px;
      padding-left: 9px;

      a {
        color: #bea200;
        &:hover{
          color: #ffffff;
          text-shadow: 0 0 3px $content2_color,0 0 6px $content2_color,0 0 2px $content2_color,0 0 2px $content2_color;
        }
      }
    }

    &.content3 {
      cursor: pointer;
      font-size: 13px;
      padding-left: 18px;

      a {
        color: antiquewhite;
      }
    }

  }
}

.hide-subs {
  a {
    display: none;
  }
}
</style>