import * as path from "path";
import * as os from "os";
import { app } from "electron";
import log4js from 'log4js';

const APP_NAME = "JCNotebook";
const BASE_DIR = path.resolve(
  path.resolve(path.resolve(__dirname, "../"), "../"),
  "../"
);
let MAIN_PROCESS_DIR: string;
if(process.env.NODE_ENV === "production"){
  MAIN_PROCESS_DIR = path.join(BASE_DIR, "app.asar");
}else{
  MAIN_PROCESS_DIR = path.join(BASE_DIR, "process_main");
}



const ENV_PATH = path.join(MAIN_PROCESS_DIR, ".env");

// LOGS
const LOG_DIR = app.getPath("logs");
const APP_LOG_PATH = path.join(LOG_DIR, "app.log");
const APP_DATAFILE_LOG_PATH = path.join(LOG_DIR, "datefile.log");
const NET_LOG_PATH = path.join(LOG_DIR, "net.log");
const APP_DATAS_BASE_DIR = path.join(
  path.join(path.join(os.homedir(), "AppData"), "Roaming"),
  APP_NAME
);

app.setAppLogsPath(path.join(APP_DATAS_BASE_DIR, "logs"));

log4js.configure({
  appenders: {
    fileout: { 
      type: "file", 
      filename: APP_LOG_PATH, 
    },
    datafileout: {
      type: "dateFile",
      filename: APP_DATAFILE_LOG_PATH,
      pattern: ".yyyy-MM-dd-hh-mm-ss-SSS",
      maxLoSize: 1024 * 1024 *100,
      backups: 6
    },
    consoleout: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileout", "consoleout"], level: "info" },
    anything: { appenders: ["consoleout"], level: "debug" },
  },
});
const logger = log4js.getLogger();

logger.level = "debug";

// Database
const DB_ABSOLUTE_PATH = path.join(APP_DATAS_BASE_DIR, "rundata.sqlite3");

// APP
const APP_ICON_PATH = path.join(
  path.join(BASE_DIR, "public"),
  "jcstudio_256x256.ico"
);
const DEFAULT_DATA_HOME = path.join(APP_DATAS_BASE_DIR, "notes");

const WINDOW_PORT = {
  main: 5173,
  editor_text: 5174,
  editor_markdown: 5175,
  editor_pointshow: 5176,
  editor_mindmap: 5177,
  editor_sketch: 5178,
  viewer_markdown: 5179,
  sources_manager: 5180,
};

// const RENDER_PROCESS_DIR = path.join(BASE_DIR, "process_render");
const RENDER_DISTA_DIR = path.join(MAIN_PROCESS_DIR, 'dist_render')

const RENDER_APP_PATH = {
  loading: path.join(RENDER_DISTA_DIR, "loading"),
  main: path.join(RENDER_DISTA_DIR, "index"),
  editor_text: path.join(RENDER_DISTA_DIR, "editor_text"),
  editor_markdown: path.join(RENDER_DISTA_DIR, "editor_markdown"),
  editor_pointshow: path.join(RENDER_DISTA_DIR, "editor_pointshow"),
  editor_mindmap: path.join(RENDER_DISTA_DIR, "editor_mindmap"),
  editor_sketch: path.join(RENDER_DISTA_DIR, "editor_sketch"),
  viewer_markdown: path.join(RENDER_DISTA_DIR, "viewer_markdown"),
  sources_manager: path.join(RENDER_DISTA_DIR, "sources_manager"),
};

const RENDER_HTML_PATH = {
  loading: path.join(RENDER_APP_PATH.loading, "index.html"),
  main: path.join(RENDER_APP_PATH.main, "index.html"),
  editor_text: path.join(RENDER_APP_PATH.editor_text, "index.html"),
  editor_markdown: path.join(RENDER_APP_PATH.editor_markdown, "index.html"),
  editor_pointshow: path.join(RENDER_APP_PATH.editor_pointshow, "index.html"),
  editor_mindmap: path.join(RENDER_APP_PATH.editor_mindmap, "index.html"),
  editor_sketch: path.join(RENDER_APP_PATH.editor_sketch, "index.html"),
  viewer_markdown: path.join(RENDER_APP_PATH.viewer_markdown, "index.html"),
  sources_manager: path.join(RENDER_APP_PATH.sources_manager, "index.html"),
};

export {
  APP_NAME,
  BASE_DIR,
  ENV_PATH,
  LOG_DIR,
  APP_DATAFILE_LOG_PATH,
  NET_LOG_PATH,
  APP_DATAS_BASE_DIR,
  logger,
  DB_ABSOLUTE_PATH,
  APP_ICON_PATH,
  DEFAULT_DATA_HOME,
  WINDOW_PORT,
  RENDER_HTML_PATH,
};
