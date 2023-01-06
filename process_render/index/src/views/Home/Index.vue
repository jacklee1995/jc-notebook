<template>
  <div ref="root" class="root">
    <!--左边控制栏-->
    <div :class="['side-bar',{'side-bar-tabs':sidebarToggle, 'side-bar-according':!sidebarToggle}]">
      <NavBarSide ref="sidebar" :datas="settings.sideBar" />
    </div>
    <!--右边视图盒子-->
    <div ref="viewbox" class="viewbox">
      <!--右上控制栏-->
      <NavBarHeader ref="headernav" :createClassList="settings.headBar.addMenu" />
      <!--右下主视图-->
      <div class="viewarea">
        <!--用于全屏的包装器-->
        <div :class="['wrapper', {'wrapper-full':pageInnerFullScreen}]">
            <!--路由中指定了keepAlive的路由-->
            <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
              <transition>
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
            <!--路由中指没有指定keepAlive的路由-->
            <router-view v-else></router-view>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import NavBarHeader from "../../components/NavBarHeader/Index.vue";
  import NavBarSide from "../../components/NavBarSide/Index.vue";
  import settings from "@index/configurations";

  
  export default defineComponent({
    components:{ NavBarSide, NavBarHeader },
    setup(props) {
      
      return {
        settings,
        pageInnerFullScreen: ref(false),
        sidebarToggle:ref(true)
      }
    },
    methods: {
      toggleSideStyle(width:string){
        this.sidebarToggle = !this.sidebarToggle;
        (this.$refs.sidebar as any).toggle();
      },
      togglePageInnerFullScreen(){
        this.pageInnerFullScreen = !this.pageInnerFullScreen;
      },

    },
  })
  
  </script>
  
  <style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    width: 100%;
    height: 100%;
  
    #app {
      width: 100%;
      height: 100%;
      max-width: 100%; 
      min-width: 100%;       // 新版脚手架使用了 @media (min-width: 1024px) ，如不指定将其覆盖则会出错
      display: flex;         // 新版vue脚手架创建的项目，不知道什么地方指定了gird布局，若不指定则会默认使用grid
      background-color: transparent;
      
      padding: 0;
      margin: 0;
      &.black{
        filter: grayscale(1);
      }
    }
  }
  
  </style>
  
  <style lang="scss" scoped>
  $background-color:#29334F;
  $side-bar-width: 336px;
  .root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: $background-color;
  
    /*********************** 左边导航区 ************************/
    .side-bar{
      height: 100%;
      max-width: $side-bar-width;
    }
    .side-bar-tabs{
      width: 60px;
    }
    .side-bar-according{
      width: $side-bar-width;
    }
    /*********************** 右边视图区 ************************/
    .viewbox {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 0;
      flex-grow: 1;   // 占满剩下的宽度
      
      // width: 100%;
      // max-width: calc(100vw-);
      background-color: $background-color;
      height: 100%;
      
      .viewarea {
        width: 100%;
        height: 0;
        flex-grow: 1;  // 占满剩下的高度
  
        .wrapper{
          width: 100%;
          height: 100%;
          border-radius: 19px 0 0 0;
          padding-top: 6px;
          padding-left: 6px;
          background-color: #ffffff;
        }
        .wrapper-full{
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  
  }
  
  
  </style>
  