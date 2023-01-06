import { BrowserWindow } from "electron";
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";

function newWinViewerMarkdown(){
    const window = new BrowserWindow(winparams as any);
    logger.info("create text editor window...");
    logger.debug(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    window.loadURL(
      process.env.NODE_ENV === "production"
        ? `file://${RENDER_HTML_PATH.editor_text}`
        : `http://127.0.0.1:${WINDOW_PORT.editor_text}/`
    );
    logger.debug(
      `Start text edito Window At URL: http://localhost:${WINDOW_PORT.editor_text}/`
    );
  
    // Open the DevTools.
    if (process.env.NODE_ENV !== "production") {
        window.webContents.openDevTools();
    }
    require("@electron/remote/main").enable(window.webContents);
    return window;
}

export {
    newWinViewerMarkdown
}