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
    const lead = this.props.leads.find(
      lead => lead.leadId === this.props.cliente.id
    );
    const deals = this.props.deals.find(
      deal =>
        deal.agenziaPartnerId === this.props.cliente.id ||
        deal.venditoreId === this.props.cliente.id ||
        deal.venditoreId2 === this.props.cliente.id ||
        deal.acquirenteId === this.props.cliente.id ||
        deal.acquirenteId2 === this.props.cliente.id ||
        deal.notaioId === this.props.cliente.id
    );
    const oggetti = this.props.oggetti.find(
      oggetto =>
        oggetto.proprietarioId === this.props.cliente.id ||
        oggetto.proprietarioId2 === this.props.cliente.id ||
        oggetto.verwalter === this.props.cliente.id
    );
    const fatture = this.props.fatture.find(
      fattura =>
        fattura.clienteId === this.props.cliente.id ||
        fattura.clienteId2 === this.props.cliente.id
    );
    if (
      window.confirm('Bestätigen Sie die Löschung? Das ist unwiderruflich!')
    ) {
      if (!lead && !deals && !oggetti && !fatture) {
        this.props.startRemoveCustomer({ id: this.props.cliente.id });
        this.props.history.push('/customer');
      } else {
        alert(
          'Nicht löschbar: Der Kontakt wird in Anfragen, Deals, Objekte oder Rechnungen verwendet.'
        );
      }
    }
  };
  onDisable = () => {
    const lead = this.props.leads.find(
      lead => lead.leadId === this.props.cliente.id
    );
    const deals = this.props.deals.find(
      deal =>
        deal.agenziaPartnerId === this.props.cliente.id ||
        deal.venditoreId === this.props.cliente.id ||
        deal.venditoreId2 === this.props.cliente.id ||
        deal.acquirenteId === this.props.cliente.id ||
        deal.acquirenteId2 === this.props.cliente.id ||
        deal.notaioId === this.props.cliente.id
    );
    const oggetti = this.props.oggetti.find(
      oggetto =>
        oggetto.proprietarioId === this.props.cliente.id ||
        oggetto.proprietarioId2 === this.props.cliente.id ||
        oggetto.verwalter === this.props.cliente.id
    );
    const fatture = this.props.fatture.find(
      fattura =>
        fattura.clienteId === this.props.cliente.id ||
        fattura.clienteId2 === this.props.cliente.id
    );
    if (window.confirm('Bestätigen Sie die Löschung?')) {
      if (!lead && !deals && !oggetti && !fatture) {
        this.props.startEditCustomer(this.props.cliente.id, {
          ...this.props.cliente,
          visible: false
        });
        this.props.history.push('/customer');
      } else {
        alert(
          'Nicht löschbar: Der Kontakt wird in Anfragen, Deals, Objekte oder Rechnungen verwendet.'
        );
      }
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
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  leads: state.leads,
  deals: state.deals,
  oggetti: state.oggetti,
  fatture: state.fatture
});

const mapDispatchToProps = dispatch => ({
  startEditCustomer: (id, cliente, visible) =>
    dispatch(startEditCustomer(id, cliente, visible)),
  startRemoveCustomer: data => dispatch(startRemoveCustomer(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditClientePage);
