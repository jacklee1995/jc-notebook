<template>
<div class="header-nav" @click.stop="closeSearchBoard">
  <!--切换左侧导航栏样式-->
  <div class="toggle-box">
    <input v-bind="checked" @click.stop="toggleSideStyle" type="radio" id="toggle-icon" />
    <label v-if="checked" for="toggle-icon">
      <jc-icon class="toggle-icon" name="toggle-right"></jc-icon>
    </label>
    <label v-else for="toggle-icon">
      <jc-icon class="toggle-icon" name="toggle-left"></jc-icon>
    </label>
  </div>

  <!--打开搜索框-->
  <div class="search" @click.stop="openSearchBoard" placeholder="搜索（Ctrl + K）" >
    <p>搜索（Ctrl + K）</p>
  </div>
  
  <!--新建菜单-->
  <div class="create-papers">
    <input name="createPapers" type="radio" v-model="showCreateList" >
    <label for="createPapers">
      <jc-icon  name="symbol-add-bold" @click.stop="showCreateList=!showCreateList" ></jc-icon>
    </label>
    <!--新建的点开菜单-->
    <div class="table-list">
      <ul :class="{active:showCreateList}" >
        <li v-for="(item,index) in createClassList" :key="index"
            @click.stop="pageTo(item.path)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>

  <!--工具栏-->
  <ul class="tools">
    <!--切换语言-->
    <!-- <li class="tool-li">
      <input type="radio" name="language-toggle" id="language-toggle" />
      <label class="language-toggle-label" for="language-toggle">
        <jc-icon name="language-toggle"  class="language-toggle" size="13" />
      </label>
    </li> -->

    <!--切换主题-->
    <!-- <li class="tool-li">
      <input class="theme-toggle-input" @click="toggleTheme" type="radio"  id="language-theme" value="sun" checked />
      <label v-if="theme_sun" class="theme-toggle-label" for="language-theme">
        <jc-icon class="language-toggle" color="yellow" name="day-sun" />
      </label>
      <label v-else class="theme-toggle-label" for="language-theme">
        <jc-icon class="language-toggle"  name="day-moon-color" />
      </label>
    </li> -->
  </ul>

  <!--窗口控制按钮-->
  <ul class="windowtool-box">
    <jc-icon class="windowtool-icon" size="13" @click.stop="windowMin" name="window-min" />
    <jc-icon class="windowtool-icon" size="13" @click.stop="windowToggle" :name="windowSizeIcon" />
    <jc-icon class="windowtool-icon close" @click.stop="windowClose" size="13" name="window-close" />
  </ul>
</div>

<SearchPanel ref="searchpanel" />

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SearchPanel from "../../components/PanelSearch/Index.vue";

const { ipcRenderer } = require('electron');

export default defineComponent({
  components:{ SearchPanel },
  props:["createClassList"],
  setup(props){
      let searchItems=ref()
        return{
          searchItems,
          checked: ref(true),
          theme_sun: ref(true),
          showCreateList: ref(false),
          createClassList:props.createClassList,
          windowSizeIcon: ref("window-max")
        }
  },
  mounted(){
    let that = this
    ipcRenderer.on('open-search-pannel',(event,data)=>{
      console.log('CommandOrControl+K is pressed',event,data)
      that.openSearchBoard()
    })
  },
  methods: {
    /**打开搜索面板 */
    openSearchBoard(){
      (this.$refs.searchpanel as any).openSearchBoard();
    },
    /**关闭搜索面板 */
    closeSearchBoard(){
      (this.$refs.searchpanel as any).closeSearchBoard();
    },
    /**切换边栏类型 */
    toggleSideStyle(){
      this.checked=!this.checked;
      if(this.checked){
        (this.$parent as any).toggleSideStyle("0px");
      }else{
        (this.$parent as any).toggleSideStyle("4px");
      }
      
    },
    /**切换主题 */
    toggleTheme(){
      this.theme_sun=!this.theme_sun;
    },
    pageTo(url:string){
      this.$router.push(url);
      this.showCreateList = false;
    },

    // 切换语言
    languageToggle(){

    },

    // 切换界面风格主题
    languageTheme(){

    },

    getCurrentWindow(){
      return require('@electron/remote').getCurrentWindow();
    },

    // 窗口关闭
    windowClose(){
      const id = this.getCurrentWindow().id;
      ipcRenderer.send("ipc-window-manager-by-id",{
        action: 'hide',
        id: id
      })
    },
    // 窗口的最大化和还原的切换
    windowToggle(){
      if(this.windowSizeIcon === "window-max"){
        this.getCurrentWindow().maximize();
        this.windowSizeIcon = "window-middle";
      }
      else{
        this.getCurrentWindow().restore();
        this.windowSizeIcon = "window-max";
      }
    },
    windowMin(){
      this.getCurrentWindow().minimize()
    },
  },

})
</script>



