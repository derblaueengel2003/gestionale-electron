import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
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
      (deal) => deal.id === this.props.fattura.dealId
    );

    const oggetto = deal
      ? this.props.oggetti.find((ogg) => ogg.id === deal.oggettoId)
      : '';
    const acquirente = deal
      ? this.props.clienti.find(
          (ilcliente) => ilcliente.id === deal.acquirenteId
        )
      : '';
    const acquirente2 = deal
      ? this.props.clienti.find(
          (ilcliente) => ilcliente.id === deal.acquirenteId2
        )
      : '';
    const cliente = this.props.clienti.find(
      (cliente) => cliente.id === this.props.fattura.clienteId
    );
    const cliente2 = this.props.clienti.find(
      (cliente) => cliente.id === this.props.fattura.clienteId2
    );

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>
              {oggetto
                ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`
                : this.props.fattura.descrizioneProdotto}
            </h1>
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
          </div>

          <div className='section'>
            {deal && deal.dealType}

            {this.props.fattura.numeroFattura && (
              <h5>
                {t('Numero fattura')}: {this.props.fattura.numeroFattura}
              </h5>
            )}
            <h5>
              {t('Importo netto')}:{' '}
              {deal
                ? numeral(deal.amount / 100).format('0,0[.]00 $')
                : numeral(this.props.fattura.importoNetto / 100).format(
                    '0,0[.]00 $'
                  )}
            </h5>
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

        <div className='section'>
          <div className='grey lighten-4'>
            <div className='container'>
              <h1>{t('Crea documentazione')}</h1>
            </div>
          </div>
          <div className='container'>
            <ul className='collection'>
              <li className='collection-item'>
                <div>
                  {' '}
                  {t('Fattura')}
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        fattura(
                          cliente,
                          cliente2,
                          this.props.fattura.numeroFattura,
                          this.props.fattura.dataFattura,
                          this.props.fattura.descrizioneProdotto,
                          this.props.fattura.importoNetto,
                          this.props.fattura.dataPrestazione,
                          oggetto,
                          deal && deal.prezzoDiVendita,
                          deal && deal.dataRogito,
                          deal && deal.amount,
                          deal && deal.createdAt,
                          deal && deal.dealType,
                          acquirente,
                          acquirente2,
                          this.props.firma,
                          this.props.utente,
                          this.props.ceo
                        );
                      }}
                    >
                      picture_as_pdf
                    </i>
                  </a>
                </div>
              </li>
              {this.props.fattura.dataZahlungserinnerung && (
                <li className='collection-item'>
                  <div>
                    {t('Sollecito')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          zahlungserinnerung(
                            cliente,
                            cliente2,
                            this.props.fattura.numeroFattura,
                            this.props.fattura.dataFattura,
                            this.props.fattura.dataZahlungserinnerung,
                            deal && deal.amount,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            this.props.fattura.importoNetto
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
              )}
              {this.props.fattura.dataMahnung && (
                <li className='collection-item'>
                  <div>
                    {t('Sollecito con penale')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          mahnung(
                            cliente,
                            cliente2,
                            this.props.fattura.numeroFattura,
                            this.props.fattura.dataFattura,
                            this.props.fattura.dataZahlungserinnerung,
                            this.props.fattura.dataMahnung,
                            deal && deal.amount,
                            this.props.fattura.mahngebuehren,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            this.props.fattura.importoNetto
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
              )}
              {this.props.fattura.dataMahnung2 && (
                <li className='collection-item'>
                  <div>
                    2. {t('Sollecito con penale')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          mahnung2(
                            cliente,
                            cliente2,
                            this.props.fattura.numeroFattura,
                            this.props.fattura.dataFattura,
                            this.props.fattura.dataZahlungserinnerung,
                            this.props.fattura.dataMahnung,
                            this.props.fattura.dataMahnung2,
                            deal && deal.amount,
                            this.props.fattura.mahngebuehren2,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            this.props.fattura.importoNetto
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* passo deal come array perché è quello che si aspetta il componente */}
        {deal && <DealList clienteDeals={[deal]} ruolo={`${t('Vendita')}`} />}
        {oggetto && (
          <OggettiList oggetto={[oggetto]} ruolo={`${t('Oggetto')}`} />
        )}
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
  fattura: state.fatture.find(
    (fattura) => fattura.id === props.match.params.id
  ),
  clienti: state.clienti,
  deals: state.deals,
  oggetti: state.oggetti,
  firma: state.firma[0],
  ceo: state.utenti.filter((utente) => utente.qualifica === 'Geschäftsführer'),
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  lingua: state.lingua,
});

export default connect(mapStateToProps)(withTranslation()(ViewFatturePage));
