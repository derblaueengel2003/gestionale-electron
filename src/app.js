import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import configureStore, { storeActions } from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    for (let i = 0; i < storeActions.length; i++) {
      if (i === storeActions.length - 1) {
        store.dispatch(storeActions[i].startSetAction()).then(() => {
          renderApp();
          history.push('/deals');
          // if (history.location.pathname === '/') {
          // }
        });
      } else {
        store.dispatch(storeActions[i].startSetAction());
      }
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
