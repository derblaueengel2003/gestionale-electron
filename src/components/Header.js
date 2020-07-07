import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

export const Header = ({ startLogout, i18n, history }) => {
  const setLingua = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <header className='header'>
      <div className='container'>
        <div className='row'>
          <div className='col m4 hide-on-small-only'>
            <button
              className='btn-floating blue'
              onClick={() => history.goBack()}
            >
              <i className='material-icons'>navigate_before</i>
            </button>
          </div>
          <div className='col s12 m4 center-align'>
            <Link className='header__title' to='/deals'>
              <img
                className='logo'
                src='https://www.m2square.eu/wp-content/uploads/2017/11/Logo.png'
              ></img>{' '}
            </Link>
          </div>
          <div className='col m4 hide-on-small-only right-align'>
            <button
              className='btn-flat'
              onClick={() => {
                setLingua('it');
              }}
            >
              IT
            </button>
            <button
              className='btn-flat'
              onClick={() => {
                setLingua('de');
              }}
            >
              DE
            </button>
            <button className='btn-flat' onClick={startLogout}>
              <i className='material-icons'>exit_to_app</i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(withRouter(Header)));
