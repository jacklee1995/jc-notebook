<template>
  <div class="file-sources-manager">
    <WindowNavTop 
      windowName="file-sources-manager"
      :globalID="globalID"
    >
      <p>{{ currentFolder }}</p>
    </WindowNavTop>
    <div class="shortcut">
      <jc-icon name="symbol-add-bold"></jc-icon>新建
    </div>
    <div class="bottom-content">
      <AccordionFolderTree :datas="tree" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, reactive } from "vue";
import { useFileSourcesManagerStoreWithOut } from '@index/stores/modules/file_sources_manager'
import { storeToRefs } from 'pinia';
import { CURRENT_FOLDER,GLOBAL_WINDOW_ID } from '@index/enums/cache_enums'
import WindowNavTop from '@components/NavBarWindowTop/Index.vue'
import AccordionFolderTree from '@components/AccordionFolderTree/Index.vue'

const path = require('path');
const fs = require('fs');
// import path from 'path';
// import fs from 'fs';

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
    AccordionFolderTree
  },

  setup(props) {
    const fileSourcesManagerStore = useFileSourcesManagerStoreWithOut();
    fileSourcesManagerStore.init();
    const { latestFolders } = storeToRefs(fileSourcesManagerStore);
    const currentFolder = ref('');
    let _ = localStorage.getItem(CURRENT_FOLDER);
    if (_) {
      currentFolder.value = _
    }
    let tree = reactive({});

    function getFolderTree(folderPath) {
      const tree: treeType = { files: [], folders: [] };
      const current = fs.readdirSync(folderPath);
      current.forEach((child: any) => {
        const child_path = path.join(folderPath, child);
        let _ = fs.lstatSync(child_path);
        if (_.isDirectory()) {
          tree['folders'].push(
            { name: child_path, value: getFolderTree(child_path) }
          )
          tree['folder']
        } else if (_.isFile()) {
          tree['files'].push(child_path)
        }
      });

      return tree
    }
    tree = getFolderTree(currentFolder.value);
    let globalID = ref(localStorage.getItem(GLOBAL_WINDOW_ID));
    localStorage.setItem(GLOBAL_WINDOW_ID,'')
    return {
      globalID,
      fileSourcesManagerStore,
      latestFolders,
      currentFolder,
      tree
    };
  },
  methods: {
    // getFolderTree(folderPath) {
    //   const tree:{files:string[],children:string[]} = {files:[],children:[]};
    //   const current = fs.readdirSync(folderPath);
    //   // console.log(current);
    //   current.forEach(child => {
    //     const child_path = path.join(folderPath,child);
    //     let _ = fs.lstatSync(child_path);
    //     if(_.isDirectory()){
    //       tree['children'] = this.getFolderTree(child_path)
    //     }else if(_.isFile()){
    //       tree['files'].push(child_path)
    //     }
    //   });

    //   return tree
    // },

  },
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

  .shortcut {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    padding-left: 9px;
  }

  .bottom-content {
    width: 100%;
    height: 0;
    flex-grow: 1;
    background-color: antiquewhite;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>