import { BrowserWindow } from "electron";
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";
import { setWindowById } from "../../window_manager";

function newWinEditorSketch(){
    const window = new BrowserWindow(winparams as any);
    const id = setWindowById(window);
    logger.info(`create sketch editor window id = ${id}...`);
    window.loadURL(
      process.env.NODE_ENV === "production"
        ? `file://${RENDER_HTML_PATH.editor_sketch}`
        : `http://127.0.0.1:${WINDOW_PORT.editor_sketch}/`
    );
    logger.debug(
      `Start sketch editor Window At URL: http://localhost:${WINDOW_PORT.editor_sketch}/`
    );
  
    // Open the DevTools.
    if (process.env.NODE_ENV !== "production") {
      window.webContents.openDevTools();
    }
    require("@electron/remote/main").enable(window.webContents);
    return id;
}

export {
    newWinEditorSketch
}