import React from 'react';

const Intestazione = ({ intestazione }) => {
  return (
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>{intestazione}</h1>
      </div>
    </div>
  );
};
export default Intestazione;
