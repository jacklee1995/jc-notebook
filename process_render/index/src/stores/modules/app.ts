import { defineStore } from 'pinia';
import { store } from '@index/stores/index';

enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

const APP_DARK_MODE_KEY_ = '__APP__DARK__MODE__';

// 存储接口类型约束
interface AppState {
  darkMode?: ThemeEnum;
}

// 默认初始值
const darkMode = ThemeEnum.LIGHT;

const useAppStore = defineStore({
  id: 'app', 
  state: (): AppState => ({
    darkMode: undefined,

  }),
  getters: {
    /**从 localStorage 读取是否使用 darkMode */
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },

  },
  actions: {
    /**将是否使用 darkMode 保存到 localStorage */
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
  }
})

function useAppStoreWithOut() {
  return useAppStore(store);
}
export {
  useAppStore,
  useAppStoreWithOut
}