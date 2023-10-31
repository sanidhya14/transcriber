const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myDialog", {
  showDialog: async () => await ipcRenderer.invoke("dialog:open"),
});
