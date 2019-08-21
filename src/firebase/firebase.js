import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

// //child_removed
// database.ref('deals').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// //child_changed
// database.ref('deals').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// //child_added
// database.ref('deals').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })


// database.ref('deals')
// .once('value')
// .then((snapshot) => {
//     const deals = []

//     snapshot.forEach((childSnapshot) => {
//         deals.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })

//     console.log(deals)
// })

// database.ref('deals')
// .on('value', (snapshot) => {
//     const deals = []

//     snapshot.forEach((childSnapshot) => {
//         deals.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })

//     console.log(deals)
    
// })

// database.ref('deals').push({
//     oggettoId: 'la nuova',
//     note: '1',
//     amount: 10,
//     createdAt: 0
// })

// database.ref('notes').push({
//     title: 'course topic',
//     body: 'angular'
// })

// database.ref('notes/-Lh5yWY2V0kXtStdnGlR').remove()

// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// })

// setTimeout( () => {
//    database.ref('age').set(29) 
// }, 3500)

// setTimeout( () => {
//     database.ref().off()
//  }, 7000)

//  setTimeout( () => {
//     database.ref('age').set(30) 
//  }, 10500)


// database.ref('location/city')
// .once('value')
// .then((snapshot) => {
//   const val =  snapshot.val()
//   console.log(val)
// })
// .catch((e) => {
//     console.log('Error fetching data', e)
// }
// )
// database.ref().set({
//     name: 'Angelo Arboscello',
//     age: 44,
//     stressLevel: 6,
//     job: {
//         title: 'Software development',
//         company: 'Google'
//     },
//     location: {
//         city: 'Berlin',
//         country: 'Germany'
//     }  
// }).then ( () => {
//     console.log('Data is saved')
// }).catch( (e) => {
//     console.log('This failed!', e)
// })

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// database.ref()
// .remove()
// .then( () => {
//     console.log('Data was removed')
// }).catch( (e) => {
//     console.log('Did not remove data', e)
// }
// )