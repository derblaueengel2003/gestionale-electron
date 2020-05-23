import database from '../firebase/firebase';
import moment from 'moment';

// ADD_LEAD
export const addLead = (lead) => ({
  type: 'ADD_LEAD',
  lead,
});

export const startAddLead = (leadData = {}) => {
  return (dispatch) => {
    const {
      leadCreatedAt = moment(),
      leadId = '',
      leadBudget = 0,
      leadOggettoStato = '',
      leadNote = '',
    } = leadData;
    const lead = {
      leadCreatedAt,
      leadId,
      leadBudget,
      leadOggettoStato,
      leadNote,
    };

    return database
      .ref(`/leads`)
      .push(lead)
      .then((ref) => {
        dispatch(
          addLead({
            id: ref.key,
            ...lead,
          })
        );
      });
  };
};

// REMOVE_LEAD
export const removeLead = ({ id } = {}) => ({
  type: 'REMOVE_LEAD',
  id,
});

export const startRemoveLead = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`/leads/${id}`)
      .remove()
      .then(() => {
        dispatch(removeLead({ id }));
      });
  };
};

//EDIT_LEAD
export const editLead = (id, updates) => ({
  type: 'EDIT_LEAD',
  id,
  updates,
});

export const startEditLead = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`/leads/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editLead(id, updates));
      });
  };
};

// SET_LEADS
export const setLeads = (leads) => ({
  type: 'SET_LEADS',
  leads,
});

// export const startSetLeads
export const startSetLeads = () => {
  return (dispatch) => {
    return database
      .ref(`leads`)
      .once('value')
      .then((snapshot) => {
        const leads = [];

        snapshot.forEach((childSnapshot) => {
          leads.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setLeads(leads));
      });
  };
};
