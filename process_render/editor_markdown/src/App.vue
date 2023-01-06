

<template>
<div class="page">
  <MarkdownEditor/>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import MarkdownEditor from "./components/EditorMarkDown/Index.vue";

export default defineComponent({
  components: { MarkdownEditor },
  
  setup(props) {
    
    return {
    };
  },
})
</script>

<style lang="scss" scoped>
.page{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
</style>