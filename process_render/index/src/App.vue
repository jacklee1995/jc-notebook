<template>
<router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <!--路由中指没有指定keepAlive的路由-->
  <router-view v-else></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBarHeader from "./components/NavBarHeader/Index.vue";
import NavBarSide from "./components/NavBarSide/Index.vue";
import settings from "./configurations";
const { ipcRenderer } = require('electron');


export default defineComponent({
  components: { NavBarSide, NavBarHeader },
  setup(props) {
    return {
      settings,
      pageInnerFullScreen: ref(false),
      sidebarToggle: ref(true)
    }
  },
  mounted() {
    // 由主进程所控制的渲染进程路由跳转
    ipcRenderer.on('router-to', (event:any, data:any) => {
      this.$router.push(data.path)
    })
  }
})

</script>

