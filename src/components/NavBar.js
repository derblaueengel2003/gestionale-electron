import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import { ipcRenderer } from 'electron';

export const NavBar = ({ utente, t, activeClass }) => {
  if (utente) {
    let menuItems = [
      { pathLink: 'dashboard', label: t('Vendite') },
      { pathLink: 'leads', label: t('Richieste') },
      { pathLink: 'moduli', label: t('Moduli') },
      { pathLink: 'oggetti', label: t('Oggetti') },
      { pathLink: 'customer', label: t('Contatti') },
      { pathLink: 'evaluation', label: t('evaluations') },
    ];
    if (utente.role === 'Admin') {
      menuItems = [
        ...menuItems,
        // { pathLink: 'report', label: 'Report' },
        { pathLink: 'users', label: t('Utenti') },
        { pathLink: 'fatture', label: t('Fatture') },
      ];
    }
    return (
      <nav className='nav-wraper blue'>
        <div className='container'>
          <Sidebar />
          <ul className='hide-on-med-and-down'>
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
    ipcRenderer.send('window:reload');
    // setTimeout(location.reload(), 500);
    return <div>reloading</div>;
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
