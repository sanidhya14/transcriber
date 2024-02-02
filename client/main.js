const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      // contextIsolation: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const indexFilePath = isDev
    ? "http://localhost:3000" // Development server URL
    : `file://${path.join(__dirname, "build/index.html")}`; // Production build

  console.log(`Index file path being used: ${indexFilePath}`);

  mainWindow.loadURL(indexFilePath);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:open", async (_, args) => {
    const result = await dialog.showOpenDialog({ properties: ["openFile"] });
    return result;
  });
  createWindow()
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
