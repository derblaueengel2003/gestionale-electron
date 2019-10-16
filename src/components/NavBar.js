import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavBar = ({ uid }) => {
  return (
    <div className='content-container page-header__navbar'>
      <div className='show-for-mobile'>
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
            {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
              <Link to='/report'>
                <li>Report</li>
              </Link>
            )}
            {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
              <Link to='/users'>
                <li>Benutzer</li>
              </Link>
            )}
            {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
              <Link to='/fatture'>
                <li>Rechnungen</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
      <div className='content-container show-for-desktop'>
        <Link
          className='button page-header__button page-header__button-deals'
          to='/dashboard'
        >
          Deals
        </Link>
        <Link
          className='button page-header__button page-header__button-leads'
          to='/leads'
        >
          Anfragen
        </Link>
        <Link
          className='button page-header__button page-header__button-modulistica'
          to='/moduli'
        >
          Formulare
        </Link>
        <Link
          className='button page-header__button page-header__button-oggetti'
          to='/oggetti'
        >
          Objekte
        </Link>
        <Link
          className='button page-header__button page-header__button-clienti'
          to='/customer'
        >
          Kontakte
        </Link>
        {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
          <Link
            className='button page-header__button page-header__button-clienti'
            to='/report'
          >
            Report
          </Link>
        )}
        {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
          <Link
            className='button page-header__button page-header__button-clienti'
            to='/users'
          >
            Benutzer
          </Link>
        )}
        {uid === 'XVyqKNyFoDSa7yKV6KZmwRwLGK03' && (
          <Link
            className='button page-header__button page-header__button-fatture'
            to='/fatture'
          >
            Rechnungen
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};
export default connect(mapStateToProps)(NavBar);
