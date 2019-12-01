import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const OggettiListItem = ({
  via,
  numeroCivico,
  cap,
  citta,
  rifId,
  id,
  numeroAppartamento,
  nazione,
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
                      <Link to={`/oggettoview/${id}`}>
                        <span className='card-title'>{`${via} ${numeroCivico}, WE ${numeroAppartamento}`}</span>
                      </Link>
                      <span>{`${cap} ${citta}, ${nazione}`}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className='card-title'>Ref. ID{rifId} </span>
                </div>
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

export default connect(mapStateToProps)(OggettiListItem);
