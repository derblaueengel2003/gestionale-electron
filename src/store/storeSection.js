import database from '../firebase/firebase';

export default class storeSection {
  constructor(label) {
    this.label = label;
  }

  // ADD ACTION
  addAction = (fields) => ({
    type: `ADD_${this.label.toUpperCase()}`,
    fields,
  });

  startAddAction = (fields) => {
    return (dispatch) => {
      return database
        .ref(`/${this.label}`)
        .push(fields)
        .then((ref) => {
          dispatch(
            this.addAction({
              id: ref.key,
              ...fields,
            })
          );
        });
    };
  };

  // REMOVE ACTION
  removeAction = ({ id } = {}) => ({
    type: `REMOVE_${this.label.toUpperCase()}`,
    id,
  });

  startRemoveAction = ({ id } = {}) => {
    return (dispatch) => {
      return database
        .ref(`/${this.label}/${id}`)
        .remove()
        .then(() => {
          dispatch(this.removeAction({ id }));
        });
    };
  };

  // EDIT ACTION
  editAction = (id, updates) => ({
    type: `EDIT_${this.label.toUpperCase()}`,
    id,
    updates,
  });

  startEditAction = (id, updates) => {
    return (dispatch) => {
      return database
        .ref(`/${this.label}/${id}`)
        .update(updates)
        .then(() => {
          dispatch(this.editAction(id, updates));
        });
    };
  };

  // SET ACTION
  setAction = (fields) => ({
    type: `SET_${this.label.toUpperCase()}`,
    fields,
  });

  startSetAction = () => {
    return (dispatch) => {
      return database
        .ref(`${this.label}`)
        .once('value')
        .then((snapshot) => {
          const fields = [];
          snapshot.forEach((childSnapshot) => {
            fields.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          dispatch(this.setAction(fields));
        });
    };
  };

  //REDUCER////////////////////////////////
  actionReducer = (state = [], action) => {
    switch (action.type) {
      case `ADD_${this.label.toUpperCase()}`:
        return [...state, action.fields];
      case `REMOVE_${this.label.toUpperCase()}`:
        return state.filter(({ id }) => id !== action.id);
      case `EDIT_${this.label.toUpperCase()}`:
        return state.map((storeItem) => {
          if (storeItem.id === action.id) {
            return {
              ...storeItem,
              ...action.updates,
            };
          } else {
            return storeItem;
          }
        });
      case `SET_${this.label.toUpperCase()}`:
        return action.fields;
      default:
        return state;
    }
  };

  // GETTER
  getActions = () => {
    const name = this.label[0].toUpperCase() + this.label.slice(1);
    return {
      label: this.label,
      startAddAction: this.startAddAction,
      startSetAction: this.startSetAction,
      startRemoveAction: this.startRemoveAction,
      startEditAction: this.startEditAction,
    };
  };
}
