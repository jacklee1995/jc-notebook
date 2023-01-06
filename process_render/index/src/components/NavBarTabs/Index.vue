<template>
<ul class="notebook-nav">
  <li class="tab" v-for="(item, index) in datas.tabs" :key="index">
    <input type="radio" :name="datas.name" :id="`nav-${index}`" >
    <label for="`nav-${index}`">
      <jc-icon class="icon-file" :name="item.icon"></jc-icon>
      <p>{{ item.title }}</p>
    </label>
    <jc-icon class="icon-close" name="jcicon-file"></jc-icon>
  </li>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, reactive } from "vue"

export default defineComponent({
  components: {},
  setup(props) {
    return {
      datas:reactive({
        name:"",
        tabs:[
          {icon:"jcinons-file-text", title:"文件1", isActive: true},
          {icon:"jcinons-file-text", title:"文件2", isActive: false},
          {icon:"jcinons-file-text", title:"文件3", isActive: false},
        ]
      })
    };
  },
  methods: {

  },
});
</script>

<style lang="scss" scoped>

ul.notebook-nav{
  height: 36px;
  width: 100%;
  background-color: #F3F3F3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  li.tab {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding-left: 9px;
    padding-right: 9px;
    cursor: pointer;
    user-select: none;
    input{
      appearance: none;
      
      &:checked{
        background-color: #FFFFFF;
      }
    }
    
    label{
      display: flex;
      flex-direction: row;
      cursor: pointer;
      // 用于文件图标的样式
      span.icon-file{
        cursor: pointer;
        padding-left: 3px;
        padding-right: 3px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
      }
      
      
    }
    // 用于 close 按钮的样式
    span.icon-close {
        cursor: pointer;
        padding-left: 3px;
        padding-right: 3px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    //   &:hover {
    //     background-color: #cdcdcd;
    //   }
  }

  
}
</style>