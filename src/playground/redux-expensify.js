import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_DEAL
const addDeal = (
    {
        oggettoId = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
    ) => ({
    type: 'ADD_DEAL',
    deal: {
        id: uuid(),
        oggettoId,
        note,
        amount,
        createdAt

    }
})

// REMOVE_DEAL
const removeDeal = ({ id } = {}) => ({
    type: 'REMOVE_DEAL',
    id
})

//EDIT_DEAL
const editDeal = (id, updates) => ({
    type: 'EDIT_DEAL',
    id,
    updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

 
// Deals Reducer

const dealsReducerDefaultState = []

const dealsReducer = (state = dealsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_DEAL':
            return [
                ...state, 
                action.deal
            ]
        case 'REMOVE_DEAL':
            return state.filter(({ id }) => id !== action.id)  
        case 'EDIT_DEAL':
            return state.map((deal) => {
                if (deal.id === action.id) {
                    return {
                        ...deal, 
                        ...action.updates
                    }
                } else {
                    return deal
                }
            })  
        default:
            return state
    }
}

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

// Get visible deals
const getVisibleDeals = (deals, { text, sortBy, startDate, endDate }) => {
    return deals.filter((deal) => {
        const startDateMatch = typeof startDate !== 'number' || deal.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || deal.createdAt <= endDate
        const textMatch = deal.oggettoId.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Store creation

const store = createStore(
    combineReducers({
        deals: dealsReducer,
        filters: filtersReducer
    })
) 

store.subscribe(() => {
    const state = store.getState()
    const visibleDeals = getVisibleDeals(state.deals, state.filters)

    console.log(visibleDeals)
})

const dealOne = store.dispatch(addDeal({ oggettoId: 'Rent', amount: 100, createdAt: -21000 }))
const dealTwo = store.dispatch(addDeal({ oggettoId: 'Coffee', amount: 300, createdAt: -1000 }))

// store.dispatch(removeDeal({ id: dealOne.deal.id }))
// store.dispatch(editDeal(dealTwo.deal.id, { amount: 500 }))

// store.dispatch(setTextFilter('fe'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))


const demoState = {
    deals: [{
        id: 'psadifuirefor',
        oggettoId: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filter: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}