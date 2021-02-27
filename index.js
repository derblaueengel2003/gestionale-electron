const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell, Menu } = electron;
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

const axios = require('axios');
const path = require('path');
const homedir = require('os').homedir();
const fs = require('fs');
// const FormData = require('form-data');
// const crypto = require('crypto');

let mainWindow;

// Contextual Menu
const template = [
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        role: 'cut',
      },
      {
        role: 'copy',
      },
      {
        role: 'paste',
      },
      {
        type: 'separator',
      },
      {
        role: 'toggleDevTools',
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
});

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

//FOLDER//////
// cerco la cartella OneDrive che può avere nome diverso in caso di os in italiano
const cloudPath = fs
  .readdirSync(`${homedir}/m2Square - Arboscello & Fornari GbR/`)
  .filter((fn) => fn.startsWith('m2Square Office'))[0];

const mainFolder = `/m2Square - Arboscello & Fornari GbR/${cloudPath}/`;
const folderPath = (folder) => {
  return path.join(homedir, mainFolder, folder);
};

const filePath = (folder, folderNamePartial) => {
  const findPath = fs
    .readdirSync(folderPath(folder))
    .filter((fn) => fn.startsWith(folderNamePartial));

  return findPath[0] || '';
};

const finalPath = (folder, folderNamePartial) =>
  path.join(folderPath(folder), filePath(folder, folderNamePartial)).trim();

ipcMain.on('folder:open', (event, { folder, folderNamePartial }) => {
  shell.openItem(finalPath(folder, folderNamePartial));
});

//////LINK OPENER///////

ipcMain.on('link:open', (event, link) => {
  shell.openExternal(link);
});

/////////// IS24 lo passo a ipc per via del CORS
ipcMain.on('is24:send', async (event, options) => {
  try {
    const { data } = await axios(options);
    mainWindow.webContents.send('is24:response', data);
  } catch (error) {
    mainWindow.webContents.send('is24:error', error);
    console.log('ERROR IS24: ', error);
  }
});

/////////////// IS 24 IMAGES // IN PROGRESS
// ipcMain.on('is24img:upload', async (event, options) => {
//   console.log('Options: ', options);
//   // scarico l'immagine da wordpress e la salvo su disco nella cartella public dell'applicazione
//   try {
//     const { data } = await axios({
//       url: options.url,
//       responseType: 'stream',
//     });

//     // console.log('response: ', data);
//     data.pipe(
//       fs.createWriteStream(`${__dirname}/public/${options.imagePath}.jpeg`)
//     );

//     const readStream = fs.createReadStream(
//       `${__dirname}/public/${options.imagePath}.jpeg`
//     );

//     //Checksum
//     function generateChecksum(str, algorithm, encoding) {
//       return crypto
//         .createHash(algorithm || 'md5')
//         .update(str, 'utf8')
//         .digest(encoding || 'hex');
//     }

//     const imageFile = new FormData();
//     imageFile.append('attachment', readStream);

//     const externalCheckSum = () => {
//       let checksum = '';
//       fs.readFile(
//         `${__dirname}/public/${options.imagePath}.jpeg`,
//         function (err, data) {
//           checksum = generateChecksum(data);
//         }
//       );
//       return checksum;
//     };
//     console.log('checksum: ', externalCheckSum());

//     const json = {
//       'common.attachment': {
//         '@xmlns': {
//           common: 'http://rest.immobilienscout24.de/schema/common/1.0',
//         },
//         '@xsi.type': 'common:Picture',
//         title: 'test',
//         externalId: `${options.imagePath}`,
//         externalCheckSum: 'mychecksum',
//         floorplan: 'false',
//         titlePicture: 'false',
//       },
//     };
//     let jsonStream = fs.createWriteStream('./body.json');

//     jsonStream.write(JSON.stringify(json));

//     imageFile.append(
//       'metadata',
//       fs.createReadStream('./body.json', { encoding: 'UTF8' })
//     );

//     const config = {
//       method: 'post',
//       url: options.base_url,
//       data: imageFile,
//       headers: {
//         // 'Content-Type': `multipart/form-data`,
//         // 'Content-Transfer-Encoding': 'binary',
//         Authorization: options.oAuth,
//       },
//     };
//     console.log('Config: ', config);

//     // send the picture to is24
//     const imgResponse = await axios(config);
//     mainWindow.webContents.send('is24img:response', imgResponse);
//   } catch (error) {
//     mainWindow.webContents.send('is24img:error', error);
//     console.log('Response error: ', error);
//   }
// });

/// Folder Create
// ipcMain.on('folder:create', (event, { folder, folderNamePartial }) => {
//   if (!fs.existsSync(finalPath(folder, folderNamePartial))) {
//     fs.mkdirSync(finalPath(folder, folderNamePartial));
//   }
//   console.log(finalPath(folder, folderNamePartial));
//   shell.openItem(finalPath(folder, folderNamePartial));
// });

// ipcMain.on('window:reload', (event) => {
//   mainWindow.loadURL(`file://${__dirname}/public/index.html`);
// });

// ipcMain.on('oggetto:fetch', async (event, url) => {
//   mainWindow.webContents.send('oggetto:spinner', true);

//   try {
//     const { data: oggetto } = await axios.get(
//       `https://www.m2square.eu/wp-json/wl/v1/properties/${url}`
//     );
//     mainWindow.webContents.send('oggetto:response', oggetto);
//     mainWindow.webContents.send('oggetto:spinner', false);
//   } catch (error) {
//     mainWindow.webContents.send('oggetto:error', error);
//   }
// });
