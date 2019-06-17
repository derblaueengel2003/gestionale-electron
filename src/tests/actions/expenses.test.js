import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
    startAddDeal, 
    addDeal, 
    editDeal, 
    removeDeal, 
    setDeals, 
    startSetDeals, 
    startRemoveDeal, 
    startEditDeal
} from '../../actions/deals'
import deals from '../fixtures/deals'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const dealsData = {}
    deals.forEach(({ id, description, note, amount, createdAt }) => {
        dealsData[id] = { description, note, amount, createdAt }
    })
    database.ref(`users/${uid}/deals`).set(dealsData).then(() => done())
})

test('should setup remove deal action object', () => {
    const action = removeDeal({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_DEAL',
        id: '123abc'
    })
})

test('should remove deal from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = deals[2].id
    store.dispatch(startRemoveDeal({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_DEAL',
            id
        })
        return database.ref(`users/${uid}/deals/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
    })
})

test('should setup edit deal action object', () => {
    const action = editDeal('123abc', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_DEAL',
        id: '123abc',
        updates: {
            note: 'New note value'
        } 
    })
})

test('should edit deals from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = deals[0].id
    const updates = { amount: 21045 }
    store.dispatch(startEditDeal(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_DEAL',
            id,
            updates
        })
        return database.ref(`users/${uid}/deals/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount)
        done()
    })
})


test('should setup add deal action object with provided value', () => {
    const action = addDeal(deals[2])
    expect(action).toEqual({
        type: 'ADD_DEAL',
        deal: deals[2]
    })
})

test('should add deal to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const dealData = {
        description: 'mouse',
        amount: 30000,
        note: 'This one is better',
        createdAt: 1000
    }

    store.dispatch(startAddDeal(dealData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_DEAL',
            deal: {
                id: expect.any(String),
                ...dealData
            }
        })

       return database.ref(`users/${uid}/deals/${actions[0].deal.id}`).once('value') 
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(dealData)
        done()
    })
    
})

test('should add deal with default to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const dealDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddDeal({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_DEAL',
            deal: {
                id: expect.any(String),
                ...dealDefault
            }
        })

       return database.ref(`users/${uid}/deals/${actions[0].deal.id}`).once('value') 
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(dealDefault)
        done()
    })
    
})

test('should setup set deal actin with data', () => {
    const action = setDeals(deals)
    expect(action).toEqual({
        type: 'SET_DEALS',
        deals
    })
})

test('should fetch the deals from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetDeals()).then( () => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_DEALS',
            deals
        })
        done()
    })
})