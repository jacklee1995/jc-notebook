

<template>
  <div class="page">
    <FileSourcesManager/>
  </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import FileSourcesManager from "./components/FileSourcesManager/Index.vue";
  
  export default defineComponent({
    components: { FileSourcesManager },
  })
  </script>
  
  <style lang="scss" scoped>
  .page{
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
  }
  </style>