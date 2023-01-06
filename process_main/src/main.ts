import { app, ipcMain, globalShortcut } from "electron";
import { logger, NET_LOG_PATH } from "./params";
import { checkAppRunEnv } from "./check";

import {
  winDict,
  hideWindowById,
  showWindowById,
  closeWindowById,
  mainWindowIDProxy,
  getWindowById,
  maximizeWindowById,
  minimizeWindowById,
  restoreWindowById,
} from "./window_manager";
import { newWinLoading } from "./apps/Loading/index";
import { newWinMain } from "./apps/Main";

import {
  openFile,
  openPath,
  fileMsgListener,
  fileAssociationsOpen,
  ipcMarkdownWindow,
  ipcSketchWindow,
  ipcMindmapWindow,
  ipcPointshowWindow,
  return_current_filepath,
  select_path_to_savefile,
} from "./associated_file";
// 记录会话的网络事件。
import { netLog } from "electron";
import { createTrayIcon } from "./tray";
const gotTheLock = app.requestSingleInstanceLock(winDict);


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

if (!gotTheLock) {
  app.quit();
} else {
  app.on("will-finish-launching", () => {
    app.on("open-file", (event, path: string) => {
      event.preventDefault();
      path && fileAssociationsOpen(path);
    });
  });
  app.on("second-instance", (event, argv, workingDirectory, additionalData) => {
    if (process.platform !== "darwin") {
      const path = argv[argv.length - 1]; // 最后一个参数是文件绝对路径
      path && fileAssociationsOpen(path);
    }
  });
  app
    .whenReady()
    .then(
      () => {
        return checkAppRunEnv();
      },
      (reason) => {
        logger.error(reason);
      }
    )
    .then(
      async () => {
        await netLog.startLogging(NET_LOG_PATH);
      },
      (reason) => {
        logger.error(reason);
      }
    )
    .then(
      async () => {
        require("@electron/remote/main").initialize();
        const WinLoading = newWinLoading();
        setTimeout(() => {
          (WinLoading as any).close();
          newWinMain().toString();
        }, 1600);

        return Promise.resolve();
      },
      (reason) => {
        logger.error("主窗口创建失败!");
        logger.fatal(reason);
      }
    )
    // 注册应用全局快捷键
    .then(
      () => {
        const mainWindow = getWindowById(mainWindowIDProxy.value);
        // 注册一个'CommandOrControl+K' 快捷键监听器 用于 打开/关闭 搜索框
        const Control_K = globalShortcut.register("CommandOrControl+K", () => {
          mainWindow.webContents.send("open-search-pannel", {
            open: true,
          });
        });
        // 注册一个'CommandOrControl+O' 快捷键监听器 用于 打开 文件
        const Control_O = globalShortcut.register("CommandOrControl+O", () => {
          openFile();
        });
        // 注册一个'CommandOrControl+P' 快捷键监听器 用于 打开 目录
        const Control_P = globalShortcut.register("CommandOrControl+P", () => {
          openPath();
        });
        return Promise.resolve(mainWindow);
      },
      (reason) => {
        logger.error(reason);
      }
    )
    // 注册用于从渲染进程打开的文件管理对话框
    .then(
      (mainWindow) => {
        fileMsgListener();
      },
      (reason) => {
        logger.error(reason);
      }
    )
    // 注册系统托盘
    .then(
      () => {
        // const { createTrayIcon } = require("./tray");
        const trayIcon = createTrayIcon();
      },
      (reason) => {
        logger.error(reason);
      }
    );

  ipcMain.on("ipc-window-manager-by-id", (event, arg) => {
    const id = arg.id;
    const action = arg.action;
    switch (action) {
      case "hide":
        hideWindowById(id);
        break;
      case "show":
        showWindowById(id);
        break;
      case "maximize":
        maximizeWindowById(id);
        break;
      case "minimize":
        minimizeWindowById(id);
        break;
      case "restore":
        restoreWindowById(id);
        break;
      case "close":
        closeWindowById(id);
        break;
    }
  });

  // 监听从渲染进程发起的新建文档事件
  ipcMain.on("create-new-file", (event, arg) => {
    switch (arg) {
      case "markdown":
        ipcMarkdownWindow();
        break;
      case "sketch":
        ipcSketchWindow();
        break;
      case "mindmap":
        ipcMindmapWindow();
        break;
      case "pointshow":
        ipcPointshowWindow();
        break;
    }
    
  });

  return_current_filepath();
  select_path_to_savefile();
}

