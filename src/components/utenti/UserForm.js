import React from 'react';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user ? props.user.name : '',
      role: props.user ? props.user.role : '',
      firebaseAuthId: props.user ? props.user.firebaseAuthId : null
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onRoleChange = e => {
    const role = e.value;
    this.setState(() => ({ role }));
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.role) {
      this.setState(() => ({ error: 'Name und Rolle eingeben.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name,
        role: this.state.role,
        firebaseAuthId: this.state.firebaseAuthId
      });
    }
  };
  render() {
    const roleTypeOptions = ['Admin', 'Mitarbeiter', 'Teamleiter'].map(
      roleType => ({
        value: roleType,
        label: roleType
      })
    );
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        Vor- und Nachname:
        <input
          className={`text-input`}
          name='name'
          type='text'
          placeholder='Vor- und Nachname'
          autoFocus
          value={this.state.name}
          onChange={this.changeHandler}
        />
        Rolle:
        <Select
          name={'role'}
          value={this.state.role}
          options={roleTypeOptions}
          onChange={this.onRoleChange}
        />
        Firebase Auth Id:
        <input
          className={`text-input`}
          name='firebaseAuthId'
          type='text'
          placeholder='firebase user id'
          autoFocus
          value={this.state.firebaseAuthId}
          onChange={this.changeHandler}
        />
        <div>
          <button className='button button--secondary-clienti'>
            Speichern
          </button>
        </div>
      </form>
    );
  }
}
