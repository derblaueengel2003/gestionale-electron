import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import utentiReducer from '../reducers/utenti'
import authReducer from '../reducers/auth'

// Store creation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer,
            utenti: utentiReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    ) 

    return store
}


