import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeadsList from '../leads/LeadsList';
import FattureList from '../fatture/FattureList';
import DealList from '../deals/DealList';
import OggettiList from '../oggetti/OggettiList';

export class ViewClientiPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  modalToggle = () => {
    this.setState({ modal: !this.state.modal });
    console.log(this.state.modal);
  };
  render() {
    const {
      ditta,
      nome,
      cognome,
      titolo,
      indirizzo,
      indirizzo2,
      telefono1,
      email,
      cap,
      comune,
      nazione,
      consulenteVenditaId,
      id
    } = this.props.cliente;
    const { utente } = this.props;

    const dealFatture = this.props.fatture.filter(
      fattura => fattura.clienteId === id || fattura.clienteId2 === id
    );
    const clienteDeals = this.props.deals.filter(
      deal =>
        deal.acquirenteId === id ||
        deal.acquirenteId2 === id ||
        deal.venditoreId === id ||
        deal.venditoreId2 === id ||
        deal.agenziaPartnerId === id
    );
    const consulenteVendita = this.props.utenti.find(
      utente => utente.id === consulenteVenditaId
    );
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>Adressbuch Kontakte</h1>
          </div>
        </div>
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right'
              to={`/customeredit/${id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            {email.length > 0 && (
              <a
                href={`mailto:${email}`}
                className='btn-floating blue right btn-floating-margin'
              >
                <i className='material-icons'>email</i>
              </a>
            )}
          </div>

          <div>
            {ditta.length > 0 && <h5>{ditta}</h5>}
            {cognome.length > 0 && (
              <h5>
                {titolo} {nome} {cognome}
              </h5>
            )}
            {indirizzo.length > 0 && (
              <p>{`${indirizzo} ${indirizzo2 &&
                indirizzo2}, ${cap} ${comune}, ${nazione}`}</p>
            )}

            {telefono1.length > 0 && <p>Tel: {telefono1}</p>}
            {email.length > 0 && (
              <p>
                E-Mail: <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </div>
        </div>
        <LeadsList userLeads={this.props.leads} />
        <OggettiList oggetto={this.props.oggetti} />

        <DealList clienteDeals={clienteDeals} />
        {utente.role === 'Admin' && <FattureList dealFatture={dealFatture} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cliente: state.clienti.find(cliente => cliente.id === props.match.params.id),
  leads: state.leads.filter(lead => lead.leadId === props.match.params.id),
  oggetti: state.oggetti.filter(
    oggetto =>
      oggetto.proprietarioId === props.match.params.id ||
      oggetto.proprietarioId2 === props.match.params.id ||
      oggetto.verwalter === props.match.params.id
  ),
  fatture: state.fatture,
  deals: state.deals,
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  utenti: state.utenti
});

export default connect(mapStateToProps)(ViewClientiPage);
