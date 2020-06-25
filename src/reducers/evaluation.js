// Evaluations Reducer

const evaluationsReducerDefaultState = [];

export default (state = evaluationsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EVALUATION':
      return [...state, action.evaluation];
    case 'REMOVE_EVALUATION':
      return state.filter(({ id }) => id !== action.id);
    case 'SET_EVALUATIONS':
      return action.evaluations;
    default:
      return state;
  }
};
