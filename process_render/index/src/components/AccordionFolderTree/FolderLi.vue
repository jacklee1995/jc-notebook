<template>
<p class="folder-title" @click.stop.self="this.showChildren=!this.showChildren">
  <jc-icon :name="useName()"></jc-icon>
  {{ nameToShow(folderPath) }}
</p>
<div :class="useClass()">
<slot></slot>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from "vue";
const path = require('path');

export default defineComponent({
  name: 'FolderUl',
  props: ['datas'],
  setup(props) {
    let folderPath = props.datas;
    return {
      showChildren:ref(false),
      folderPath: ref(folderPath),
    };
  },
  methods: {
    useName(){
      if(this.showChildren){
        return 'arrow-single-down'
      }else{
        return 'arrow-single-right'
      }
    },
    useClass(){
      if(this.showChildren){
        return 'childrens-show'
      }else{
        return 'childrens-hide'
      }
    },
    nameToShow(abs_path: string) {
      let name = path.basename(abs_path);
      if (name.length <= 20) {
        return name
      } else {
        return name.slice(0, 17) + '...'
      }
    },
  },
});
</script>

<style lang="scss" scoped>
li.folder {
  cursor: pointer;
}

p.folder-title {
  font-size: 13px;
  white-space: nowrap;
  color: antiquewhite;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    color: #8E8E8E;
    font-size: 12px;
    padding-right: 3px;
  }
}
.childrens-show{
  display: block;
}
.childrens-hide{
  display: none;
}
</style>