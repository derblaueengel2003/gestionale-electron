import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import Select from 'react-virtualized-select';
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
    const { t } = this.props;
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
        {t('Nome e cognome')}:
        <input
          className={`text-input`}
          name='nameUser'
          type='text'
          value={this.props.data.nameUser}
          onChange={this.props.changeHandler}
        />
        {t('Ruolo')}:
        <Select
          name={'role'}
          value={this.props.data.role}
          options={roleTypeOptions}
          onChange={e => this.props.changeHandlerSelect('role', e && e.value)}
        />
        Firebase Auth Id:
        <input
          className={`text-input`}
          name='firebaseAuthId'
          type='text'
          placeholder='firebase user id'
          value={this.props.data.firebaseAuthId}
          onChange={this.props.changeHandler}
        />
        {t('Email')}:
        <input
          className={`text-input`}
          name='emailUser'
          type='text'
          value={this.props.data.emailUser}
          onChange={this.props.changeHandler}
        />
        {t('Telefono')}:
        <input
          className={`text-input`}
          name='telefonUser'
          type='text'
          value={this.props.data.telefonUser}
          onChange={this.props.changeHandler}
        />
        {t('Qualifica')}:
        <input
          className={`text-input`}
          name='qualifica'
          type='text'
          value={this.props.data.qualifica}
          onChange={this.props.changeHandler}
        />
      </form>
    );
  }
}

export default withTranslation()(withForm(UserForm));
