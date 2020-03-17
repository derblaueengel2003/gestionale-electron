import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetDeals } from './actions/deals';
import { startSetUsers } from './actions/utenti';
import { startSetCustomers } from './actions/clienti';
import { startSetLeads } from './actions/leads';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { startSetOggetti } from './actions/oggetti';
import { startSetAccentro } from './actions/accentro';
import { startSetFatture } from './actions/fatture';
import { startSetFirma } from './actions/firma';

const store = configureStore();

const jsx = (
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </Suspense>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetUsers());
    store.dispatch(startSetCustomers());
    store.dispatch(startSetOggetti());
    store.dispatch(startSetLeads());
    store.dispatch(startSetAccentro());
    store.dispatch(startSetFatture());
    store.dispatch(startSetFirma());
    store.dispatch(startSetDeals()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
