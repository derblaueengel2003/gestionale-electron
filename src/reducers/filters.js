import moment from 'moment'

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    cliente: '',
    sortBy: 'date',
    startDate: null,
    endDate: null,
    lead: ''
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SET_CLIENTE_FILTER':
            return {
                ...state,
                cliente: action.cliente
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
        case 'SORT_BY_PAID':
            return {
                ...state,
                sortBy: 'paid'
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
        case 'SET_LEAD_FILTER':
            return {
                ...state,
                lead: action.lead
            }
        default:
            return state
    }
}