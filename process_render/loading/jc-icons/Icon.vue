<template>
  
  <span :class="[`jcicon-${name}`,{
    base: true,
    bold: bold,
    bolder: bolder,
    lighter: lighter,
    italic: italic,
  }]"
    ref="iconspan"
  >
    <span class="path1"></span>
    <span class="path2"></span>
    <span class="path3"></span>
    <span class="path4"></span>
  </span>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';

export default defineComponent({
  name: 'jc-icon',
  props: {
    name: {
      type: String,
      default: "pictures"
    },
    size: String,
    color:{
      type:String,
      default: "null"
    },
    bold: Boolean,
    bolder: Boolean,
    lighter: Boolean,
    italic: Boolean,
  },

  setup(props) {
    let colorVal = "";
    if (props.size) {
      colorVal = props.color as string
    }

    let sizeVal = "";
    if (props.size) {
      sizeVal = props.size.toString() + 'px' as string;
    }
    return {
      colorVal,
      sizeVal
    }
  },
  mounted() {
    if(this.color !=="null"){
      (this.$refs.iconspan as HTMLElement).style.color = this.color;
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