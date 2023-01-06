<template>
  <nav class="win-top">
    <jc-icon :name="icon"></jc-icon>
    <slot name="left"></slot>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <!--窗口控制按钮-->
    <ul class="windowtool-box">
      <jc-icon class="windowtool-icon" size="13" @click.stop="windowMin" name="window-min" />
      <jc-icon class="windowtool-icon" size="13" @click.stop="windowToggle" :name="windowSizeIcon" />
      <jc-icon class="windowtool-icon close" @click.stop="windowClose" size="13" name="window-close" />
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from "vue";
const { ipcRenderer } = require('electron');

export default defineComponent({
  name: 'window-nav-top',
  props: {
    windowName: {
      type: String,
      default: 'main'
    },
    icon: {
      type: String,
      default: 'folder-open'
    },
  },
  setup(props) {
    return {
      windowSizeIcon: ref("window-max"),
      icon:props.icon,
      windowName: props.windowName
    };
  },
  methods: {

    // 返回当前窗口实例
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
    // 最小化窗口
    windowMin(){
      this.getCurrentWindow().minimize()
    },
  },
});
</script>

<style lang="scss" scoped>
nav.win-top {
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
  background-color: #3A476D;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  span{
    padding: 0 9px 0 9px;
  }
  .title{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  ul.windowtool-box {
    -webkit-app-region: no-drag;
    position: absolute;
    right: 0px;
    margin: 0;
    padding: 0;
    display: table;
    list-style: none;
    height: 30px;

    .windowtool-icon {
      color: #afafaf;
      height: 100%;
      min-width: 39px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;

      &:hover {
        background-color: #505050;
      }

      &.close:hover {
        background-color: red;
      }
    }
  }
}
</style>