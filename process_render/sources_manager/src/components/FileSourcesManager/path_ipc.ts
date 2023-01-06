const { ipcRenderer } = require("electron");

declare type FoulderInfos = {
  foulderpath?: string;
  changeTime?: string;
};

const currentFoulderInfosContainer: FoulderInfos = {};
const fileInfo = new Proxy(currentFoulderInfosContainer, {
  get: function (obj, prop: "foulderpath" | "changeTime") {
    return obj[prop];
  },
  set: function (obj, prop: "foulderpath" | "changeTime", value: string) {
    obj[prop] = value;
    return true;
  },
});

async function setupOpenFoulderIpc() {
  const currentWindow = require("@electron/remote").getCurrentWindow();
  const winId = currentWindow.id;
  let path = ''
  await ipcRenderer
    .invoke("ask-current-foulderpath", {
      id: winId,
    })
    .then((result: any) => {
      fileInfo["foulderpath"] = result;
      path = result
    })
  return Promise.resolve(path); 
}

export { setupOpenFoulderIpc, fileInfo };
