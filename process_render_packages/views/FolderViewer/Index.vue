<template>
<div class="folder-viewer">
  <nav></nav>
  <div class="contents">
    <According />
    <div class="viewer"></div>
  </div>
</div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import { ref, reactive } from "vue"

export default defineComponent({
  components: {},
  setup(props) {
    return {
    };
  },
  methods: {
    handleEvent(event: Event) {
      event.preventDefault();
    },
  },
});
</script>

<style lang="scss" scoped>
.folder-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  nav {
    
  }
  .contents{
    width: 100%;
    // flex-flow: 1;
  }
}
</style>