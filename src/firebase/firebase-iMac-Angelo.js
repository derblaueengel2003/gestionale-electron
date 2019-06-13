import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCrzOL1tmNzM2a0aKb3Y5KHdwKHAwY35j0",
    authDomain: "expensify-5ccf2.firebaseapp.com",
    databaseURL: "https://expensify-5ccf2.firebaseio.com",
    projectId: "expensify-5ccf2",
    storageBucket: "expensify-5ccf2.appspot.com",
    messagingSenderId: "144709598098",
    appId: "1:144709598098:web:f99feef0435bc68d"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

const notes = [{
    id: '12',
    title: 'First note!',
    body: 'This is my note'
}, {
    id: '761ase',
    title: 'Another note',
    body: 'This is my note'
}]

database.ref('notes').set(notes)



// database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val())
// })

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