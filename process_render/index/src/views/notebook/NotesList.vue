<template>
<h3>XXX笔记本</h3>

<ul>
  <li>第一课笔记</li>
  <li>第二课笔记</li>
</ul>

</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import { ref, reactive } from "vue"

export default defineComponent({
  components: {},
  setup(props) {
    let isActive = true;
    return {
      isActive,
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

</style>