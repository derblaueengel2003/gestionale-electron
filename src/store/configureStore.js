import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import dealsReducer from '../reducers/deals'
import filtersReducer from '../reducers/filters'
import utentiReducer from '../reducers/utenti'
import clientiReducer from '../reducers/clienti'
import authReducer from '../reducers/auth'
import oggettiReducer from '../reducers/oggetti'
import fattureReducer from '../reducers/fatture'

// Store creation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            deals: dealsReducer,
            filters: filtersReducer,
            auth: authReducer,
            utenti: utentiReducer,
            clienti: clientiReducer,
            oggetti: oggettiReducer,
            fatture: fattureReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    ) 

    return store
}


