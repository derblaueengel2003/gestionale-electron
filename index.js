const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const axios = require('axios');

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

ipcMain.on('oggetto:fetch', async (event, url) => {
  const { data: oggetto } = await axios.get(
    `https://www.m2square.eu/wp-json/wl/v1/properties/${url}`
  );
  console.log(oggetto);
  mainWindow.webContents.send('oggetto:response', oggetto);
});
