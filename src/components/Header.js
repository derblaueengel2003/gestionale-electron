import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Translation } from 'react-i18next';

export const Header = ({ startLogout }) => {
  return (
    <Translation>
      {(t, { i18n }) => {
        const setLingua = lang => {
          i18n.changeLanguage(lang);
        };
        return (
          <header className='header'>
            <div className='container'>
              <div className='header__content'>
                <Link className='header__title' to='/dashboard'>
                  <img src='/images/logo.png'></img>
                </Link>
                <div className='language'>
                  <button className=' btn-flat' onClick={startLogout}>
                    {t('Disconnetti')}
                  </button>

                  <button
                    onClick={() => {
                      setLingua('it');
                    }}
                  >
                    IT
                  </button>
                  <button
                    onClick={() => {
                      setLingua('de');
                    }}
                  >
                    DE
                  </button>
                  {/* 
                  
                    <button
                      onClick={() => {
                        setLingua("en");
                      }}
                    >
                      EN
                    </button>
                  */}
                </div>
              </div>
            </div>
          </header>
        );
      }}
    </Translation>
  );
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
