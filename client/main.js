const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        devTools: true,
        nodeIntegration: true,
        webSecurity: false
    },
  });

  const indexFilePath = isDev
    ? 'http://localhost:3000' // Development server URL
    : `file://${path.join(__dirname, 'build/index.html')}`; // Production build

  console.log(`Index file path being used: ${indexFilePath}`)

  mainWindow.loadURL(indexFilePath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
