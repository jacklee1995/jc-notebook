import * as path from "path";
import * as fs from "fs"
import { logger } from "./params"
import { ipcMain, BrowserWindow, dialog } from 'electron';
import { newWinMain } from './apps/Main';
import { newWinFileSourcesManager } from "./apps/sources_manager";
import {
  winDict,
  mainWindowIDProxy,
  WindowDictProxy,
  getWindowById,
  setWindowById,
  hideWindowById,
  showWindowById,
  closeWindowById,
  closeAllWindows,
  // globalIdToIDProxy
} from './window_manager';
import { setPathForWindowById, getPathForWindowById, deleteRecodeFromPathDict } from './fs_manager'
import { newWinEditorText } from './apps/EditorText/index';
import { newWinViewerMarkdown } from './apps/ViewerMarkdown/index';
import { newWinEditorMarkdown } from './apps/EditorMarkdown/index';
import { newWinEditorSketch } from './apps/EditorSketch/index';
import { newWinEditorPointshow } from './apps/EditorPointshow/index';
import { newWinEditorMindmap } from './apps/EditorMindmap/index';


/**用于从主进程发出打开关联文件的信号 */
function fileAssociationsOpen(filepath) {
  
  const mainWindow = getWindowById(mainWindowIDProxy.value);
  // 若窗口未创建则创建窗口
  if (mainWindow === null) {
    newWinMain();
    logger.debug("Main Window ID =", mainWindowIDProxy.value);
    return;
  }
  // 若最小化则还原
  if (mainWindow?.isMinimized()) {
    mainWindow?.restore();
  }
  // 窗口获取焦点
  mainWindow?.focus();
  // 窗口正常打开状态
  if (mainWindow) {
    // 发送消息以展示文件
    fileViewer(filepath, mainWindow);
  }
}

/**依据渲染进程获取的窗口id返回对应的路径 */
function return_current_filepath(){
  ipcMain.handle('ask-current-filepath', async (event, args) => {
    return getPathForWindowById(args.id);
  })
}

// 选择一个新的路径，主要是用于文件保存
function select_path_to_savefile(){
  ipcMain.on('select-path-to-savefile',(event, arg)=>{
    dialog.showSaveDialog(
      getWindowById(arg.windowId), {
        title: arg.title,
        defaultPath: arg.filePath,
        filters: [
          {name: 'Markdown File', extensions: ['md','markdown']},
          {name: 'Text File', extensions: ['txt']},
          
        ]
    })
    .then((filepath) => {
      // setPathForWindowById(arg.windowId, filepath);
      logger.fatal(`[filepath]======================= ${filepath}`)
      
    });
    
  })
  
}

/**通过不同文件类型打开不同的文件阅读器 */
function fileViewer(filepath: string, mainWindow: any) {
  logger.warn("File PATH = "+filepath)
  const extensionName = path.extname(filepath);
  let windowId;
  switch (extensionName) {
    // 打开纯文本文件阅读器
    case ".txt": {
      windowId = newWinEditorText();
      setPathForWindowById(windowId, filepath);
    } break;
    // 打开 MarkDown 文件阅读器
    case ".md": {
      windowId = newWinEditorMarkdown();
      setPathForWindowById(windowId, filepath)
    } break;
    case ".markdown": {
      windowId = newWinEditorMarkdown();
      setPathForWindowById(windowId, filepath)
    } break;
    // 打开 xlmd 文件阅读器
    // case ".xlmd": {
    //   const windowId = newWinEditorMarkdown();
    // } break;
  }
}

/**打开文件的进一步处理 */
function openFile() {
  const mainWindow = getWindowById(mainWindowIDProxy.value);

  // https://www.electronjs.org/zh/docs/latest/api/dialog
  const files = dialog.showOpenDialog(
    mainWindow,
    {
      properties: ['openFile'],
      // 规定筛选的文件类型
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] },
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'JCNotes Files', extensions: ['xlmd'] },
        { name: 'PDF Files', extensions: ['pdf'] },
      ]
    }
  );
  // 用户选择完成文件以后
  files.then(
    (value) => {
      // 仅当未取消选择文件时
      if (!value.canceled) {
        const filepath = value.filePaths[0];
        
        fileViewer(filepath, mainWindow)
      }
    },
    (reason) => {
      logger.fatal(reason);
    }
  )
}

/**打开目录的进一步处理 */
function openPath() {
  const mainWindow = getWindowById(mainWindowIDProxy.value);
  const folder = dialog.showOpenDialog(
    mainWindow,
    {
      properties: ['openDirectory']
    }
  );
  folder.then(
    (value: any) => {
      // 仅当未取消选择目录时
      if (!value.canceled) {
        // 先将窗口告诉渲染进程
        const windowId = newWinFileSourcesManager();
        setPathForWindowById(windowId, value.filePaths); // 记录窗口路径
        ipcMain.handle('ask-current-foulderpath', async (event, args) => {
          const foulderpath = getPathForWindowById(args.id);
          logger.fatal(`ask-current-foulderpath args.id = ${args.id}, filepath = ${foulderpath}`)
          return foulderpath
        })

      }
    },
    (reason) => {
      logger.fatal(reason);
    }
  )
}

/**监听文件打开并作出相应处理 */
function fileMsgListener() {
  // 文件打开对话框
  ipcMain.on('select-file-or-path', (event, arg) => {
    // 打开文件
    if (arg === "open-files") {
      openFile();
    }
    // 打开目录
    else if (arg === "open-path") {
      openPath();
    }
  })
}



/**新建 Markdown 笔记窗口 */
function ipcMarkdownWindow(){
  const id = newWinEditorMarkdown();
  setPathForWindowById(id, 'new-file');

}

/**新建 手写 笔记窗口 */
function ipcSketchWindow(){
  const id = newWinEditorSketch();
  setPathForWindowById(id, 'new-file');
}

/**新建 思维导图 窗口 */
function ipcMindmapWindow(){
  const id = newWinEditorMindmap();
  setPathForWindowById(id, 'new-file');
}

/**新建 Pointshow 窗口 */
function ipcPointshowWindow(){
  const id = newWinEditorPointshow();
  setPathForWindowById(id, 'new-file');
}

export {
  openFile,
  openPath,
  fileMsgListener,
  fileAssociationsOpen,
  ipcMarkdownWindow,
  ipcSketchWindow,
  ipcMindmapWindow,
  ipcPointshowWindow,
  return_current_filepath,
  select_path_to_savefile
}