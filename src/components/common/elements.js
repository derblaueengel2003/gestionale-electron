import React from 'react';
import { Link } from 'react-router-dom';

export const addButton = (destinazione) => {
  return (
    <div className='fixed-action-btn'>
      <Link className='btn-floating green btn-large' to={destinazione}>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
};
