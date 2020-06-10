import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startEditOggetto } from '../../actions/oggetti';

const ImmoscoutAPI = ({ oggetto, startEditOggetto }) => {
  //Per inviare i dati dell'immobile
  const is24api = () => {
    axios
      // .post('http://localhost:5000/property', oggetto)
      .post('https://is24api.herokuapp.com/property', oggetto)
      .then(function (response) {
        // console.log(response.data['common.messages']);
        startEditOggetto(oggetto.id, {
          ...oggetto,
          is24id: response.data['common.messages'][0].message.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const btnColor = oggetto.is24id ? 'disabled' : 'green';
  return (
    <button className={`btn ${btnColor}`} onClick={is24api}>
      Export to immobilienscout24
    </button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startEditOggetto: (id, oggetto) => dispatch(startEditOggetto(id, oggetto)),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(ImmoscoutAPI));
