<template>
  <transition>
    <div class="box" ref="togglebox" v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from "vue";
import { useCssVar } from '@vueuse/core';

export default defineComponent({
  emits:["toggle"],
  props:{
    time:{
      type: String,
      default: ".9s"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let isShow = ref(props.show);
    let hight = ref(0);
    const time = props.time;
    return {
      isShow,
      hight,
      time
    };
  },

  mounted() {
    const time = useCssVar("--time", ref(null));
    time.value = this.time;
    this.hight = this.getDisplayNoneHitht(this.$refs.togglebox as HTMLElement);
  },

  methods: {
    toggle(){
      this.isShow=!this.isShow;
      const hight = useCssVar("--hight", ref(null));
      hight.value = "-"+this.hight.toString()+"px";
    },
    getDisplayNoneHitht(elem:HTMLElement){
      elem.style.cssText = `display:block;position:absolute;z-index:-666;`;
      let htght = elem.offsetHeight;
      if(!this.isShow){
        elem.style.cssText = "display:none;";
      }else{
        elem.style.cssText = "";
      }
      return htght;
    }
  }

});
</script>

<style lang="scss" scoped>

.v-enter-active {
  animation: donghua var(--time);
}

.v-leave-active {
  animation: donghua var(--time) reverse;
}

@keyframes donghua {
  from {
    transform: translateY(var(--hight));
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>