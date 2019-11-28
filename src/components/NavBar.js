import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavBar = ({ utente }) => {
  if (utente) {
    return (
      <div className='content-container page-header__navbar'>
        <div className='hide-on-med-and-up'>
          <div id='menuToggle'>
            <input type='checkbox' />
            <span></span>
            <span></span>
            <span></span>
            <ul id='menu'>
              <Link to='/dashboard'>
                <li>Deals</li>
              </Link>
              <Link to='/leads'>
                <li>Anfragen</li>
              </Link>
              <Link to='/moduli'>
                <li>Formulare</li>
              </Link>
              <Link to='/oggetti'>
                <li>Objekte</li>
              </Link>
              <Link to='/customer'>
                <li>Kontakte</li>
              </Link>
              {utente.role === 'Admin' && (
                <Link to='/report'>
                  <li>Report</li>
                </Link>
              )}
              {utente.role === 'Admin' && (
                <Link to='/users'>
                  <li>Benutzer</li>
                </Link>
              )}
              {utente.role === 'Admin' && (
                <Link to='/fatture'>
                  <li>Rechnungen</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className='content-container show-for-desktop'>
          <Link className='btn blue waves-effect waves-light ' to='/dashboard'>
            Deals
          </Link>
          <Link className='btn blue waves-effect waves-light ' to='/leads'>
            Anfragen
          </Link>
          <Link className='btn blue waves-effect waves-light ' to='/moduli'>
            Formulare
          </Link>
          <Link className='btn blue waves-effect waves-light ' to='/oggetti'>
            Objekte
          </Link>
          <Link className='btn blue waves-effect waves-light ' to='/customer'>
            Kontakte
          </Link>
          {utente.role === 'Admin' && (
            <Link className='btn blue waves-effect waves-light ' to='/report'>
              Report
            </Link>
          )}
          {utente.role === 'Admin' && (
            <Link className='btn blue waves-effect waves-light' to='/users'>
              Benutzer
            </Link>
          )}
          {utente.role === 'Admin' && (
            <Link className='btn blue waves-effect waves-light' to='/fatture'>
              Rechnungen
            </Link>
          )}
        </div>
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
