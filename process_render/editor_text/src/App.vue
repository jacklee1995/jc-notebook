

<template>
  <div class="page">
    <TextEditor/>
  </div>
  </template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import TextEditor from "./components/EditorText/Index.vue";
  
  export default defineComponent({
    components: { TextEditor },
  })
  </script>
  
  <style lang="scss" scoped>
  .page{
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
  }
  </style>