import React from 'react';
import { connect } from 'react-redux';
import CustomerForm from './ClientiForm';
import { startEditCustomer, startRemoveCustomer } from '../../actions/clienti';

export class EditClientePage extends React.Component {
  onSubmit = cliente => {
    this.props.startEditCustomer(this.props.cliente.id, cliente);
    this.props.history.push(`/customerview/${this.props.cliente.id}`);
  };
  onRemove = () => {
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      this.props.startRemoveCustomer({ id: this.props.cliente.id });
      this.props.history.push('/customer');
    }
  };
  onDisable = () => {
    if (window.confirm('Bestätigen Sie die Löschung?')) {
      this.props.startEditCustomer(this.props.cliente.id, {
        ...this.props.cliente,
        visible: false
      });
      this.props.history.push('/customer');
    }
  };

  render() {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Kundendaten ändern</h1>
          </div>
        </div>
        <div className='content-container'>
          <CustomerForm
            customer={this.props.cliente}
            onSubmit={this.onSubmit}
          />
          <button
            className='button button--secondary-delete'
            onClick={
              this.props.utente.role === 'Admin'
                ? this.onRemove
                : this.onDisable
            }
          >
            Kunde löschen
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cliente: state.clienti.find(cliente => cliente.id === props.match.params.id),
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
});

const mapDispatchToProps = dispatch => ({
  startEditCustomer: (id, cliente, visible) =>
    dispatch(startEditCustomer(id, cliente, visible)),
  startRemoveCustomer: data => dispatch(startRemoveCustomer(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClientePage);
