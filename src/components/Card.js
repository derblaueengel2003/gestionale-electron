import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Card = ({
  titolo,
  titoloDestra,
  sottotitolo,
  linea1,
  linea2,
  linea3,
  linea4,
  linea5,
  lineaMehr,
  visible,
  link,
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
                      <Link to={link}>
                        <span className='card-title'>{titolo}</span>
                      </Link>
                      <span>{sottotitolo}</span>
                      <p>{linea1}</p>
                      <p>{linea2}</p>
                      <p>{linea3}</p>
                      <p>{linea4}</p>
                      <p>{linea5}</p>
                      <p>{lineaMehr}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <span>{titoloDestra} </span>
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

export default connect(mapStateToProps)(Card);
