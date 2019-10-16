import database from '../firebase/firebase';

// ADD_FIRMA
export const addFirma = firma => ({
  type: 'ADD_FIRMA',
  firma
});

export const startAddFirma = (firmaData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      adresse = '',
      plz = '',
      stadt = '',
      staat = '',
      telefon = '',
      fax = '',
      email = '',
      website = '',
      motto = ''
    } = firmaData;
    const firma = {
      name,
      adresse,
      plz,
      stadt,
      staat,
      telefon,
      fax,
      email,
      website,
      motto
    };

    return database
      .ref(`/firma`)
      .push(firma)
      .then(ref => {
        dispatch(
          addFirma({
            id: ref.key,
            ...firma
          })
        );
      });
  };
};

// REMOVE_FIRMA
export const removeFirma = ({ id } = {}) => ({
  type: 'REMOVE_FIRMA',
  id
});

export const startRemoveFirma = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`/firma/${id}`)
      .remove()
      .then(() => {
        dispatch(removeFirma({ id }));
      });
  };
};

//EDIT_FIRMA
export const editFirma = (id, updates) => ({
  type: 'EDIT_FIRMA',
  id,
  updates
});

export const startEditFirma = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`/firma/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editFirma(id, updates));
      });
  };
};

// SET_FIRMAS
export const setFirma = firma => ({
  type: 'SET_FIRMA',
  firma
});

// export const startSetDeals
export const startSetFirma = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`firma`)
      .once('value')
      .then(snapshot => {
        const firma = [];

        snapshot.forEach(childSnapshot => {
          firma.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setFirma(firma));
      });
  };
};
