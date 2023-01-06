import { APP_NAME } from '../../params';
import * as path from 'path';

export const winparams = {
    width: 1239,
    height: 766,
    resizable: true,
    minWidth: 966,
    minHeight: 696,
    transparent: false,  //透明
    // backgroundColor: "#ffffff",
    opacity: 1,
    hasShadow: true,
    movable: true,    // 可移动
    minimizable: true,
    maximizable: true,
    closable: true,
    focusable: true,
    alwaysOnTop: false,
    fullscreen: false,
    fullscreenable: true,
    fullscreenWindowTitle: false,
    kiosk: false,
    title: APP_NAME,
    icon: "../../../public/favicon_256x256.ico",
    show: true,
    paintWhenInitiallyHidden: true,
    frame: true,  // Specify `false` to create a frameless window. Default is `true`.
    parent: null,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      // preload: path.join(__dirname, 'preloads'),
      // 当 `false` 时，它将禁用同源策略(通常由人们使用测试网站)，
      // 并且如果用户没有设置此选项，则将`allowRunningInsecureContent`  设置为`true`。
      // 默认值为 `true`。
      // webSecurity: false,

    }
  }