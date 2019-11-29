import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavBar = ({ utente }) => {
  if (utente) {
    return (
      <div>
        <nav className='nav-wraper blue'>
          <div className='container'>
            <a href='#' className='sidenav-trigger' data-target='mobile-links'>
              <i className='material-icons'>menu</i>
            </a>
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

        <ul className='sidenav' id='mobile-links'>
          <li>
            <Link to='/dashboard'>Deals</Link>
          </li>
          <li>
            <Link to='/leads'>Anfragen</Link>
          </li>
          <li>
            <Link to='/moduli'>Formulare</Link>
          </li>
          <li>
            <Link to='/oggetti'>Objekte</Link>
          </li>
          <li>
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
    );
  } else {
    setTimeout(location.reload(), 500);
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
