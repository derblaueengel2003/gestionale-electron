import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeadsList from '../leads/LeadsList';
import FattureList from '../fatture/FattureList';
import DealList from '../deals/DealList';
import OggettiList from '../oggetti/OggettiList';

export class ViewClientiPage extends React.Component {
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
      id
    } = this.props.cliente;
    const { uid } = this.props;

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
    return (
      <div>
        <div className='page-header page-header-clienti'>
          <div className='content-container'>
            <h1 className='page-header__title'>Cliente</h1>
          </div>
        </div>
        <div className='content-container'>
          <div className='list-header list-header-clienti'>
            <div className='show-for-mobile'>Scheda cliente</div>
            <div className='show-for-desktop'>Scheda cliente</div>
            <div className='show-for-desktop'></div>
          </div>
          <div className='list-body'>
            <div className='list-item'>
              <div>
                {ditta.length > 0 && <h3>{ditta}</h3>}
                {nome.length > 0 && (
                  <h3>
                    {titolo} {nome} {cognome}
                  </h3>
                )}
                {indirizzo.length > 0 && (
                  <div>{`${indirizzo} ${indirizzo2 &&
                    indirizzo2}, ${cap} ${comune}, ${nazione}`}</div>
                )}
              </div>
              <div>
                {telefono1.length > 0 && <div>Tel: {telefono1}</div>}
                {email.length > 0 && (
                  <div>
                    E-Mail: <a href={`mailto:${email}`}>{email}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link
            className='print button button--secondary-clienti'
            to={`/customeredit/${id}`}
          >
            Modifica Cliente
          </Link>
        </div>
        <LeadsList userLeads={this.props.leads} />
        <OggettiList oggetto={this.props.oggetti} />

        <DealList clienteDeals={clienteDeals} />
        {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && (
          <FattureList dealFatture={dealFatture} />
        )}
        {uid === 'aGOwhidD7rVXfbYrWBmKL7mNrf33' && (
          <FattureList dealFatture={dealFatture} />
        )}
        {uid === 'BNhRvZCcvMPr54unKlYSSliPel42' && (
          <FattureList dealFatture={dealFatture} />
        )}
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
  uid: state.auth.uid
});

export default connect(mapStateToProps)(ViewClientiPage);
