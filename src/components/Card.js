import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// installare uuid

export const Card = ({
  titolo,
  titoloDestra,
  sottotitolo,
  corpo,
  lineaNote,
  progressBar,
  visible,
  link,
  utente,
  verkauft,
}) => {
  if (visible || utente.role === 'Admin') {
    return (
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='card-content'>
              <div className='row'>
                <div className='col s12 m8'>
                  <div className={visible ? '' : 'disabled'}>
                    <div>
                      <Link to={link}>
                        <span className='card-title'>{titolo}</span>
                      </Link>
                      <h6>{sottotitolo}</h6>
                      {corpo.map((linea) => (
                        <div key={uuidv4()}>{linea}</div>
                      ))}
                      <div>{lineaNote}</div>
                      {progressBar}
                      {verkauft}
                    </div>
                  </div>
                </div>
                <div>
                  <span className='right'>{titoloDestra} </span>
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

const mapStateToProps = (state) => {
  return {
    utente: state.utenti.find(
      (utente) => utente.firebaseAuthId === state.auth.uid
    ),
  };
};

export default connect(mapStateToProps)(Card);
