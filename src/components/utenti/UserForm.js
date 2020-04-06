import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

class UserForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    if (!this.props.data.nameUser || !this.props.data.role) {
      this.setState(() => ({ error: this.props.t('Inserisci Nome e Ruolo') }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.props.data.nameUser,
        role: this.props.data.role,
        email: this.props.data.emailUser,
        telefon: this.props.data.telefonUser,
        qualifica: this.props.data.qualifica,
        firebaseAuthId: this.props.data.firebaseAuthId
      });
    }
  };
  render() {
    const { t, renderSelect, renderInput } = this.props;
    const roleTypeOptions = ['Admin', 'Mitarbeiter', 'Teamleiter'].map(
      roleType => ({
        value: roleType,
        label: roleType
      })
    );
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderInput('nameUser', t('Nome e cognome'))}
        {renderSelect('role', roleTypeOptions, t('Ruolo'))}
        {renderInput('firebaseAuthId', 'Firebase Auth Id')}
        {renderInput('emailUser', t('Email'))}
        {renderInput('telefonUser', t('Telefono'))}
        {renderInput('qualifica', t('Qualifica'))}
      </form>
    );
  }
}

export default withTranslation()(withForm(UserForm));
