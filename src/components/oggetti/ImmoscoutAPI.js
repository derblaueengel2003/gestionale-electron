import React from 'react';
import axios from 'axios';

const ImmoscoutAPI = ({ oggetto }) => {
  //Per inviare i dati dell'immobile
  const is24api = () => {
    axios
      .post('http://localhost:5000/property', oggetto)
      // .post('https://is24api.herokuapp.com/property', oggetto)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <button className='btn red' onClick={is24api}>
      Export to immobilienscout24
    </button>
  );
};

export default ImmoscoutAPI;
