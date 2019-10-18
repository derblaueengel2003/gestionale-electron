import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

export const ClientiListItem = ({
  nome,
  cognome,
  ditta,
  email,
  telefono1,
  id,
  visible,
  utente
}) => {
  if (visible || utente.role === 'Admin') {
    return (
      <div className={visible ? 'list-item' : 'list-item disabled'}>
        <div>
          <Link to={`/customerview/${id}`}>
            <h3 className='list-item__title'>
              {nome} {cognome}{' '}
            </h3>{' '}
          </Link>
          <h4 className='list-item__sub-title'>{email}</h4>
          <h4 className='list-item__sub-title'>{telefono1}</h4>
        </div>
        <div>
          <h3 className='list-item__title'>{ditta} </h3>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(ClientiListItem);
