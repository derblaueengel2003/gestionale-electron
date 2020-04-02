import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { startLogin } from '../actions/auth';

export class LoginPage extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label('E-Mail'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = () => {
    this.props.startLogin();
  };

  render() {
    const { t } = this.props;
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <img src='/images/logo.png'></img>
          <h2 className='box-layout__title'>{t('Gestionale')}</h2>
          <p>{t('Inserisci email e password')}</p>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('email', 'Email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(LoginPage));
