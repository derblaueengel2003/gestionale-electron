import moment from 'moment'
import dealsReducer from '../../reducers/deals'
import deals from '../fixtures/deals'

test('should set default state', () => {
    const state = dealsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove deal by id', () => {
    const action = {
        type: 'REMOVE_DEAL',
        id: deals[1].id
    }
    const state = dealsReducer(deals, action)
    expect(state).toEqual([deals[0], deals[2]])
})

test('should not remove deal if id not found', () => {
    const action = {
        type: 'REMOVE_DEAL',
        id: '-1'
    }
    const state = dealsReducer(deals, action)
    expect(state).toEqual(deals)
})

test('should add an deal', () => {
    const deal = {
        id: '4',
        description: 'Gym',
        note: '',
        amount: 20500,
        createdAt: 20000
    }
    const action = { 
        type: 'ADD_DEAL',
        deal
    }
    const state = dealsReducer(deals, action)
    expect(state).toEqual([...deals, deal])
})

test('should edit an deal', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_DEAL',
        id: deals[1].id,
        updates: {
            amount
        }
    }
    const state = dealsReducer(deals, action)
    expect(state[1].amount).toBe(amount)
})

test('should not edit an deal if id not found', () => {
    const amount = 122000
    const action = {
        type: 'EDIT_DEAL',
        id: '-1',
        updates: {
            amount
        }
    }
    const state = dealsReducer(deals, action)
    expect(state).toEqual(deals)
})

test('should set deals', () => {
    const action = {
        type: 'SET_DEALS',
        deals: [deals[1]]
    }
    const state = dealsReducer(deals, action)
    expect(state).toEqual([deals[1]])
})