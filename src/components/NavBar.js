import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export const NavBar = ({ utente }) => {
  if (utente) {
    return (
      <nav className='nav-wraper blue'>
        <div className='container'>
          <Sidebar />
          <ul className='hide-on-med-and-down'>
            <li>
              {' '}
              <Link to='/dashboard'>Deals</Link>
            </li>
            <li>
              {' '}
              <Link to='/leads'>Anfragen</Link>
            </li>
            <li>
              {' '}
              <Link to='/moduli'>Formulare</Link>
            </li>
            <li>
              {' '}
              <Link to='/oggetti'>Objekte</Link>
            </li>
            <li>
              {' '}
              <Link to='/customer'>Kontakte</Link>
            </li>
            {utente.role === 'Admin' && (
              <li>
                <Link to='/report'>Report</Link>
              </li>
            )}
            {utente.role === 'Admin' && (
              <li>
                <Link to='/users'>Benutzer</Link>
              </li>
            )}
            {utente.role === 'Admin' && (
              <li>
                <Link to='/fatture'>Rechnungen</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  } else {
    <div>Niente</div>;
    // setTimeout(location.reload(), 500);
  }
};
const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(NavBar);
