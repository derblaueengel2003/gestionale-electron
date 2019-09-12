import database from '../firebase/firebase';

// ADD_CUSTOMER
export const addCustomer = customer => ({
  type: 'ADD_CUSTOMER',
  customer
});

export const startAddCustomer = (customerData = {}) => {
  return dispatch => {
    const {
      nome = '',
      cognome = '',
      titolo = '',
      ditta = '',
      indirizzo = '',
      indirizzo2 = '',
      cap = '',
      comune = '',
      nazione = '',
      email = '',
      telefono1 = '',
      consulenteVenditaId = '',
      codiceFiscale = '',
      handelsRegisterNummer = '',
      bank = '',
      iban = '',
      bic = '',
      dataDiNascita = null,
      lingua = '',
      note = ''
    } = customerData;
    const customer = {
      nome,
      cognome,
      titolo,
      ditta,
      indirizzo,
      indirizzo2,
      cap,
      comune,
      nazione,
      email,
      telefono1,
      consulenteVenditaId,
      codiceFiscale,
      handelsRegisterNummer,
      bank,
      iban,
      bic,
      dataDiNascita,
      lingua,
      note
    };

    return database
      .ref(`/clienti`)
      .push(customer)
      .then(ref => {
        dispatch(
          addCustomer({
            id: ref.key,
            ...customer
          })
        );
      });
  };
};

// REMOVE_CUSTOMER
export const removeCustomer = ({ id } = {}) => ({
  type: 'REMOVE_CUSTOMER',
  id
});

export const startRemoveCustomer = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`/clienti/${id}`)
      .remove()
      .then(() => {
        dispatch(removeCustomer({ id }));
      });
  };
};

//EDIT_CUSTOMER
export const editCustomer = (id, updates) => ({
  type: 'EDIT_CUSTOMER',
  id,
  updates
});

export const startEditCustomer = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`/clienti/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editCustomer(id, updates));
      });
  };
};

// SET_CUSTOMERS
export const setCustomers = clienti => ({
  type: 'SET_CUSTOMERS',
  clienti
});

// export const startSetCustomers
export const startSetCustomers = () => {
  return dispatch => {
    return database
      .ref(`clienti`)
      .once('value')
      .then(snapshot => {
        const clienti = [];

        snapshot.forEach(childSnapshot => {
          clienti.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setCustomers(clienti));
      });
  };
};
