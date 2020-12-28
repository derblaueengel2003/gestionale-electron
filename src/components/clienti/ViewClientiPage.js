import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import DealList from '../deals/DealList';
import FattureList from '../fatture/FattureList';
import LeadsList from '../leads/LeadsList';
import OggettiList from '../oggetti/OggettiList';
import Intestazione from '../common/Intestazione';
import { contactDetailsButton, editButton } from '../common/elements';

export class ViewClientiPage extends React.Component {
  render() {
    const {
      cloudURL,
      cap,
      cellulare,
      cognome,
      comune,
      consulenteVenditaId,
      ditta,
      email,
      fax,
      id,
      indirizzo,
      indirizzo2,
      nazione,
      nome,
      note,
      telefono1,
      titolo,
      www,
      consensoDSGVO,
    } = this.props.cliente;
    const { utente, t } = this.props;

    const dealFatture = this.props.fatture.filter(
      (fattura) => fattura.clienteId === id || fattura.clienteId2 === id
    );
    const clienteDeals = this.props.deals.filter(
      (deal) =>
        deal.acquirenteId === id ||
        deal.acquirenteId2 === id ||
        deal.venditoreId === id ||
        deal.venditoreId2 === id ||
        deal.agenziaPartnerId === id
    );
    const consulenteVendita = this.props.utenti.find(
      (utente) => utente.id === consulenteVenditaId
    );
    return (
      <div>
        <Intestazione
          intestazione={
            cognome && (
              <span>
                {titolo} {nome} {cognome}
              </span>
            )
          }
        />

        <div className='container section'>
          <div>
            {editButton(`/clientiedit/${id}`)}
            {contactDetailsButton(this.props.cliente)}
          </div>

          <div>
            {ditta && <h5>{ditta}</h5>}

            {consulenteVendita && <p>{`(${consulenteVendita.name})`}</p>}
            {indirizzo && (
              <p>{`${indirizzo} ${
                indirizzo2 && indirizzo2
              }, ${cap} ${comune}, ${nazione}`}</p>
            )}

            {telefono1 && (
              <p>
                {t('Telefono fisso')}: {telefono1}
              </p>
            )}
            {fax && <p>Fax: {fax}</p>}
            {cellulare && (
              <p>
                {t('Cellulare')}: {cellulare}
              </p>
            )}
            {www && (
              <p>
                {t('Sito web')}: <a href={`http://${www}`}>{www}</a>
              </p>
            )}
            {email && (
              <p>
                {t('Email')}: <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
            {note && (
              <p>
                {t('Note')}: {note}
              </p>
            )}

            {consensoDSGVO && (
              <p>
                {t('Consenso al trattamento dei dati personali')}: {t('sì')}
              </p>
            )}
          </div>
        </div>
        <LeadsList userLeads={this.props.leads} ruolo={t('Richieste')} />
        <OggettiList oggetto={this.props.oggetti} ruolo={t('Oggetti')} />

        <DealList clienteDeals={clienteDeals} ruolo={t('Vendite')} />
        {utente.role === 'Admin' && (
          <FattureList dealFatture={dealFatture} ruolo={t('invoices')} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  cliente: state.clienti.find(
    (cliente) => cliente.id === props.match.params.id
  ),
  leads: state.leads.filter((lead) => lead.leadId === props.match.params.id),
  oggetti: state.oggetti.filter(
    (oggetto) =>
      oggetto.proprietarioId === props.match.params.id ||
      oggetto.proprietarioId2 === props.match.params.id ||
      oggetto.verwalter === props.match.params.id
  ),
  fatture: state.fatture,
  deals: state.deals,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  utenti: state.utenti,
  lingua: state.lingua,
});

export default connect(mapStateToProps)(withTranslation()(ViewClientiPage));
