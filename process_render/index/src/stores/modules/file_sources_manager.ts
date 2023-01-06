import { defineStore } from 'pinia';
import { store } from '@index/stores/index';
import { LATEST_FILES, LATEST_FOLDERS } from '@constants/cache_enums'


declare type pathStr = string; // 文件路径字符串

// 存储接口类型约束
interface FileSourcesManagerState {
  latestFolders: pathStr[],
  latestFiles: pathStr[]
}

// 默认初始值
const latestFolders = [];
const latestFiles = [];

const useFileSourcesManagerStore = defineStore({
  id: "file-sources-manager",
  
  state: (): FileSourcesManagerState => ({
    latestFolders: [],
    latestFiles: []
  }),

  getters: {
    /**获取最近的目录 */
    getLatestFolders(): pathStr[] {
      // let _ = localStorage.getItem(LATEST_FOLDERS);
      // if (_) { _ = JSON.parse(_) };
      // let s:Set<string> = new Set(this.latestFolders.concat(_).concat(latestFolders))
      // return [...s]
      return this.latestFolders
    },

    /**获取最近的文件 */
    getLatestFiles(): pathStr[] {
      let _ = localStorage.getItem(LATEST_FILES);
      if (_) { _ = JSON.parse(_) };
      return this.latestFiles || _ || latestFiles;
    },

    /**获取最后一个推入存储的目录 */
    getLastOneFolder():pathStr {
      const folders = this.latestFolders;
      
      if(folders.length !== 0){
        return folders[(folders.length-1)]
      }
      else{
        return "None"
      }
    },

    /**获取最后一个推入存储的文件 */
    getLastOneFile():pathStr {

      if(this.latestFiles.length !== 0){
        return this.latestFiles[-1]
      }
      else{
        return "None"
      }
    }
  },

  actions: {
    /**加载 localStorage 中的数据 */
    init(){
      // 目录
      let _folders = localStorage.getItem(LATEST_FOLDERS);
      if(_folders){
        this.latestFolders = [...new Set(this.latestFolders.concat(JSON.parse(_folders)))];
      }
      // 文件
      let _files = localStorage.getItem(LATEST_FILES);
      if(_files){
        this.latestFolders = [...new Set(this.latestFolders.concat(JSON.parse(_files)))];
      }
    },
    /**将最近的目录存到 localStorage */
    setlatestFolders(): void {
      let _ = localStorage.getItem(LATEST_FOLDERS);
      if(_){
        localStorage.setItem(LATEST_FOLDERS, JSON.stringify([...new Set(this.latestFolders.concat(JSON.parse(_)))]));
      }else{
        localStorage.setItem(LATEST_FOLDERS, JSON.stringify(this.latestFolders))
      }
    },
    /**将最近的文件存到 localStorage */
    setlatestFiles(): void {
      let _ = localStorage.getItem(LATEST_FILES);
      if(_){
        localStorage.setItem(LATEST_FILES, JSON.stringify([...new Set(this.latestFolders.concat(JSON.parse(_)))]));
      }else{
        localStorage.setItem(LATEST_FILES, JSON.stringify(this.latestFolders))
      }
    },
    // 当用户新打开目录时发生：新打开的目录推进存储
    pushFolder(path:string):void{
      this.latestFolders.push(path);
      this.setlatestFolders()
    },
    // 当用户打开新文件时发生：将新文件退进存储
    pushFile(path:string){
      this.latestFiles.push(path);
      this.setlatestFiles();
    }
  }
})

function useFileSourcesManagerStoreWithOut() {
  return useFileSourcesManagerStore(store);
}
export {
  useFileSourcesManagerStoreWithOut
}