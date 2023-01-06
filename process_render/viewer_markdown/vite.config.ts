import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { ENV_PATH, PUBLIC_DIR, wrapperEnv } from './vite.util';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");

  const viteEnv = wrapperEnv(env);
  const { VITE_VIEWER_MARKDOWN_PORT } = viteEnv;
  return {
    // vite 配置
    plugins: [vue(), vueJsx()],
    base: '/',
    root: '.',
    envPrefix: 'VITE_',
    envDir: ENV_PATH,
    publicDir: PUBLIC_DIR,
    server: {
      host: '127.0.0.1',
      port: VITE_VIEWER_MARKDOWN_PORT
    },
    resolve:{
      alias: {
        "@md_v": fileURLToPath(new URL("./src", import.meta.url)),
        "@plugin": fileURLToPath(new URL("../../process_render_packages/plugins", import.meta.url)),
        "@views": fileURLToPath(new URL("../../process_render_packages/views", import.meta.url)),
        "@utils": fileURLToPath(new URL("../../process_render_packages/utils", import.meta.url)),
        "@constants": fileURLToPath(new URL("../../process_render_packages/constants", import.meta.url)),
        "@components": fileURLToPath(new URL("../../process_render_packages/components", import.meta.url)),
      },
    },
    build: {
      target: 'modules',
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      emptyOutDir: true,
    },
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    logLevel: 'info'
  }
});
