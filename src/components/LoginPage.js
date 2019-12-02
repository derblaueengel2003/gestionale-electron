import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <img src='/images/logo.png'></img>
      <h2 className='box-layout__title'>Verwaltung</h2>
      <p>Bitte geben Sie Ihre E-Mail und Passwort ein</p>
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
)(LoginPage);
