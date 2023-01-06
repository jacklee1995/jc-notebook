import { defineStore } from 'pinia';
import { store } from '../index';

interface AppState {
    _filepath?: string;
  }

const usePathStore = defineStore({
  id:'path',
  state: (): AppState => ({
    _filepath: undefined,

  }),
  getters: {
    filepath():string|undefined {
      return this._filepath
    }
  },
  actions: {
    setFilePath(filePath:string): void{
      this._filepath = filePath;
    }
  }
})

function usePathStoreWithOut() {
  return usePathStore(store);
}

export {
    usePathStore,
    usePathStoreWithOut
  }