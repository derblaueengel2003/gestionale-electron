import * as firebase from 'firebase';
import 'firebase/storage';
import google from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  '692290965696-40un6en5v8cof0iennkj1gjkafmoasft.apps.googleusercontent.com',
  '27dGP7NbGdFSPB5Fd4oaH9jq',
  'https://gestionale-dummy.firebaseapp.com/__/auth/handler'
);

// set auth as a global default
google.options({
  auth: oauth2Client
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { firebase, storage, googleAuthProvider, database as default };
