import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UtentiListItem from './UtentiListItem';

export const UtentiList = props => (
  <div className='container'>
    <div className='page-header__actions'></div>
    <div className='list-header'>
      <div>Benutzer</div>
      <div>
        {' '}
        <Link className='btn-floating green' to='/usercreate'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </div>
    <div className='list-body'>
      {props.utenti.length === 0 ? (
        <div className='list-item list-item--message'>
          <span>Kein Ergebnis anhand der angegebenen Filtern</span>
        </div>
      ) : (
        props.utenti.map(utente => {
          return <UtentiListItem key={utente.id} {...utente} />;
        })
      )}
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
