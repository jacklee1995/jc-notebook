

<template>
  <div class="page">
    <PptEditor/>
  </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import PptEditor from "./components/PptEditor/Index.vue";
  
  export default defineComponent({
    components: { PptEditor },
  })
  </script>
  
  <style lang="scss" scoped>
  .page{
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
  }
  </style>