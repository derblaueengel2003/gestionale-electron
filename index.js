const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell, Menu } = electron;
const axios = require('axios');
const path = require('path');
const homedir = require('os').homedir();
const fs = require('fs');

let mainWindow;
let addWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 1000,
    width: 1100,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      // webSecurity: false,
    },
  });

  // carico la pagina
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);
  // mainWindow.on('closed', () => app.quit());

  // creo il menu
  // const mainMenu = Menu.buildFromTemplate(menuTemplate);
  // e lo inserisco
  // Menu.setApplicationMenu(mainMenu);
});

// function createAddWindow(event, title) {
//   addWindow = new BrowserWindow({
//     height: 800,
//     width: 600,
//     title,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });
//   // addWindow.loadURL(`file://${__dirname}/public/index.html#/clienticreate`);
//   addWindow.on('close', () => (addWindow = null));
// }

// Menu
// const menuTemplate = [
//   { label: 'Gestionale m2Square' },
//   {
//     label: 'File',
//     submenu: [
//       // {
//       //   label: 'Nuovo contatto',
//       //   click() {
//       //     createAddWindow();
//       //   },
//       // },
//       { role: 'quit' },
//     ],
//   },
//   {
//     label: 'Edit',
//     submenu: [
//       { role: 'undo' },
//       { role: 'redo' },
//       { type: 'separator' },
//       { role: 'cut' },
//       { role: 'copy' },
//       { role: 'paste' },
//     ],
//   },
// ];

// controllo l'environment di node che può essere: production, development, staging, test
// if (process.env.NODE_ENV !== 'production') {
//   menuTemplate.push({
//     label: 'Developer',
//     submenu: [{ role: 'toggledevtools' }],
//   });
// }

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

ipcMain.on('is24:send', async (event, options) => {
  try {
    const { data } = await axios(options);
    mainWindow.webContents.send('is24:response', data);
  } catch (error) {
    mainWindow.webContents.send('is24:error', error);
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
