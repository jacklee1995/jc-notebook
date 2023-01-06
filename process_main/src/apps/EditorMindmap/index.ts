import { BrowserWindow } from "electron";
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";
import { setWindowById } from "../../window_manager";

function newWinEditorMindmap(){
    const window = new BrowserWindow(winparams as any);
    logger.debug(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    const id = setWindowById(window);
    logger.info(`create mindmap editor window id = ${id}...`);
    window.loadURL(
      process.env.NODE_ENV === "production"
        ? `file://${RENDER_HTML_PATH.editor_mindmap}`
        : `http://127.0.0.1:${WINDOW_PORT.editor_mindmap}/`
    );
    logger.debug(
      `Start mindmap editor Window At URL: http://localhost:${WINDOW_PORT.editor_mindmap}/`
    );
  
    // Open the DevTools.
    if (process.env.NODE_ENV !== "production") {
      window.webContents.openDevTools();
    }
    require("@electron/remote/main").enable(window.webContents);
    return id;
}

export {
    newWinEditorMindmap
}