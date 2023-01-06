<template>
<div class="notebook-page">
  <div  class="notebook-nav">
  <h2>笔记本导航</h2><hr>
    <ul class="tablet-manager">
      <li>笔记簿</li>
      <li>笔记标签</li>
      <li>笔记标签</li>
    </ul>
    <hr>
    <ul>
      <li>语文笔记本</li>
      <li>数学笔记本</li>
      <li>英语笔记本</li>
    </ul>
  </div>
  <div class="notebook-view">
    <h2>笔记本视图</h2><hr>
    <router-view/>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import NavBar from "@/components/NavBar/Index.vue"

export default defineComponent({
  // components: {NavBar},
  setup(props) {
    return {
    };
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>
.notebook-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 19px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: #c183ff;
  $nav-width:30%;
  .notebook-nav {
    width: $nav-width;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: inherit;
    background-color: #F0F1F2;
    .tablet-manager{
      display: grid;
    }
  }
  .notebook-view{
    width: calc(100% - $nav-width);
  }

}
</style>