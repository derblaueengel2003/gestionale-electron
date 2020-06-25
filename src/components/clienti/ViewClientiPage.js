import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DealList from '../deals/DealList';
import FattureList from '../fatture/FattureList';
import LeadsList from '../leads/LeadsList';
import OggettiList from '../oggetti/OggettiList';
import { ipcRenderer } from 'electron';
import Intestazione from '../common/Intestazione';

export class ViewClientiPage extends React.Component {
  openFile = () => {
    ipcRenderer.send('folder:open', {
      folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Kunden/`,
      folderNamePartial: this.props.cliente.cognome,
    });
  };
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
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/customeredit/${id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            {email && (
              <a
                href={`mailto:${email}`}
                className='btn-floating blue right btn-floating-margin'
              >
                <i className='material-icons'>email</i>
              </a>
            )}
            {telefono1 && (
              <a
                href={`tel:${telefono1}`}
                className='btn-floating light-green accent-3 right btn-floating-margin'
              >
                <i className='material-icons'>phone</i>
              </a>
            )}
            {cellulare && (
              <a
                href={`tel:${cellulare}`}
                className='btn-floating light-green accent-3 right btn-floating-margin'
              >
                <i className='material-icons'>phone_iphone</i>
              </a>
            )}
            {
              <button
                className='btn-floating light-blue accent-3 right btn-floating-margin'
                onClick={this.openFile}
              >
                <i className='material-icons'>folder</i>
              </button>
            }
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
        {utente.role === 'Admin' && <FattureList dealFatture={dealFatture} />}
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
