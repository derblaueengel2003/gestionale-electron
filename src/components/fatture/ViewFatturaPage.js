import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { fattura } from '../moduli/Fattura';
import { mahnung } from '../moduli/Mahnung';
import { mahnung2 } from '../moduli/Mahnung2';
import { zahlungserinnerung } from '../moduli/Zahlungserinnerung';
import OggettiList from '../oggetti/OggettiList';
import DealList from '../deals/DealList';
import ClientiList from '../clienti/ClientiList';
import Intestazione from '../common/Intestazione';
import {
  formattaData,
  formattaPrezzo,
  indirizzoOggetto,
} from '../common/utils';
import { editButton } from '../common/elements';

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
                ? `Rif. Id: ${oggetto.rifId} - ${indirizzoOggetto(oggetto)}`
                : singleFattura.descrizioneProdotto
            }
          />
          <div className='container section'>
            <div>{editButton(`/fatturaedit/${singleFattura.id}`)}</div>

            <div className='section'>
              {deal && deal.dealType}

              {singleFattura.numeroFattura && (
                <h5>
                  {t('Numero fattura')}: {singleFattura.numeroFattura}
                </h5>
              )}
              <h5>
                {t('Importo netto')}:{' '}
                {formattaPrezzo(singleFattura.importoNetto, true)}
              </h5>
              {singleFattura.note}
              <div className='list-item__title'>
                {oggetto &&
                  `Rif. Id: ${oggetto.rifId} - ${indirizzoOggetto(oggetto)}`}
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
                  {t('Data fattura')}: {formattaData(singleFattura.dataFattura)}
                </div>
              )}
              {singleFattura && (
                <div>
                  {t('vat_applied')}: {this.props.firma.ivaApplicata}%
                </div>
              )}
              {singleFattura.dataZahlungserinnerung && (
                <div>
                  {t('Sollecito')}:{' '}
                  {formattaData(singleFattura.dataZahlungserinnerung)}
                </div>
              )}
              {singleFattura.dataMahnung && (
                <div>
                  1. {t('Sollecito con penale')}:{' '}
                  {formattaData(singleFattura.dataMahnung)}
                </div>
              )}
              {singleFattura.dataMahnung2 && (
                <div>
                  2. {t('Sollecito con penale')}:{' '}
                  {formattaData(singleFattura.dataMahnung2)}
                </div>
              )}
              {deal && deal.dataRogito > 0 && (
                <div>
                  {t('Data del rogito')}: {formattaData(deal.dataRogito)}
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
                            this.props.firma.ivaApplicata,
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
                              this.props.firma.ivaApplicata
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
                              this.props.firma.ivaApplicata
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
                              this.props.firma.ivaApplicata
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
