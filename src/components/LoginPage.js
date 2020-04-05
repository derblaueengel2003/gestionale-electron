import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin, t }) => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <img src='/images/logo.png'></img>
      <h2 className='box-layout__title'>{t('Gestionale')}</h2>
      <p>{t('Inserisci email e password')}</p>
      <input id='email' type='email' name='email' placeholder='email' />
      <input
        id='password'
        type='password'
        name='password'
        placeholder='password'
      />
      <button className='btn blue' onClick={startLogin}>
        Login
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(LoginPage));