<style lang="scss" scoped>

.header-nav{
  -webkit-app-region: drag;
  padding-left: 18px;
  height: 45px;
  background-color: #29334F;
  display: flex;
  flex-direction: row;
  align-items: center;
  .toggle-box{
    -webkit-app-region: no-drag;
    width: 32px;
    height: 32px;
    input {
      cursor: pointer;
      appearance: none;
      display: none;
    }
    span {
      user-select: none;
      color: #c2d844;
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .toggle-icon{
      width: 32px;
      height: 32px;
      font-size: 19px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &:hover{
        background-color: #7c818b;
      }
    }
  }
  
  .search {
    -webkit-app-region: no-drag;
    text-align: center;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    width: 307px;
    height: 28px;
    margin-left: 20px;
    border-radius: 8px;
    font-size: 13px;
    border: 2px solid #55617C;
    // background-color: #55617C;
    // background-image: url('/images/searcher.png');
    // background-size: 17px;
    // background-position: 81px 4px; 
    // background-repeat: no-repeat;
    p {
      color: #D9DBE1;
      margin: 3px;
    }

    &:hover {
      background-color: #6A748B;
    }
    &:focus{
      border:none;
    }
  }
  
  .create-papers {
    -webkit-app-region: no-drag;
    margin-left: 26px;
    color: #8f8f8f;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    input {
      appearance: none;
      &:checked {
        &~label{
          color: red;
          background-color: #bac2c9;
        }
        
      }
    }
    label {
      cursor: pointer;
      width: 25px;
      height: 25px;
      text-align: center;
      border-radius: 3px;
      &:hover {
        background-color: #394669;
      }
    }
    .table-list{
      position: absolute;
      top: 29px;
      left: -10px;
      ul {
        display:none;
        user-select: none;
        list-style: none;
        padding: 3px 0px 6px 0px;
        background-color: #323233;
        z-index: 1;
        li {
          color: #D9DBE1;
          background-color: #323233;
          padding: 2px 26px 2px 26px;
          font-size: 14px;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            background-color: #1c5386;
          }
        }
      }
      ul.active{
        display: block;
      }
    }
    
  }
  ul.tools{
    -webkit-app-region: no-drag;
    margin-left: 66px;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    li.tool-li{
      width: 30px;
      height: 30px;
      border-radius: 9px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-self: center;
      &:hover{
        background-color: #55617C;
      }
      
      input {
        appearance: none;
      }

      label.language-toggle-label {
        color: #c2d844;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
        user-select: none;
      }

      input.theme-toggle-input{

      }
      label.theme-toggle-label {
        
        // background-color: #afafaf;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-self: center;
        user-select: none;
      }

    }
  }
  ul.windowtool-box {
    -webkit-app-region: no-drag;
    position: absolute;
    right:0px;
    margin: 0;
    padding: 0;
    display: table;
    list-style: none;
    height: 30px;
    .windowtool-icon{
      color: #afafaf;
      height: 100%;
      min-width: 39px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      &:hover{
        background-color: #505050;
      }
      &.close:hover{
        background-color: red;
      }
    }
  }
}
</style>