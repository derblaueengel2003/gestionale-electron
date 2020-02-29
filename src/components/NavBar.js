import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translation } from 'react-i18next';
import Sidebar from './Sidebar';

export const NavBar = ({ utente }) => {
  return (
    <Translation>
      {t => {
        if (utente) {
          return (
            <nav className='nav-wraper blue'>
              <div className='container'>
                <Sidebar />
                <ul className='hide-on-med-and-down'>
                  <li>
                    {' '}
                    <Link to='/dashboard'>{t('Vendite')}</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/leads'>{t('Richieste')}</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/moduli'>{t('Moduli')}</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/oggetti'>{t('Oggetti')}</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/customer'>{t('Contatti')}</Link>
                  </li>
                  {utente.role === 'Admin' && (
                    <li>
                      <Link to='/report'>Report</Link>
                    </li>
                  )}
                  {utente.role === 'Admin' && (
                    <li>
                      <Link to='/users'>{t('Utenti')}</Link>
                    </li>
                  )}
                  {utente.role === 'Admin' && (
                    <li>
                      <Link to='/fatture'>{t('Fatture')}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          );
        } else {
          setTimeout(location.reload(), 500);
        }
      }}
    </Translation>
  );
};
const mapStateToProps = state => {
  return {
    utente: state.utenti.find(
      utente => utente.firebaseAuthId === state.auth.uid
    )
  };
};

export default connect(mapStateToProps)(NavBar);
