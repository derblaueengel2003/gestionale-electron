const electron = require('electron');
const { app, BrowserWindow, ipcMain, shell } = electron;
const {
  default: installExtension,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

const axios = require('axios');
const path = require('path');
const homedir = require('os').homedir();
const fs = require('fs');
const FormData = require('form-data');
const uuid = require('uuid');
const crypto = require('crypto');
const https = require('https');

let mainWindow;

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

//FOLDER//////
const mainFolder = `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/`;
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

// ipcMain.on('folder:create', (event, { folder, folderNamePartial }) => {
//   if (!fs.existsSync(finalPath(folder, folderNamePartial))) {
//     fs.mkdirSync(finalPath(folder, folderNamePartial));
//   }
//   console.log(finalPath(folder, folderNamePartial));
//   shell.openItem(finalPath(folder, folderNamePartial));
// });

/////////////

ipcMain.on('link:open', (event, link) => {
  shell.openExternal(link);
});

/////////// IS24
ipcMain.on('is24:send', async (event, options) => {
  try {
    const { data } = await axios(options);
    mainWindow.webContents.send('is24:response', data);
  } catch (error) {
    mainWindow.webContents.send('is24:error', error);
  }
});

/////////////// IS 24 IMAGES // IN PROGRESS

const connectToIS24 = (base_url) => {
  const oauth_timestamp = Math.floor(Date.now() / 1000);
  const oauth_nonce = uuid.v1();
  const oauth_token = 'b895110f-2b6d-41ea-b1d4-85a63a17c200';
  const parameters = {
    oauth_consumer_key: 'm2SquareImmobilienKey',
    oauth_nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp,
    oauth_token,
    oauth_version: '1.0',
  };
  let ordered = {};
  Object.keys(parameters)
    .sort()
    .forEach(function (key) {
      ordered[key] = parameters[key];
    });
  let encodedParameters = '';
  for (let k in ordered) {
    const encodedValue = escape(ordered[k]);
    const encodedKey = encodeURIComponent(k);
    if (encodedParameters === '') {
      encodedParameters += encodeURIComponent(`${encodedKey}=${encodedValue}`);
    } else {
      encodedParameters += encodeURIComponent(`&${encodedKey}=${encodedValue}`);
    }
  }
  const method = 'POST';
  const encodedUrl = encodeURIComponent(base_url);
  const signature_base_string = `${method}&${encodedUrl}&${encodedParameters}`;
  const encodedClientSecret = encodeURIComponent('c1jaBYcJ2umVdm0G');
  const encodedTokenSecret = encodeURIComponent(
    'WnKSZ4FByiUAL2Cg0fGVqhLDNU8UX7BQfA+Xf+gSvz2BC0yaKxtmLGDJH4gUt9bK+RnyGOEJAadpp7XzSWLDzQYZFfX9dDp7ILp+mhM92JQ='
  );
  const signing_key = `${encodedClientSecret}&${encodedTokenSecret}`;
  const oauth_signature = crypto
    .createHmac('sha1', signing_key)
    .update(signature_base_string)
    .digest()
    .toString('base64');
  const encoded_oauth_signature = encodeURIComponent(oauth_signature);
  const oAuth = `OAuth oauth_consumer_key="m2SquareImmobilienKey",oauth_nonce="${oauth_nonce}",oauth_signature="${encoded_oauth_signature}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${oauth_timestamp}",oauth_token="${oauth_token}",oauth_version="1.0"`;
  return oAuth;
};

ipcMain.on('is24img:upload', async (event, options) => {
  // console.log('Options: ', options);
  // scarico l'immagine da wordpress e la salvo su disco nella cartella public dell'applicazione
  try {
    const { data } = await axios({
      url: options.url,
      responseType: 'stream',
    });

    // console.log('response: ', data);
    data.pipe(
      fs.createWriteStream(`${__dirname}/public/${options.imagePath}.jpeg`)
    );

    const readStream = fs.createReadStream(
      `${__dirname}/public/${options.imagePath}.jpeg`
    );

    //Checksum
    function generateChecksum(str, algorithm, encoding) {
      return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
    }

    const imageFile = new FormData();
    const optionsImg = {
      header: 'Content-Transfer-Encoding: binary',
    };
    imageFile.append('attachment', readStream);

    const externalCheckSum = fs.readFile(
      `${__dirname}/public/${options.imagePath}.jpeg`,
      function (err, data) {
        const checksum = generateChecksum(data);
        return checksum;
      }
    );
    console.log('external checkusm: ', externalCheckSum);

    const json = {
      'common.attachment': {
        '@xmlns': {
          common: 'http://rest.immobilienscout24.de/schema/common/1.0',
        },
        '@xsi.type': 'common:Picture',
        title: 'test',
        externalId: 'test',
        externalCheckSum,
        floorplan: 'false',
        titlePicture: 'false',
      },
    };
    let jsonStream = fs.createWriteStream('./body.json');

    jsonStream.write(JSON.stringify(json));

    const optionsJson = {
      header: 'Content-Transfer-Encoding: binary',
    };

    imageFile.append(
      'metadata',
      fs.createReadStream('./body.json', { encoding: 'UTF8' })
    );

    const base_url = `https://rest.immobilienscout24.de/restapi/api/offer/v1.0/user/me/realestate/${options.is24id}/attachment/`;
    const oAuth = connectToIS24(base_url);
    const config = {
      method: 'post',
      url: base_url,
      data: imageFile,
      headers: {
        // 'Content-Type': `multipart/form-data; boundary=${imageFile._boundary}`,
        'Content-Transfer-Encoding': 'binary',
        Authorization: oAuth,
      },
    };
    console.log('Config: ', config);

    // send the picture to is24
    const imgResponse = await axios(config);
    mainWindow.webContents.send('is24img:response', imgResponse);
  } catch (error) {
    mainWindow.webContents.send('is24img:error', error);
    console.log('Response error: ', error);
  }
});
