<template>
  <nav class="folder-tree">
    <!--文件夹-->
    <ul class="folders">
      <li class="folder" v-for="(folder, folderIndex) in datas.folders" :key="folderIndex">
        <!-- <p class="folder-title">
          <jc-icon name="arrow-single-right"></jc-icon>
          {{ nameToShow(folder.name) }}
        </p> -->
        <Folderli :datas="folder.name">
          <FolderTree :datas="folder.value" />
        </Folderli>
      </li>
    </ul>
    <!-- <FolderUl datas="datas.folders" /> -->
    <!--文件-->
    <ul class="files">
      <li class="file" v-for="(file, fileIndex) in datas.files" :key="fileIndex">
        <jc-icon :name="iconByExtName(file)"></jc-icon>
        <p class="file-title">{{ nameToShow(file) }}</p>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { reactive } from 'vue';
const path = require('path');
import Folderli from './FolderLi.vue'

export default defineComponent({
  name: 'FolderTree',
  components: { Folderli },
  props: {
    datas: {
      default: {
        files: [], folders: [
          { name: 'folder-name1', value: { files: [], folders: [] } },
          { name: 'folder-name2', value: { files: [], folders: [] } },
        ]
      }
    }
  },
  
  setup(props) {
    return {
      datas: reactive(props.datas),
      path
    }
  },
  methods: {
    nameToShow(abs_path: string) {
      let name = path.basename(abs_path);
      if (name.length <= 20) {
        return name
      } else {
        return name.slice(0, 17) + '...'
      }
    },
    iconByExtName(filepath: string){
      const extName = path.extname(filepath);
      switch (extName) {
        case '.pdf': return 'file-pdf-color'
        case '.json': return 'file-json-color'
        case '.md': return 'file-markdown-color'
        case '.markdown': return 'file-markdown-color'
        case '.txt': return 'file-text-color'
        case '.doc': return 'file-word-color'
        case '.c': return 'lang-c'
        case '.cpp': return 'lang-cpp'
        case '.cs': return 'lang-csharp'
        case '.dart': return 'lang-dart'
        case '.java': return 'lang-java'
        case '.javascript': return 'lang-javascript'
        case '.js': return 'lang-javascript'
        case '.ts': return 'lang-typescript'
        case '.rs': return 'lang-rust'
        case '.ps1': return 'lang-powershell'
        case '.jl': return 'lang-julia'
        case '.m': return 'lang-matlab'
        case '.php': return 'lang-php'
        case '.rb': return 'lang-ruby'
        case '.swift': return 'lang-swift'
        default:
          return 'file'
      }
    }
  },
})
</script>

<style lang="scss" scoped>
$sun-padding-left: 12px;
ul.files, li.files {
  list-style:none;
}
.folder-tree {
  user-select: none;
  height: 100%;
  width: 300px;
  padding-left: 1px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #242425;

  display: flex;
  flex-direction: column;
  p.class-title{
    
    color: rgb(223, 129, 15);
  }
  ul.files {
    width: 100%;
    padding-left: $sun-padding-left;
    &:hover {
      box-shadow: 0px 1px 1px 0px rgba(255, 255, 255, 1);
    }
    li.file {
      height: 26px;
      width: 100%;
      overflow: hidden;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      span {
        padding: 0 6px 0 0;
      }
      p.file-title{
        color: rgb(221, 221, 221);
      }
      &:hover {
        background-color: #2A2D2E;
      }
    }
  }

  ul.folders {
    padding-left: $sun-padding-left;
    width: 100%;
    // list-style:disclosure-closed;
    list-style: none;
    color: #8E8E8E;
    li.folder {
      cursor: pointer;
    }
    p.folder-title{
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
      &:hover{
        background-color: #2A2D2E;
      }
    }
  }

  // 滚动条整体部分
  &::-webkit-scrollbar{
    width: 13px;
  }
  // 滚动条两端的按钮
  &::-webkit-scrollbar-button {
    // display: none;
  }
  // 外层轨道
  &::-webkit-scrollbar-track{

  }
  // 内层滚动槽
  &::-webkit-scrollbar-track-piece{

  }
  // 滚动的滑块
  &::-webkit-scrollbar-thumb {
    background-color: #464647;
  }
  // 内层滚动槽
  &::-webkit-scrollbar-track-piece{

  }
}
</style>