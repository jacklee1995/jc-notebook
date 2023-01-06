import { BrowserWindow } from "electron";
import { winparams } from "./params";
import { logger, WINDOW_PORT, RENDER_HTML_PATH } from "../../params";
import { mainWindowIDProxy, setWindowById } from "../../window_manager";

function newWinMain() {
  const window = new BrowserWindow(winparams as any);
  logger.debug(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
  const id = setWindowById(window);
  mainWindowIDProxy.value = id.toString();
  logger.debug("[mainWindowIDProxy.value] =", mainWindowIDProxy.value);
  logger.info(`create text editor window id = ${id}...`);
  window.loadURL(
    process.env.NODE_ENV === "production"
      ? `file://${RENDER_HTML_PATH.main}`
      : `http://127.0.0.1:${WINDOW_PORT.main}/`
  );
  logger.debug(
    `Start Main Window At URL: http://localhost:${WINDOW_PORT.main}/`
  );

  // Open the DevTools.
  if (process.env.NODE_ENV !== "production") {
    window.webContents.openDevTools();
  }
  require("@electron/remote/main").enable(window.webContents);
  mainWindowIDProxy.value = id.toString()
  return id;
}

export { newWinMain };
