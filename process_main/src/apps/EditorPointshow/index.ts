import { BrowserWindow } from "electron";
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";
import { setWindowById } from "../../window_manager";

function newWinEditorPointshow(){
    const window = new BrowserWindow(winparams as any);
    const id = setWindowById(window);
    logger.info(`create pointshow editor window id = ${id}...`);
    window.loadURL(
      process.env.NODE_ENV === "production"
        ? `file://${RENDER_HTML_PATH.editor_pointshow}`
        : `http://127.0.0.1:${WINDOW_PORT.editor_pointshow}/`
    );
    logger.debug(
      `Start pointshow editor Window At URL: http://localhost:${WINDOW_PORT.editor_pointshow}/`
    );
  
    // Open the DevTools.
    if (process.env.NODE_ENV !== "production") {
      window.webContents.openDevTools();
    }
    require("@electron/remote/main").enable(window.webContents);
    return id;
}

export {
    newWinEditorPointshow
}