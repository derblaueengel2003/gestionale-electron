const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const axios = require('axios');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1200,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      // webSecurity: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

ipcMain.on('oggetto:fetch', async (event, url) => {
  try {
    const { data: oggetto } = await axios.get(
      `https://www.m2square.eu/wp-json/wl/v1/properties/${url}`
    );
    mainWindow.webContents.send('oggetto:response', oggetto);
  } catch (error) {
    mainWindow.webContents.send('oggetto:error', error);
  }
});

ipcMain.on('is24:send', async (event, options) => {
  try {
    const { data } = await axios(options);
    mainWindow.webContents.send('is24:response', data);
  } catch (error) {
    mainWindow.webContents.send('is24:error', error);
  }
});
