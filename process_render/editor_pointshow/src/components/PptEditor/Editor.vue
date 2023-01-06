<template>
<div>1</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { ref, reactive } from "vue"

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