const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1024,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      // webSecurity: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});
