import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true,
    };

    M.Sidenav.init(this.Sidenav);

    let instance = M.Sidenav.getInstance(this.Sidenav);
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <ul
          ref={(Sidenav) => {
            this.Sidenav = Sidenav;
          }}
          id='slide-out'
          className='sidenav'
        >
          <li>
            <Link className='sidenav-close' to='/deals'>
              {t('Vendite')}
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/leads'>
              {t('Richieste')}
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/moduli'>
              {t('Moduli')}
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/oggetti'>
              {t('Oggetti')}
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/clienti'>
              {t('Contatti')}
            </Link>
          </li>
          <li>
            <Link className='sidenav-close' to='/evaluations'>
              {t('evaluations')}
            </Link>
          </li>

          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/newsletters'>
                {t('newsletters')}
              </Link>
            </li>
          )}
          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/utenti'>
                {t('Utenti')}
              </Link>
            </li>
          )}
          {this.props.utente.role === 'Admin' && (
            <li>
              <Link className='sidenav-close' to='/fatture'>
                {t('Fatture')}
              </Link>
            </li>
          )}
          <li>
            <a className='sidenav-close' href='#!'>
              <i className='material-icons'>clear</i>
            </a>
          </li>
        </ul>

        <a href='#!' data-target='slide-out' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    utente: state.utenti.find(
      (utente) => utente.firebaseAuthId === state.auth.uid
    ),
  };
};
export default connect(mapStateToProps)(withTranslation()(Sidebar));
