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
import Intestazione from '../common/Intestazione';

export class ViewFatturePage extends React.Component {
  render() {
    const { t } = this.props;
    const singleFattura = this.props.fatture.find(
      (fattura) => fattura.id === this.props.match.params.id
    );
    let deal = this.props.deals.find(
      (deal) => deal.id === singleFattura.dealId
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
      (cliente) => cliente.id === singleFattura.clienteId
    );
    const cliente2 = this.props.clienti.find(
      (cliente) => cliente.id === singleFattura.clienteId2
    );
    const ceo = this.props.utenti.filter(
      (utente) => utente.qualifica === 'Geschäftsführer'
    );
    const utente = this.props.utenti.find(
      (utente) => utente.firebaseAuthId === this.props.auth.uid
    );

    if (singleFattura) {
      return (
        <div>
          <Intestazione
            intestazione={
              oggetto
                ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}`
                : singleFattura.descrizioneProdotto
            }
          />
          <div className='container section'>
            <div>
              <Link
                className='btn-floating orange right btn-floating-margin'
                to={`/fatturaedit/${singleFattura.id}`}
              >
                <i className='material-icons'>edit</i>
              </Link>
            </div>

            <div className='section'>
              {deal && deal.dealType}

              {singleFattura.numeroFattura && (
                <h5>
                  {t('Numero fattura')}: {singleFattura.numeroFattura}
                </h5>
              )}
              <h5>
                {t('Importo netto')}:{' '}
                {deal
                  ? numeral(deal.amount / 100).format('0,0[.]00 $')
                  : numeral(singleFattura.importoNetto / 100).format(
                      '0,0[.]00 $'
                    )}
              </h5>
              {singleFattura.note}
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
              {singleFattura.dataFattura && (
                <div>
                  {t('Data fattura')}:{' '}
                  {moment(singleFattura.dataFattura).format('DD MMMM, YYYY')}
                </div>
              )}
              {singleFattura.iva && (
                <div>
                  {t('vat_applied')}: {singleFattura.iva}%
                </div>
              )}
              {singleFattura.dataZahlungserinnerung && (
                <div>
                  {t('Sollecito')}:{' '}
                  {moment(singleFattura.dataZahlungserinnerung).format(
                    'DD MMMM, YYYY'
                  )}
                </div>
              )}
              {singleFattura.dataMahnung && (
                <div>
                  1. {t('Sollecito con penale')}:{' '}
                  {moment(singleFattura.dataMahnung).format('DD MMMM, YYYY')}
                </div>
              )}
              {singleFattura.dataMahnung2 && (
                <div>
                  2. {t('Sollecito con penale')}:{' '}
                  {moment(singleFattura.dataMahnung2).format('DD MMMM, YYYY')}
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
                            singleFattura.numeroFattura,
                            singleFattura.dataFattura,
                            singleFattura.descrizioneProdotto,
                            singleFattura.importoNetto,
                            singleFattura.iva,
                            singleFattura.dataPrestazione,
                            oggetto,
                            deal && deal.prezzoDiVendita,
                            deal && deal.dataRogito,
                            deal && deal.amount,
                            deal && deal.createdAt,
                            deal && deal.dealType,
                            acquirente,
                            acquirente2,
                            this.props.firma,
                            utente,
                            ceo
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
                {singleFattura.dataZahlungserinnerung && (
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
                              singleFattura.numeroFattura,
                              singleFattura.dataFattura,
                              singleFattura.dataZahlungserinnerung,
                              deal && deal.amount,
                              this.props.firma,
                              utente,
                              ceo,
                              singleFattura.importoNetto,
                              singleFattura.iva
                            );
                          }}
                        >
                          picture_as_pdf
                        </i>
                      </a>
                    </div>
                  </li>
                )}
                {singleFattura.dataMahnung && (
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
                              singleFattura.numeroFattura,
                              singleFattura.dataFattura,
                              singleFattura.dataZahlungserinnerung,
                              singleFattura.dataMahnung,
                              deal && deal.amount,
                              singleFattura.mahngebuehren,
                              this.props.firma,
                              utente,
                              ceo,
                              singleFattura.importoNetto,
                              singleFattura.iva
                            );
                          }}
                        >
                          picture_as_pdf
                        </i>
                      </a>
                    </div>
                  </li>
                )}
                {singleFattura.dataMahnung2 && (
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
                              singleFattura.numeroFattura,
                              singleFattura.dataFattura,
                              singleFattura.dataZahlungserinnerung,
                              singleFattura.dataMahnung,
                              singleFattura.dataMahnung2,
                              deal && deal.amount,
                              singleFattura.mahngebuehren2,
                              this.props.firma,
                              utente,
                              ceo,
                              singleFattura.importoNetto,
                              singleFattura.iva
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
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state, props) => ({
  fatture: state.fatture,
  clienti: state.clienti,
  deals: state.deals,
  oggetti: state.oggetti,
  firma: state.firma[0],
  utenti: state.utenti,
  lingua: state.lingua,
  auth: state.auth,
});

export default connect(mapStateToProps)(withTranslation()(ViewFatturePage));
