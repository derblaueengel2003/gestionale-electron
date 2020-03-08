import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import UserForm from './UserForm';
import { startEditUser, startRemoveUser } from '../../actions/utenti';

export class EditUtentePage extends React.Component {
  onSubmit = utente => {
    this.props.startEditUser(this.props.utente.id, utente);
    this.props.history.push(`/users`);
  };
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveUser({ id: this.props.utente.id });
      this.props.history.push('/users');
    }
  };
  render() {
    return (
      <div>
        <div>
          <div className='container'>
            <h1>{this.props.t('Modifica utente')}</h1>
          </div>
        </div>
        <div className='container'>
          <button
            className='btn-floating red right btn-floating-margin'
            onClick={this.onRemove}
          >
            <i className='material-icons'>remove</i>
          </button>
          <UserForm user={this.props.utente} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  utente: state.utenti.find(utente => utente.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  startEditUser: (id, utente) => dispatch(startEditUser(id, utente)),
  startRemoveUser: data => dispatch(startRemoveUser(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditUtentePage));
