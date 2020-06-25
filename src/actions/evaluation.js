import database from '../firebase/firebase';

// ADD_EVALUATION
export const addEvaluation = (evaluation) => ({
  type: 'ADD_EVALUATION',
  evaluation,
});

export const startAddEvaluation = (evaluationData = {}) => {
  return (dispatch) => {
    const {
      wohnlage = '',
      bodenRichtwert = '',
      bodenRichtwert2 = '',
      bodenRichtwert3 = '',
      dataEvaluation = null,
      mietspiegel = '',
      mietendeckel = '',
      immobilienpreisMin = '',
      immobilienpreisMax = '',
      immobilienpreisAverage = '',
      is24Evaluation = '',
      rendite = '',
    } = evaluationData;
    const evaluation = {
      wohnlage,
      bodenRichtwert,
      bodenRichtwert2,
      bodenRichtwert3,
      dataEvaluation,
      mietspiegel,
      mietendeckel,
      immobilienpreisMin,
      immobilienpreisMax,
      immobilienpreisAverage,
      is24Evaluation,
      rendite,
    };

    return database
      .ref(`evaluations`)
      .push(evaluation)
      .then((ref) => {
        dispatch(
          addEvaluation({
            id: ref.key,
            ...evaluation,
          })
        );
      });
  };
};

// REMOVE_EVALUATION
export const removeEvaluation = ({ id } = {}) => ({
  type: 'REMOVE_EVALUATION',
  id,
});

export const startRemoveEvaluation = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`evaluations/${id}`)
      .remove()
      .then(() => {
        dispatch(removeEvaluation({ id }));
      });
  };
};

//EDIT_EVALUATION
// export const editEvaluation = (id, updates) => ({
//   type: 'EDIT_EVALUATION',
//   id,
//   updates,
// });

// export const startEditEvaluation = (id, updates) => {
//   return (dispatch) => {
//     return database
//       .ref(`evaluations/${id}`)
//       .update(updates)
//       .then(() => {
//         dispatch(editEvaluation(id, updates));
//       });
//   };
// };

// SET_EVALUATIONS
export const setEvaluations = (evaluations) => ({
  type: 'SET_EVALUATIONS',
  evaluations,
});

// export const startSetEvaluations
export const startSetEvaluations = () => {
  return (dispatch) => {
    return database
      .ref(`evaluations`)
      .once('value')
      .then((snapshot) => {
        const evaluations = [];

        snapshot.forEach((childSnapshot) => {
          evaluations.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setEvaluations(evaluations));
      });
  };
};
