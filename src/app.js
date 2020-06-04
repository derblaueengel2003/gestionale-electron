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
import { startSetOffers } from './actions/offers';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { startSetOggetti } from './actions/oggetti';
import { startSetAccentro } from './actions/accentro';
import { startSetFatture } from './actions/fatture';
import { startSetFirma } from './actions/firma';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';

const link = new HttpLink({
  uri: 'http://localhost:8888/graphql',
});

// const authLink = setContext((_, { headers }) => {
// get the authentication token from local storage if it exists
// const token = localStorage.getItem('token');
// return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token
//         ? `Bearer ${token}`
//         : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3LmJlcmxpbmIyYy5jb20iLCJpYXQiOjE1OTExNzI1MzEsIm5iZiI6MTU5MTE3MjUzMSwiZXhwIjoxNTkxMTcyODMxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.7BklTWXSg5H28gaGH77KPFndRO_r_6JxbGrer0_Z4Dg`,
//     },
//   };
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link, //: authLink.concat(link),
});

const store = configureStore();

const jsx = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ApolloProvider>
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
    store.dispatch(startSetUsers());
    store.dispatch(startSetCustomers());
    store.dispatch(startSetOggetti());
    store.dispatch(startSetLeads());
    store.dispatch(startSetOffers());
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
