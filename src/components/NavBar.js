import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import { ipcRenderer } from 'electron';

export const NavBar = ({ utente, t, activeClass }) => {
  if (utente) {
    let menuItems = [
      { pathLink: 'deals', label: t('Vendite') },
      { pathLink: 'leads', label: t('Richieste') },
      { pathLink: 'moduli', label: t('Moduli') },
      { pathLink: 'oggetti', label: t('Oggetti') },
      { pathLink: 'clienti', label: t('Contatti') },
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
      <nav className='nav-wrapper blue'>
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
