<template>
<p class="folder-title" @click.stop.self="this.showChildren=!this.showChildren">
  <jc-icon :name="useName()"></jc-icon>
  {{ basename(folderPath) }}
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
    basename(_path:string){
      return path.basename(_path);
    },
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
  },
});
</script>

<style lang="scss" scoped>
li.folder {
  cursor: pointer;
}

p.folder-title {
  font-size: 13px;
  color: #ffbb00;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /**单行文本溢出 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    color: #ffbb00;
    font-size: 12px;
    padding-right: 3px;
  }
  &:hover {
    color: aliceblue;
    background-color: #ffbb00;
    span {
      color:#0c0c0c
    }
  }
}
.childrens-show{
  display: block;
}
.childrens-hide{
  display: none;
}
</style>