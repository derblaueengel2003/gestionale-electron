import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import storeSection from './storeSection';

// action and reducer creation
const storeReducers = {};
export const storeActions = [];
export const storeSections = [
  'clienti',
  'deals',
  'evaluations',
  'fatture',
  'firma',
  'leads',
  'offers',
  'oggetti',
  'utenti',
];
storeSections.forEach((section) => {
  const newSection = new storeSection(section);
  storeReducers[newSection.label] = newSection.actionReducer;
  storeActions.push(newSection.getActions());
});

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
      auth: authReducer,
      filters: filtersReducer,
      ...storeReducers,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
