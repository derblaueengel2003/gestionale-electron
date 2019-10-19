import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UtentiListItem from './UtentiListItem';

export const UtentiList = props => (
  <div className='content-container'>
    <div className='page-header__actions'>
      <Link
        className='button button-add button--secondary-utenti'
        to='/usercreate'
      >
        +
      </Link>
    </div>
    <div className='list-header'>
      <div className='show-for-mobile'>Benutzer</div>
      <div className='show-for-desktop'>Benutzer</div>
      <div className='show-for-desktop'>Rolle</div>
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
