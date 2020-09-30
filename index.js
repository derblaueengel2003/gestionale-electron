const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell } = electron;
const axios = require('axios');
const path = require('path');
const homedir = require('os').homedir();
const fs = require('fs');
const FormData = require('form-data');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1100,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });

  // carico la pagina
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

ipcMain.on('window:reload', (event) => {
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
});

ipcMain.on('oggetto:fetch', async (event, url) => {
  mainWindow.webContents.send('oggetto:spinner', true);

  try {
    const { data: oggetto } = await axios.get(
      `https://www.m2square.eu/wp-json/wl/v1/properties/${url}`
    );
    mainWindow.webContents.send('oggetto:response', oggetto);
    mainWindow.webContents.send('oggetto:spinner', false);
  } catch (error) {
    mainWindow.webContents.send('oggetto:error', error);
  }
});

ipcMain.on('folder:open', (event, { folder, folderNamePartial }) => {
  const folderPath = path.join(homedir, folder);
  const filePath = () => {
    const findPath = fs
      .readdirSync(folderPath)
      .filter((fn) => fn.startsWith(folderNamePartial));

    return findPath[0] || '';
  };

  const finalPath = path.join(folderPath, filePath());

  shell.openPath(finalPath);
});

ipcMain.on('link:open', (event, link) => {
  shell.openExternal(link);
});

//////////////////// IS24
ipcMain.on('is24:send', async (event, options) => {
  try {
    const { data } = await axios(options);
    mainWindow.webContents.send('is24:response', data);
  } catch (error) {
    mainWindow.webContents.send('is24:error', error);
  }
});

ipcMain.on('is24img:upload', async (event, imgSettings) => {
  // scarico l'immagine da wordpress e la salvo su disco
  const { imagePath, url, is24id, oAuth } = imgSettings;
  try {
    const { data } = await axios({
      url,
      responseType: 'stream',
    });

    data.pipe(fs.createWriteStream(`${__dirname}/public/${imagePath}`));

    const imageFile = new FormData();
    imageFile.append('file', `${__dirname}/public/${imagePath}`);
    const json = {
      'common.attachment': {
        '@xmlns': {
          common: 'http://rest.immobilienscout24.de/schema/common/1.0',
        },
        '@xsi.type': 'common:Picture',
        title: 'test',
        externalId: 'test',
        externalCheckSum: 'test',
        floorplan: 'false',
        titlePicture: 'false',
      },
    };
    const body = { imageFile, json };

    const base_url = `https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate/${is24id}/attachment`;
    const options = {
      method: 'post',
      url: base_url,
      data: body,
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: oAuth,
      },
    };

    // send the picture to is24
    const { data: responseData } = await axios(options);

    mainWindow.webContents.send('is24img:success', responseData);
  } catch (error) {
    mainWindow.webContents.send('is24img:error', error);
  }
});
