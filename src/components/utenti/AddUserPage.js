import React from 'react';
import { connect } from 'react-redux';
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
            <h1>Benutzer hinzufügen</h1>
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

export default connect(undefined, mapDispatchToProps)(AddUserPage);
