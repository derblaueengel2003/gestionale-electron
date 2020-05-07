import database from '../firebase/firebase';

// ADD_DEAL
export const addDeal = (deal) => ({
  type: 'ADD_DEAL',
  deal,
});

export const startAddDeal = (dealData = {}) => {
  return (dispatch) => {
    const {
      oggettoId = '',
      prezzoDiVendita = 0,
      amount = 0,
      provvM2square = 0,
      provvStefano = 0,
      agenziaPartnerId = '',
      provvAgenziaPartner = 0,
      payedAgenziaPartner = false,
      createdAt = null,
      payedStefano = false,
      payedAtStefano = null,
      note = '',
      venditoreId = '',
      venditoreId2 = '',
      acquirenteId = '',
      acquirenteId2 = '',
      notaioId = '',
      consulenteVendita = '',
      dealType = '',
      belastungsVollmacht = false,
      linguaRogito = '',
      dataRogito = null,
      dataConsegna = null,
      todo1 = false,
      todo2 = false,
      todo3 = false,
      todo4 = false,
      todo5 = false,
      todo6 = false,
      todo7 = false,
      todo8 = false,
      todo9 = false,
      todo10 = false,
      todo11 = false,
    } = dealData;
    const deal = {
      oggettoId,
      prezzoDiVendita,
      amount,
      provvM2square,
      provvStefano,
      payedAtStefano,
      payedStefano,
      agenziaPartnerId,
      provvAgenziaPartner,
      payedAgenziaPartner,
      createdAt,
      note,
      venditoreId,
      venditoreId2,
      acquirenteId,
      acquirenteId2,
      notaioId,
      consulenteVendita,
      dealType,
      belastungsVollmacht,
      linguaRogito,
      dataRogito,
      dataConsegna,
      todo1,
      todo2,
      todo3,
      todo4,
      todo5,
      todo6,
      todo7,
      todo8,
      todo9,
      todo10,
      todo11,
    };

    return database
      .ref(`deals`)
      .push(deal)
      .then((ref) => {
        dispatch(
          addDeal({
            id: ref.key,
            ...deal,
          })
        );
      });
  };
};

// REMOVE_DEAL
export const removeDeal = ({ id } = {}) => ({
  type: 'REMOVE_DEAL',
  id,
});

export const startRemoveDeal = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`deals/${id}`)
      .remove()
      .then(() => {
        dispatch(removeDeal({ id }));
      });
  };
};

//EDIT_DEAL
export const editDeal = (id, updates) => ({
  type: 'EDIT_DEAL',
  id,
  updates,
});

export const startEditDeal = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`deals/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editDeal(id, updates));
      });
  };
};

// SET_DEALS
export const setDeals = (deals) => ({
  type: 'SET_DEALS',
  deals,
});

export const startSetDeals = () => {
  return (dispatch) => {
    return database
      .ref(`deals`)
      .once('value')
      .then((snapshot) => {
        const deals = [];

        snapshot.forEach((childSnapshot) => {
          deals.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setDeals(deals));
      });
  };
};
