import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UtentiListItem from './UtentiListItem';

export const UtentiList = props => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Benutzer</h1>
      </div>
    </div>
    <div className='container'>
      <Link className='btn-floating green right' to='/usercreate'>
        <i className='material-icons'>add</i>
      </Link>
      <div>
        {props.utenti.length === 0 ? (
          <div>
            <span>Kein Ergebnis anhand der angegebenen Filtern</span>
          </div>
        ) : (
          props.utenti.map(utente => {
            return <UtentiListItem key={utente.id} {...utente} />;
          })
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    utenti: state.utenti,
    firma: state.firma
  };
};

export default connect(mapStateToProps)(UtentiList);
