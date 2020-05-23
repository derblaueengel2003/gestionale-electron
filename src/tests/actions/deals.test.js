import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
    addDeal, 
    startAddDeal, 
    removeDeal, 
    startRemoveDeal, 
    editDeal, 
    startEditDeal,
    setDeals, 
    startSetDeals, 
} from '../../actions/deals'
import deals from '../fixtures/deals'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const dealsData = {}
    deals.forEach(({ 
        id, 
        oggettoId,
        prezzoDiVendita,
        amount,
        provvM2square,
        provvStefano,
        payedAtStefano,
        payedStefano,
        agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner,
        createdAt,
        note,
        venditoreId,
        venditoreId2,
        acquirenteId,
        acquirenteId2,
        notaioId,
        consulenteVendita,
        dealType,
        belastungsVollmacht,
        linguaRogito,
        dataRogito,
        dataConsegna,
        todo1,
        todo2,
        todo3,
        todo4,
        todo5,
        todo6,
        todo7,
        todo8,
        todo9,
        todo10,
        todo11, }) => {
        dealsData[id] = { 
            oggettoId,
            prezzoDiVendita,
            amount,
            provvM2square,
            provvStefano,
            payedAtStefano,
            payedStefano,
            agenziaPartnerId,
            provvAgenziaPartner,
            payedAgenziaPartner,
            createdAt,
            note,
            venditoreId,
            venditoreId2,
            acquirenteId,
            acquirenteId2,
            notaioId,
            consulenteVendita,
            dealType,
            belastungsVollmacht,
            linguaRogito,
            dataRogito,
            dataConsegna,
            todo1,
            todo2,
            todo3,
            todo4,
            todo5,
            todo6,
            todo7,
            todo8,
            todo9,
            todo10,
            todo11, 
        }
    })
    database.ref(`deals`).set(dealsData).then(() => done())
})

test('should setup remove deal action object', () => {
    const action = removeDeal({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_DEAL',
        id: '123abc'
    })
})

// test('should remove deal from firebase', (done) => {
//     const store = createMockStore(defaultAuthState)
//     const id = deals[2].id
//     store.dispatch(startRemoveDeal({ id })).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'REMOVE_DEAL',
//             id
//         })
//         return database.ref(`users/${uid}/deals/${id}`).once('value')
//     }).then((snapshot) => {
//         expect(snapshot.val()).toBeFalsy()
//         done()
//     })
// })

// test('should setup edit deal action object', () => {
//     const action = editDeal('123abc', { note: 'New note value' })
//     expect(action).toEqual({
//         type: 'EDIT_DEAL',
//         id: '123abc',
//         updates: {
//             note: 'New note value'
//         } 
//     })
// })

// test('should edit deals from firebase', (done) => {
//     const store = createMockStore(defaultAuthState)
//     const id = deals[0].id
//     const updates = { amount: 21045 }
//     store.dispatch(startEditDeal(id, updates)).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'EDIT_DEAL',
//             id,
//             updates
//         })
//         return database.ref(`users/${uid}/deals/${id}`).once('value')
//     }).then((snapshot) => {
//         expect(snapshot.val().amount).toBe(updates.amount)
//         done()
//     })
// })


// test('should setup add deal action object with provided values', () => {
//     const action = addDeal(deals[2])
//     expect(action).toEqual({
//         type: 'ADD_DEAL',
//         deal: deals[2]
//     })
// })

// test('should add deal to database and store', (done) => {
//     const store = createMockStore(defaultAuthState)
//     const dealData = {
//         oggettoId : '100',
//         prezzoDiVendita : 10000000,
//         amount : 600000,
//         provvM2square : 400000,
//         provvStefano : 200000,
//         agenziaPartnerId : '',
//         provvAgenziaPartner : 0,
//         payedAgenziaPartner : false,
//         createdAt : 1000,
//         payedStefano : false,
//         payedAtStefano : null,
//         note : '',
//         venditoreId : '10',
//         venditoreId2 : '',
//         acquirenteId : '20',
//         acquirenteId2 : '',
//         notaioId : '',
//         consulenteVendita : '',
//         dealType : '',
//         belastungsVollmacht : false,
//         linguaRogito : '',
//         dataRogito : null,
//         dataConsegna : null,
//         todo1 : false,
//         todo2 : false,
//         todo3 : false,
//         todo4 : false,
//         todo5 : false,
//         todo6 : false,
//         todo7 : false,
//         todo8 : false,
//         todo9 : false,
//         todo10 : false,
//         todo11 : false,
//     }

//     store.dispatch(startAddDeal(dealData)).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'ADD_DEAL',
//             deal: {
//                 id: expect.any(String),
//                 ...dealData
//             }
//         })

//        return database.ref(`users/${uid}/deals/${actions[0].deal.id}`).once('value') 
//     }).then((snapshot) => {
//         expect(snapshot.val()).toEqual(dealData)
//         done()
//     })
    
// })

// test('should add deal with default to database and store', (done) => {
//     const store = createMockStore(defaultAuthState)
//     const dealDefault = {
//         oggettoId : '',
//         prezzoDiVendita : 0,
//         amount : 0,
//         provvM2square : 0,
//         provvStefano : 0,
//         agenziaPartnerId : '',
//         provvAgenziaPartner : 0,
//         payedAgenziaPartner : false,
//         createdAt : null,
//         payedStefano : false,
//         payedAtStefano : null,
//         note : '',
//         venditoreId : '',
//         venditoreId2 : '',
//         acquirenteId : '',
//         acquirenteId2 : '',
//         notaioId : '',
//         consulenteVendita : '',
//         dealType : '',
//         belastungsVollmacht : false,
//         linguaRogito : '',
//         dataRogito : null,
//         dataConsegna : null,
//         todo1 : false,
//         todo2 : false,
//         todo3 : false,
//         todo4 : false,
//         todo5 : false,
//         todo6 : false,
//         todo7 : false,
//         todo8 : false,
//         todo9 : false,
//         todo10 : false,
//         todo11 : false,
//     }

//     store.dispatch(startAddDeal({})).then(() => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'ADD_DEAL',
//             deal: {
//                 id: expect.any(String),
//                 ...dealDefault
//             }
//         })

//        return database.ref(`users/${uid}/deals/${actions[0].deal.id}`).once('value') 
//     }).then((snapshot) => {
//         expect(snapshot.val()).toEqual(dealDefault)
//         done()
//     })
    
// })

// test('should setup set deal actin with data', () => {
//     const action = setDeals(deals)
//     expect(action).toEqual({
//         type: 'SET_DEALS',
//         deals
//     })
// })

// test('should fetch the deals from firebase', (done) => {
//     const store = createMockStore(defaultAuthState)
//     store.dispatch(startSetDeals()).then( () => {
//         const actions = store.getActions()
//         expect(actions[0]).toEqual({
//             type: 'SET_DEALS',
//             deals
//         })
//         done()
//     })
// })