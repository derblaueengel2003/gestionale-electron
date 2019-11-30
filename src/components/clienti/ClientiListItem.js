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
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='card-content'>
              <div className='row'>
                <div className='col s12 m10'>
                  <div className={visible ? '' : 'disabled'}>
                    <div>
                      <Link to={`/customerview/${id}`}>
                        <span className='card-title'>
                          {nome} {cognome}{' '}
                        </span>{' '}
                      </Link>
                      <p>{email}</p>
                      <p>{telefono1}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className='card-title'>{ditta} </span>
              </div>
            </div>
          </div>
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
