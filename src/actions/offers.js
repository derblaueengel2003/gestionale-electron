import database from '../firebase/firebase';
import moment from 'moment';

// ADD_OFFER
export const addOffer = (offer) => ({
  type: 'ADD_OFFER',
  offer,
});

export const startAddOffer = (offerData = {}) => {
  return (dispatch) => {
    const {
      offerCreatedAt = moment(),
      oggettoId = '',
      leadId = '',
      offertoTramite = '',
      consulenteId = '',
      feedback = '',
      offerNote = '',
    } = offerData;
    const offer = {
      offerCreatedAt,
      oggettoId,
      leadId,
      offertoTramite,
      consulenteId,
      feedback,
      offerNote,
    };

    return database
      .ref(`/offers`)
      .push(offer)
      .then((ref) => {
        dispatch(
          addOffer({
            id: ref.key,
            ...offer,
          })
        );
      });
  };
};

// REMOVE_OFFER
export const removeOffer = ({ id } = {}) => ({
  type: 'REMOVE_OFFER',
  id,
});

export const startRemoveOffer = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`/offers/${id}`)
      .remove()
      .then(() => {
        dispatch(removeOffer({ id }));
      });
  };
};

//EDIT_OFFER
export const editOffer = (id, updates) => ({
  type: 'EDIT_OFFER',
  id,
  updates,
});

export const startEditOffer = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`/offers/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editOffer(id, updates));
      });
  };
};

// SET_OFFERS
export const setOffers = (offers) => ({
  type: 'SET_OFFERS',
  offers,
});

// export const startSetOffers
export const startSetOffers = () => {
  return (dispatch) => {
    return database
      .ref(`offers`)
      .once('value')
      .then((snapshot) => {
        const offers = [];

        snapshot.forEach((childSnapshot) => {
          offers.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setOffers(offers));
      });
  };
};
