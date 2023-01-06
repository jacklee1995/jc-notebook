import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from "vite";
import { ENV_PATH, PUBLIC_DIR, wrapperEnv, outDir } from './vite.util';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, ENV_PATH, "");

  const viteEnv = wrapperEnv(env);
  const { VITE_RENTER_EDITOR_TEXT_PORT } = viteEnv;
  return {
    // vite 配置
    plugins: [vue(), vueJsx()],
    base: './',
    root: '.', 
    envPrefix: 'VITE_',
    envDir: ENV_PATH,
    publicDir: PUBLIC_DIR,
    server: {
      host: '127.0.0.1',
      port: VITE_RENTER_EDITOR_TEXT_PORT
    },
    resolve:{
      alias: {
        "@text": path.resolve(__dirname,"src"),
      },
    },
    build: {
      target: 'modules',
      outDir: outDir,
      assetsDir: "assets",
      sourcemap: false,
      emptyOutDir: true,
      rollupOptions:{
        external:[
          'vue',
          fileURLToPath(new URL("../../process_render_packages/plugins/jc-icons/Icon.vue", import.meta.url)),
          /node_modules/
        ],
      }
    },
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    logLevel: 'info'
  }
});
