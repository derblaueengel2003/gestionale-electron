import database from '../firebase/firebase';

// ADD_FATTURA
export const addFattura = (fattura) => ({
  type: 'ADD_FATTURA',
  fattura,
});

export const startAddFattura = (fatturaData = {}) => {
  return (dispatch) => {
    const {
      dealId = '',
      clienteId = '',
      clienteId2 = '',
      numeroFattura = '',
      dataFattura = null,
      payed = false,
      payedAt = '',
      descrizioneProdotto = '',
      importoNetto = 0,
      iva = 19,
      dataPrestazione = null,
    } = fatturaData;
    const fattura = {
      dealId,
      clienteId,
      clienteId2,
      numeroFattura,
      dataFattura,
      payed,
      payedAt,
      descrizioneProdotto,
      importoNetto,
      iva,
      dataPrestazione,
    };

    return database
      .ref(`fatture`)
      .push(fattura)
      .then((ref) => {
        dispatch(
          addFattura({
            id: ref.key,
            ...fattura,
          })
        );
      });
  };
};

// REMOVE_FATTURA
export const removeFattura = ({ id } = {}) => ({
  type: 'REMOVE_FATTURA',
  id,
});

export const startRemoveFattura = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`fatture/${id}`)
      .remove()
      .then(() => {
        dispatch(removeFattura({ id }));
      });
  };
};

//EDIT_FATTURA
export const editFattura = (id, updates) => ({
  type: 'EDIT_FATTURA',
  id,
  updates,
});

export const startEditFattura = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`fatture/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editFattura(id, updates));
      });
  };
};

// SET_FATTURE
export const setFatture = (fatture) => ({
  type: 'SET_FATTURE',
  fatture,
});

// export const startSetFatture
export const startSetFatture = () => {
  return (dispatch) => {
    return database
      .ref(`fatture`)
      .once('value')
      .then((snapshot) => {
        const fatture = [];

        snapshot.forEach((childSnapshot) => {
          fatture.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setFatture(fatture));
      });
  };
};
