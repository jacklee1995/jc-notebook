const { ipcRenderer } = require("electron");

declare type FileInfos = {
  filepath?: string;
  changeTime?: string;
};

const currentFileInfosContainer: FileInfos = {};
const fileInfo = new Proxy(currentFileInfosContainer, {
  get: function (obj, prop: "filepath" | "changeTime") {
    return obj[prop];
  },
  set: function (obj, prop: "filepath" | "changeTime", value: string) {
    obj[prop] = value;
    return true;
  },
});


async function setupOpenFileIpc() {
  const currentWindow = require("@electron/remote").getCurrentWindow();
  const winId = currentWindow.id;
  let path = ''
  await ipcRenderer
    .invoke("ask-current-filepath", {
      id: winId,
    })
    .then((result: any) => {
      fileInfo["filepath"] = result;
      path = result
    })
  return Promise.resolve(path); 
}

export { setupOpenFileIpc, fileInfo };
