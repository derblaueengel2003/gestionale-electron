//Firma Reducer

const firmaReducerDefaultState = [];

export default (state = firmaReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_FIRMA':
      return [...state, action.firma];
    case 'REMOVE_FIRMA':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_FIRMA':
      return state.map(firma => {
        if (firma.id === action.id) {
          return {
            ...firma,
            ...action.updates
          };
        } else {
          return firma;
        }
      });
    case 'SET_FIRMA':
      return action.firma;
    default:
      return state;
  }
};
