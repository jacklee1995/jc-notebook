<template>
  <nav class="folder-tree">
    <!--文件夹-->
    <ul class="folders">
      <li class="folder" v-for="(folder, folderIndex) in folders" :key="folderIndex">
        <Folderli :datas="folder.name">
          <FolderTree :datas="folder.value" />
        </Folderli>
      </li>
    </ul>
    <!--文件-->
    <ul class="files">
      <li class="file" v-for="(file, fileIndex) in files" :key="fileIndex">
        <jc-icon :name="iconByExtName(file)"></jc-icon>
        <p class="file-title">{{ basename(file) }}</p>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const path = require('path');
import Folderli from './FolderLi.vue';

export default defineComponent({
  name: 'FolderTree',
  components: { Folderli },
  props:['datas'],
  
  setup(props) {
    const datas = props.datas;

    return {
      files: ref(datas.files),
      folders: ref(datas.folders)
    }
  },
  methods: {
    basename(_path:string){
      return path.basename(_path);
    },
    setDatas(datas:any){
      this.files = datas.files;
      this.folders = datas.folders;
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
  background-color: #FFFFFF;

  display: flex;
  flex-direction: column;
  ul.files {
    width: 100%;
    padding-left: $sun-padding-left;
    &:hover {
      box-shadow: 0px 1px 1px 0px rgb(163, 155, 155);
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
        /**单行文本溢出 */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        color: rgb(0, 0, 0);
      }
      &:hover {
        background-color: #b9b9b9;
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
  }

  // 滚动条整体部分
  &::-webkit-scrollbar{
    width: 6px;
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
    background-color: #F0F0F0;
  }
  // 内层滚动槽
  &::-webkit-scrollbar-track-piece{

  }
}
</style>