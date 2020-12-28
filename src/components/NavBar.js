import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Sidebar from './Sidebar';

export const NavBar = ({ utente, t, activeClass }) => {
  if (utente) {
    let menuItems = [
      { pathLink: 'deals', label: t('Vendite') },
      { pathLink: 'leads', label: t('Richieste') },
      { pathLink: 'moduli', label: t('Moduli') },
      { pathLink: 'oggetti', label: t('Oggetti') },
      { pathLink: 'clienti', label: t('Contatti') },
      { pathLink: 'newsletters', label: t('Newsletters') },
      { pathLink: 'evaluations', label: t('evaluations') },
    ];
    if (utente && utente.role === 'Admin') {
      menuItems = [
        ...menuItems,
        // { pathLink: 'report', label: 'Report' },
        { pathLink: 'utenti', label: t('Utenti') },
        { pathLink: 'fatture', label: t('Fatture') },
      ];
    }
    return (
      <nav className='new-wrapper blue'>
        <div>
          <span className='brand-logo btn-floating-margin'>
            {t('nav_title')}
          </span>
          <Sidebar />
          <ul className='right hide-on-med-and-down'>
            {menuItems.map((item) => (
              <li
                key={item.pathLink}
                className={activeClass === item.pathLink ? 'active' : ''}
              >
                <Link to={`/${item.pathLink}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  } else {
    // setTimeout(location.reload(), 1000);
    return <div>Loading...</div>;
  }
};
const mapStateToProps = (state) => {
  return {
    utente: state.utenti.find(
      (utente) => utente.firebaseAuthId === state.auth.uid
    ),
  };
};

export default connect(mapStateToProps)(withTranslation()(NavBar));
