import { BrowserWindow, ipcMain } from 'electron';
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";

function newWinLoading() {
  const loadingWindow = new BrowserWindow(winparams as any)
  logger.info("create Loading window...");
  loadingWindow.loadURL(`file://${RENDER_HTML_PATH.loading}`)
  logger.debug(
    `Start Loading Window At URL: http://localhost:${WINDOW_PORT.main}/`
  );
  return loadingWindow;
}

export { newWinLoading };
