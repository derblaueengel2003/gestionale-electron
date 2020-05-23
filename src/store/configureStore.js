import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import dealsReducer from '../reducers/deals';
import filtersReducer from '../reducers/filters';
import utentiReducer from '../reducers/utenti';
import clientiReducer from '../reducers/clienti';
import authReducer from '../reducers/auth';
import oggettiReducer from '../reducers/oggetti';
import leadsReducer from '../reducers/leads';
import offersReducer from '../reducers/offers';
import accentroReducer from '../reducers/accentro';
import fattureReducer from '../reducers/fatture';
import firmaReducer from '../reducers/firma';

// Store creation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      deals: dealsReducer,
      filters: filtersReducer,
      auth: authReducer,
      utenti: utentiReducer,
      clienti: clientiReducer,
      oggetti: oggettiReducer,
      leads: leadsReducer,
      offers: offersReducer,
      accentro: accentroReducer,
      fatture: fattureReducer,
      firma: firmaReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
