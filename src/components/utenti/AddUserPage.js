import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import UserForm from './UserForm';
import { startAddUser } from '../../actions/utenti';

export class AddUserPage extends React.Component {
  onSubmit = user => {
    this.props.startAddUser(user);
    this.props.history.push('/users');
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Aggiungi utente')}</h1>
          </div>
        </div>
        <div className='container'>
          <UserForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddUser: user => dispatch(startAddUser(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(withTranslation()(AddUserPage));
