import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fattura } from '../moduli/Fattura';
import { mahnung } from '../moduli/Mahnung';
import { mahnung2 } from '../moduli/Mahnung2';
import { zahlungserinnerung } from '../moduli/Zahlungserinnerung';
import OggettiList from '../oggetti/OggettiList';
import DealList from '../deals/DealList';
import ClientiList from '../clienti/ClientiList';

export class ViewFatturePage extends React.Component {
  render() {
    const { t } = this.props;
    let deal = this.props.deals.find(
      deal => deal.id === this.props.fattura.dealId
    );
    !deal
      ? (deal = {
          prezzoDiVendita: 0,
          dataFattura: null,
          dataRogito: null,
          amount: 0,
          createdAt: null,
          dealType: ''
        })
      : deal;
    const oggetto = deal
      ? this.props.oggetti.find(ogg => ogg.id === deal.oggettoId)
      : '';
    const acquirente = deal
      ? this.props.clienti.find(ilcliente => ilcliente.id === deal.acquirenteId)
      : '';
    const acquirente2 = deal
      ? this.props.clienti.find(
          ilcliente => ilcliente.id === deal.acquirenteId2
        )
      : '';
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.props.fattura.clienteId
    );
    const cliente2 = this.props.clienti.find(
      cliente => cliente.id === this.props.fattura.clienteId2
    );

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Fattura')}</h1>
          </div>
        </div>
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/fatturaedit/${this.props.fattura.id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            <button
              className='btn-floating blue-grey right btn-floating-margin'
              onClick={() => {
                fattura(
                  cliente,
                  cliente2,
                  this.props.fattura.numeroFattura,
                  this.props.fattura.dataFattura,
                  this.props.fattura.note,
                  oggetto,
                  deal.prezzoDiVendita,
                  deal.dataRogito,
                  deal.amount,
                  deal.createdAt,
                  deal.dealType,
                  acquirente,
                  acquirente2,
                  this.props.firma,
                  this.props.utente,
                  this.props.ceo
                );
              }}
            >
              <i className='material-icons'>print</i>
            </button>
            {this.props.fattura.dataZahlungserinnerung && (
              <button
                className='btn-floating yellow right btn-floating-margin'
                onClick={() => {
                  zahlungserinnerung(
                    cliente,
                    cliente2,
                    this.props.fattura.numeroFattura,
                    this.props.fattura.dataFattura,
                    this.props.fattura.dataZahlungserinnerung,
                    deal.amount,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo
                  );
                }}
              >
                <i className='material-icons'>print</i>
              </button>
            )}
            {this.props.fattura.dataMahnung && (
              <button
                className='btn-floating red right btn-floating-margin'
                onClick={() => {
                  mahnung(
                    cliente,
                    cliente2,
                    this.props.fattura.numeroFattura,
                    this.props.fattura.dataFattura,
                    this.props.fattura.dataZahlungserinnerung,
                    this.props.fattura.dataMahnung,
                    deal.amount,
                    this.props.fattura.mahngebuehren,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo
                  );
                }}
              >
                <i className='material-icons'>print</i>
              </button>
            )}
            {this.props.fattura.dataMahnung2 && (
              <button
                className='btn-floating black right'
                onClick={() => {
                  mahnung2(
                    cliente,
                    cliente2,
                    this.props.fattura.numeroFattura,
                    this.props.fattura.dataFattura,
                    this.props.fattura.dataZahlungserinnerung,
                    this.props.fattura.dataMahnung,
                    this.props.fattura.dataMahnung2,
                    deal.amount,
                    this.props.fattura.mahngebuehren2,
                    this.props.firma,
                    this.props.utente,
                    this.props.ceo
                  );
                }}
              >
                <i className='material-icons'>print</i>
              </button>
            )}
          </div>

          <div className='section'>
            {deal && deal.dealType}

            {this.props.fattura.numeroFattura && (
              <h5>
                {t('Numero fattura')}: {this.props.fattura.numeroFattura}
              </h5>
            )}
            {this.props.fattura.note}
            <div className='list-item__title'>
              {oggetto &&
                `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}
            </div>

            {cliente && (
              <div>
                {t('Cliente')}: {cliente.nome} {cliente.cognome}{' '}
                {cliente.ditta && ` - Firma: ${cliente.ditta}`}
              </div>
            )}
            {cliente2 && (
              <div>
                2. {t('Cliente')}: {cliente2.nome} {cliente2.cognome}{' '}
                {cliente2.ditta && ` - Firma: ${cliente2.ditta}`}
              </div>
            )}
          </div>
          <div>
            {this.props.fattura.dataFattura && (
              <div>
                {t('Data fattura')}:{' '}
                {moment(this.props.fattura.dataFattura).format('DD MMMM, YYYY')}
              </div>
            )}
            {this.props.fattura.dataZahlungserinnerung && (
              <div>
                {t('Sollecito')}:{' '}
                {moment(this.props.fattura.dataZahlungserinnerung).format(
                  'DD MMMM, YYYY'
                )}
              </div>
            )}
            {this.props.fattura.dataMahnung && (
              <div>
                1. {t('Sollecito con penale')}:{' '}
                {moment(this.props.fattura.dataMahnung).format('DD MMMM, YYYY')}
              </div>
            )}
            {this.props.fattura.dataMahnung2 && (
              <div>
                2. {t('Sollecito con penale')}:{' '}
                {moment(this.props.fattura.dataMahnung2).format(
                  'DD MMMM, YYYY'
                )}
              </div>
            )}
            {deal && deal.dataRogito > 0 && (
              <div>
                {t('Data del rogito')}:{' '}
                {moment(deal.dataRogito).format('DD MMMM, YYYY')}
              </div>
            )}
          </div>
        </div>
        {/* passo deal come array perché è quello che si aspetta il componente */}
        <DealList clienteDeals={[deal]} traduci={this.traduci} />
        <OggettiList oggetto={[oggetto]} />
        {cliente && (
          <div>
            <ClientiList
              cliente={[cliente]}
              ruolo={`${t('Intestatario fattura')}`}
            />
          </div>
        )}
        {cliente2 && (
          <div>
            <ClientiList
              cliente={[cliente2]}
              ruolo={`2. ${t('Intestatario fattura')}`}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fattura: state.fatture.find(fattura => fattura.id === props.match.params.id),
  clienti: state.clienti,
  deals: state.deals,
  oggetti: state.oggetti,
  firma: state.firma[0],
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  lingua: state.lingua
});

export default connect(mapStateToProps)(withTranslation()(ViewFatturePage));
