<template>
  <div :class="{ active: isActive }"></div>
  <RouterLink to="/about">about</RouterLink>
  <RouterView />
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

<style lang="scss">

</style>