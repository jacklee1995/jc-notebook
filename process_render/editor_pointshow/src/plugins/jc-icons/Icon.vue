<template>
  <span :class="[`jcicon-${name}`, {
    base: true,
    bold: bold,
    bolder: bolder,
    lighter: lighter,
    italic: italic,
  }]" ref="iconspan">
    <span class="path1"></span>
    <span class="path2"></span>
    <span class="path3"></span>
    <span class="path4"></span>
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'jc-icon',
  props: {
    name: {
      type: String,
      default: "pictures"
    },
    bold: Boolean,
    bolder: Boolean,
    lighter: Boolean,
    italic: Boolean,
  },
  setup(props: any) {

    return {
      name: props.name,
      bold: props.bold,
      bolder: props.bolder,
      lighter: props.lighter,
      italic: props.italic,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "./style.css";


.base {
  margin: 0;
  padding: 0;
}

.lighter {
  font-weight: lighter;
}

.bold {
  font-weight: bold;
}

.bolder {
  font-weight: bolder;
}

.italic {
  font: italic;
}
</style>