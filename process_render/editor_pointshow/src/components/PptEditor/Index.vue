<template>
    <div class="file-sources-manager">
      <WindowNavTop windowName="file-sources-manage">
        <template v-slot:left>
          <ul class="top-ctrl">
            <li><jc-icon name="symbol-add-bold"></jc-icon></li>
          </ul>
        </template>
        <template v-slot:title>
          <p class="win-title">{{ folderpath }}</p>
        </template>
      </WindowNavTop>
  
      <div class="point-show-editor">
        <Editor ref="ftree" :datas="datas" />
      </div>
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, reactive } from "vue";
  import WindowNavTop from '../NavBarWindowTop/Index.vue'
  import Editor from './Editor.vue'
  
  const path = require('path');
  const fs = require('fs');
  import { setupOpenFileIpc } from './path_ipc';
  
  declare type treeType = {
    files: string[],
    folders: {
      name: string,
      value: treeType
    }[]
  };
  
  export default defineComponent({
    components: {
      WindowNavTop,
      Editor
    },
  
    setup() {
      return {
        folderpath: ref(''),
        datas: reactive({}),
      };
    },
    methods: {
      getFolderTree(folderPath: string) {
        const tree: treeType = { files: [], folders: [] };
        const current = fs.readdirSync(folderPath);
        current.forEach(child => {
          const child_path = path.join(folderPath, child);
          let _ = fs.lstatSync(child_path);
          if (_.isDirectory()) {
            tree['folders'].push(
              { name: child_path, value: this.getFolderTree(child_path) }
            )
            tree['folder']
          } else if (_.isFile()) {
            tree['files'].push(child_path)
          }
        });
        return tree
      }
    },
    beforeCreate() {
      setupOpenFileIpc()
        .then(
          (_path: string) => {
            const folderpath = _path[0];
            this.folderpath = folderpath;
            this.datas = this.getFolderTree(folderpath);
            (this.$refs.ftree as any).setDatas(this.datas);
          }
        )
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .file-sources-manager {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  
    p {
      color: aliceblue;
    }
  
    .point-show-editor {
      width: 100%;
      height: 0;
      flex-grow: 1;
      background-color: rgb(163, 163, 163);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .content-page{
        flex-grow: 1;
        width: 100%;
        background-color: #e4e4e4;
        p{
          color: rgb(0, 122, 82);
        }
      }
    }
  
  
    ul.top-ctrl {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
  
      li {
        list-style: none;
  
        span {
          -webkit-app-region: no-drag;
          color: #ffffff;
          padding: 0 6px 0 3px;
          cursor: pointer;
  
        }
  
        &:hover {
          background-color: #0a1a46;
        }
      }
    }
  
    .win-title {
      color: #dbdbdb;
      // 文字溢出自动省略号
      width: 360px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  
  }
  </style>