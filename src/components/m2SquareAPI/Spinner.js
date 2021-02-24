import React from 'react';
import { connect } from 'react-redux';
import { storeActions } from '../../store/configureStore';

const Spinner = ({ loading, oggettoId }) => {
  if (loading) {
    startEditOggetto(oggettoId, { spinner: true });
  } else {
    startEditOggetto(oggettoId, { ...result, spinner: false });
  }

  return <div></div>;
};

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) =>
    dispatch(
      storeActions
        .find((action) => action.label === 'oggetti')
        .startEditAction(id, oggetto)
    ),
});

export default connect(undefined, mapDispatchToProps)(Spinner);
