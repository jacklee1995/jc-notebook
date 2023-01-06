import { BrowserWindow, ipcMain } from 'electron';
import { winparams } from './params'
import { logger } from '../../params'

function _createMain(port:number){
        // 主窗口
        const mainWindow = new BrowserWindow(winparams as any)
        logger.debug('process.env.NODE_ENV =',process.env.NODE_ENV)
        
        // 通过环境变量决定使用哪一种加载方式
        // mainWindow.loadURL(
        //   process.env.NODE_ENV !== 'production'
        //     ? `http://localhost:${port}/`
        //     : `file://${VUE_DIST_HTML}`
        // );
        logger.debug(`Start Main Window At URL: http://localhost:${port}/`)
        mainWindow.loadURL(`http://localhost:${port}/`)

        // Open the DevTools.
        // if (process.env.NODE_ENV !== "production") {
        //   mainWindow.webContents.openDevTools()
        // }
        mainWindow.webContents.openDevTools()
        return mainWindow

}

function createMainWin(port){
  const mainWindow = _createMain(port)
  ipcMain.on('main-window-ctrl', (event, arg) => {
    switch (arg) {
      case 'maximize': mainWindow.maximize()
        break;

      case 'minimize': mainWindow.minimize()
        break;

      case 'restore': mainWindow.restore()
        break;

      case 'close': mainWindow.hide()
        break;
    }
  })
  return mainWindow
}

export {
  createMainWin
}