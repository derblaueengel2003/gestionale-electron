import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

class UserForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.props.data.name || !this.props.data.role) {
      this.setState(() => ({ error: this.props.t('Inserisci Nome e Ruolo') }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.props.data.name,
        role: this.props.data.role,
        email: this.props.data.email,
        telefon: this.props.data.telefon,
        qualifica: this.props.data.qualifica,
        firebaseAuthId: this.props.data.firebaseAuthId,
      });
    }
  };
  render() {
    const { t, renderSelect, renderInput } = this.props;
    const roleTypeOptions = ['Admin', 'Mitarbeiter', 'Teamleiter'].map(
      (roleType) => ({
        value: roleType,
        label: roleType,
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
        {renderInput('name', t('Nome e cognome'))}
        {renderSelect('role', roleTypeOptions, t('Ruolo'))}
        {renderInput('firebaseAuthId', 'Firebase Auth Id')}
        {renderInput('email', t('Email'))}
        {renderInput('telefon', t('Telefono'))}
        {renderInput('qualifica', t('Qualifica'))}
      </form>
    );
  }
}

export default withTranslation()(withForm(UserForm));
