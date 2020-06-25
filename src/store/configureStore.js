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
import evaluationReducer from '../reducers/evaluation';

// Store creation
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;
export default () => {
  const store = createStore(
    combineReducers({
      accentro: accentroReducer,
      auth: authReducer,
      clienti: clientiReducer,
      deals: dealsReducer,
      evaluations: evaluationReducer,
      fatture: fattureReducer,
      filters: filtersReducer,
      firma: firmaReducer,
      leads: leadsReducer,
      offers: offersReducer,
      oggetti: oggettiReducer,
      utenti: utentiReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
