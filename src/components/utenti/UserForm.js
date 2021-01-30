import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

class UserForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.props.data.users.name || !this.props.data.users.role) {
      this.props.renderError(this.props.t('Inserisci Nome e Ruolo'));
    } else {
      this.props.renderError('');
      this.props.onSubmit({
        name: this.props.data.users.name,
        role: this.props.data.users.role,
        email: this.props.data.users.email,
        telefon: this.props.data.users.telefon,
        qualifica: this.props.data.users.qualifica,
        firebaseAuthId: this.props.data.users.firebaseAuthId,
      });
    }
  };
  render() {
    const { t, renderSelect, renderInput } = this.props;
    const roleTypeOptions = ['Admin', 'Mitarbeiter', 'Geschäftsführer'].map(
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
        {renderInput(
          'users',
          'name',
          t('Nome e cognome'),
          undefined,
          undefined,
          undefined,
          undefined,
          '*'
        )}
        {renderSelect('users', 'role', roleTypeOptions, t('Ruolo'), '*')}
        {renderInput('users', 'firebaseAuthId', 'Firebase Auth Id')}
        {renderInput('users', 'email', t('email'))}
        {renderInput('users', 'telefon', t('landline'))}
        {renderInput('users', 'qualifica', t('Qualifica'))}
      </form>
    );
  }
}

export default withTranslation()(withForm(UserForm));
