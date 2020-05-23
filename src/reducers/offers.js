const offersReducerDefaultState = [];

export default (state = offersReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_OFFER':
      return [...state, action.offer];
    case 'REMOVE_OFFER':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_OFFER':
      return state.map((offer) => {
        if (offer.id === action.id) {
          return {
            ...offer,
            ...action.updates,
          };
        } else {
          return offer;
        }
      });
    case 'SET_OFFERS':
      return action.offers;
    default:
      return state;
  }
};
