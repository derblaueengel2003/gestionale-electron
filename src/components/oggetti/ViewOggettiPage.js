import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import numeral from 'numeral';
import ClientiList from '../clienti/ClientiList';
import { expose } from '../moduli/Expose';
import ImmoscoutAPI from './ImmoscoutAPI';
import Intestazione from '../common/Intestazione';
import EvaluationList from '../evaluation/EvaluationList';
import { ipcRenderer } from 'electron';
import Mappa from './Mappa';
import M2SquareAPI from './M2SquareAPI';

export class ViewOggettiPage extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  findContact = (contact) => {
    return this.props.clienti.filter((cliente) => cliente.id === contact);
  };

  openFile = () => {
    ipcRenderer.send('folder:open', {
      folder: `/m2Square - Arboscello & Fornari GbR/m2Square Office - Dokumente/Exposé/`,
      folderNamePartial: this.props.oggetto.rifId,
    });
  };

  render() {
    if (this.props.oggetto && this.props.utente) {
      const { t, oggetto, evaluation } = this.props;
      const verwalter = this.findContact(oggetto.verwalter);
      const proprietario = this.findContact(oggetto.proprietarioId);
      const proprietario2 = this.findContact(oggetto.proprietarioId2);
      const inquilino = this.findContact(oggetto.inquilinoId);
      const rendita = oggetto.affittoNetto
        ? parseFloat((oggetto.affittoNetto * 1200) / oggetto.kaufpreis)
            .toFixed(2)
            .toString()
            .replace(/\./, ',')
        : null;
      const titolo = `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta} ${oggetto.quartiere}`;

      // copia dell'oggetto se voglio fare un duplicato da passare a WP
      const oggettoCopy = {
        ...oggetto,
        downloadURLs: [[], [], []],
        downloadURLsId: [[], [], []],
        downloadURLsCover: [],
        downloadURLsCoverId: [],
        downloadURLsGrundriss: [],
        downloadURLsGrundrissId: [],
        postId: '',
        postIdDe: '',
        postIdEn: '',
        postIdIt: '',
      };

      return (
        <div>
          <Intestazione intestazione={titolo} />
          <div className='container section'>
            <div>
              <Link
                className='btn-floating orange right btn-floating-margin'
                to={`/oggettoedit/${oggetto.id}`}
              >
                <i className='material-icons'>edit</i>
              </Link>
              {/* se l'oggetto è venduto nascondo il pulsante match */}
              {!oggetto.venduto && (
                <Link
                  className='btn-floating green accent-3 right btn-floating-margin'
                  to={`/oggettomatchview/${oggetto.id}`}
                >
                  <i className='material-icons'>search</i>
                </Link>
              )}
              {!evaluation && (
                <Link
                  to={{
                    pathname: '/evaluationcreate',
                    state: {
                      oggettoId: oggetto.id,
                      titolo,
                      affittoNetto: oggetto.affittoNetto,
                      m2:
                        parseFloat(oggetto.m2).toString().replace(/,/g, '.') *
                        100,
                    },
                  }}
                  className='btn-floating  pink lighten-3 right btn-floating-margin'
                >
                  <i className='material-icons'>attach_money</i>
                </Link>
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
              {oggetto.tipologia && (
                <p>
                  {t('property_type')}: {t(oggetto.tipologia)}
                </p>
              )}
              {oggetto.rifId && <p>Ref. id: {oggetto.rifId}</p>}
              {rendita && (
                <div>
                  {t('property_yield')}: {rendita}%
                </div>
              )}
              {oggetto.kaufpreis > 0 && (
                <p>{`${t('Prezzo di vendita')}: ${numeral(
                  oggetto.kaufpreis / 100
                ).format('0,0[.]00 $')}`}</p>
              )}
              <ul className='collapsible'>
                <li>
                  <div className='collapsible-header'>
                    <i className='material-icons'>list</i>
                    {t('Dettagli immobile')}
                  </div>
                  <div className='collapsible-body'>
                    {oggetto.amtsgericht && (
                      <p>
                        {t('Pretura (Amtsgericht)')}: {oggetto.amtsgericht}
                      </p>
                    )}
                    {oggetto.grundbuch && (
                      <p>
                        {t('Libro Fondiario (Grundbuch)')} {oggetto.grundbuch}
                      </p>
                    )}
                    {oggetto.grundbuchBlatt && (
                      <p>
                        {t('Foglio')} Nr.: {oggetto.grundbuchBlatt}
                      </p>
                    )}
                    {oggetto.ruecklage && (
                      <p>
                        {t('Fondo di accantonamento per manutenzione')}:{' '}
                        {oggetto.ruecklage}
                      </p>
                    )}
                    {oggetto.baujahr && (
                      <p>{`${t('Anno di costruzione')}: ${oggetto.baujahr}`}</p>
                    )}
                    {oggetto.energieAusweisTyp && (
                      <p>{`${t('Certificato energetico - tipologia')}: ${t(
                        oggetto.energieAusweisTyp
                      )}`}</p>
                    )}
                    {oggetto.energieAusweisBis && (
                      <p>{`${t('Valido fino al')}: ${
                        oggetto.energieAusweisBis
                      }`}</p>
                    )}
                    {oggetto.heizungsart && (
                      <p>{`${t('Tipologia riscaldamento')}: ${t(
                        oggetto.heizungsart
                      )}`}</p>
                    )}
                    {oggetto.energieTraeger && (
                      <p>{`${t('Fonte energetica')}: ${t(
                        oggetto.energieTraeger
                      )}`}</p>
                    )}
                    {oggetto.energieBedarf && (
                      <p>{`${t('Consumo energetico')}: ${
                        oggetto.energieBedarf
                      }`}</p>
                    )}

                    {oggetto.m2 && <p>{`m2: ${oggetto.m2}`}</p>}
                    {oggetto.piano && (
                      <p>{`${t('Piano')}: ${oggetto.piano}`}</p>
                    )}
                    {oggetto.stato && (
                      <p>{`${t('Stato abitativo')}: ${t(oggetto.stato)}`}</p>
                    )}
                    {oggetto.affittoNetto > 0 && (
                      <p>{`${t('Affitto netto')}: ${numeral(
                        oggetto.affittoNetto / 100
                      ).format('0,0[.]00 $')}`}</p>
                    )}
                    {`${t('Quota condominiale')}: ${numeral(
                      oggetto.wohngeld / 100
                    ).format('0,0[.]00 $')}`}
                    {oggetto.vani && <p>{`${t('Vani')}: ${oggetto.vani}`}</p>}
                    {oggetto.bagni && (
                      <p>{`${t('Bagni')}: ${oggetto.bagni}`}</p>
                    )}
                    {oggetto.balcone && <p>{`${t('Balcone')}: ${t('sì')}`}</p>}
                    {oggetto.ascensore && (
                      <p>{`${t('Ascensore')}: ${t('sì')}`}</p>
                    )}
                    {oggetto.giardino && (
                      <p>{`${t('Giardino')}: ${t('sì')}`}</p>
                    )}
                    {oggetto.cantina && <p>{`${t('Cantina')}: ${t('sì')}`}</p>}

                    {oggetto.condizioni && (
                      <p>{`${t('Condizioni immobile')}: ${t(
                        oggetto.condizioni
                      )}`}</p>
                    )}
                  </div>
                </li>
              </ul>

              {oggetto.note && <p>{`Note: ${oggetto.note}`}</p>}
              {oggetto.venduto === true && (
                <h5 className='red-text'>{t('Venduto')}!</h5>
              )}
            </div>
          </div>
          <div className='container section'>
            <div className='btn-row'>
              {this.props.utente.role === 'Admin' && (
                <div>
                  <h5>Admin Console</h5>
                  <div className='admin-console'>
                    <div className='admin-console-item'>
                      <ImmoscoutAPI oggetto={oggetto} />
                    </div>
                    <div className='admin-console-item'>
                      <M2SquareAPI oggetto={oggetto} />
                    </div>
                    <div className='admin-console-item'>
                      <Link
                        to={{
                          pathname: '/oggettocreate',
                          state: {
                            oggetto: oggettoCopy,
                          },
                        }}
                        className='btn-floating  blue lighten-3 right btn-floating-margin'
                      >
                        <i className='material-icons'>content_copy</i>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='container section'>
            {/* Se ho cover e titolo, mostro il pulsante exposé */}
            <ul className='collection  s12 m6'>
              {oggetto.downloadURLsCover && oggetto.titoloDe && (
                <li className='collection-item'>
                  <div>
                    Exposé {t('tedesco')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          expose(
                            oggetto,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            'de'
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
              )}

              {oggetto.downloadURLsCover && oggetto.titolo && (
                <li className='collection-item'>
                  <div>
                    Exposé {t('italiano')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          expose(
                            oggetto,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            'it'
                          );
                        }}
                      >
                        picture_as_pdf
                      </i>
                    </a>
                  </div>
                </li>
              )}
              {oggetto.downloadURLsCover && oggetto.titoloEn && (
                <li className='collection-item'>
                  <div>
                    Exposé {t('inglese')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          expose(
                            oggetto,
                            this.props.firma,
                            this.props.utente,
                            this.props.ceo,
                            'en'
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

            {!oggetto.downloadURLsCover ||
            oggetto.titolo.length < 1 ||
            oggetto.titoloDe.length < 1 ||
            oggetto.titoloEn.length < 1 ? (
              <div className=''>
                {t(
                  'Per creare un exposé inserisci almeno una immagine di copertina e un titolo principale'
                )}
              </div>
            ) : (
              ''
            )}
          </div>

          {oggetto.verwalter && (
            <div>
              <ClientiList
                cliente={verwalter}
                ruolo={t('Amministratore di condominio')}
              />
            </div>
          )}
          {oggetto.proprietarioId && (
            <div>
              <ClientiList cliente={proprietario} ruolo={t('Proprietario')} />
            </div>
          )}
          {oggetto.proprietarioId2 && (
            <div>
              <ClientiList
                cliente={proprietario2}
                ruolo={`2. ${t('Proprietario')}`}
              />
            </div>
          )}
          {oggetto.inquilinoId && (
            <div>
              <ClientiList cliente={inquilino} ruolo={t('Inquilino')} />
            </div>
          )}
          {evaluation && (
            <div>
              <EvaluationList
                oggettoEvaluation={[evaluation]}
                ruolo={t('evaluation')}
              />
            </div>
          )}
          <div className='container'>
            {oggetto.downloadURLsCover && (
              <div className='grey lighten-4'>
                <div>
                  <h1>{t('Immagine di copertina')}</h1>
                </div>{' '}
              </div>
            )}
            {oggetto.downloadURLsCover &&
              oggetto.downloadURLsCover.map((downloadURL, i) => {
                return <img className='foto' key={i} src={downloadURL} />;
              })}
          </div>
          <div className='container'>
            {oggetto.downloadURLs && (
              <div className='grey lighten-4'>
                <div>
                  <h1>{t('Immagini')}</h1>
                </div>{' '}
              </div>
            )}
            {oggetto.downloadURLs && Array.isArray(oggetto.downloadURLs[0])
              ? oggetto.downloadURLs[0].map((downloadURL, i) => {
                  return <img className='foto' key={i} src={downloadURL} />;
                })
              : oggetto.downloadURLs &&
                oggetto.downloadURLs.map((downloadURL, i) => {
                  return <img className='foto' key={i} src={downloadURL} />;
                })}
          </div>

          <div className='container'>
            {oggetto.downloadURLsGrundriss && (
              <div className='grey lighten-4'>
                <div>
                  <h1>{t('Planimetria')}</h1>
                </div>{' '}
              </div>
            )}
            {oggetto.downloadURLsGrundriss &&
              oggetto.downloadURLsGrundriss.map((downloadURL, i) => {
                return <img className='foto' key={i} src={downloadURL} />;
              })}
          </div>
          <Mappa oggetto={oggetto} />
          {oggetto.titolo && (
            <div className='container margine-basso'>
              <div className='grey lighten-4'>
                <div>
                  <h1>{t("Testo dell'exposé in italiano")}</h1>
                </div>
              </div>
              <div>{`Titolo: ${oggetto.titolo}`}</div>
              <div>{`Descrizione: ${oggetto.descrizione}`}</div>
            </div>
          )}
          {oggetto.titoloDe && (
            <div className='container margine-basso'>
              <div className='grey lighten-4'>
                <div>
                  <h1>{t("Testo dell'exposé in tedesco")}</h1>
                </div>
              </div>
              <div>{`Titel: ${oggetto.titoloDe}`}</div>
              <div>{`Beschreibung: ${oggetto.descrizioneDe}`}</div>
            </div>
          )}
          {oggetto.titoloEn && (
            <div className='container margine-basso'>
              <div className='grey lighten-4'>
                <div>
                  <h1>{t("Testo dell'exposé in inglese")}</h1>
                </div>
              </div>
              <div>{`Title: ${oggetto.titoloEn}`}</div>
              <div>{`Description: ${oggetto.descrizioneEn}`}</div>
            </div>
          )}
          {oggetto.dataInserimentoOggetto && (
            <div className='container'>
              Data inserimento oggetto:{' '}
              {moment(oggetto.dataInserimentoOggetto).format('DD MMMM, YYYY')}
            </div>
          )}
          {oggetto.dataModificaOggetto && (
            <div className='container margine-basso'>
              Data modifica oggetto:{' '}
              {moment(oggetto.dataModificaOggetto).format('DD MMMM, YYYY')}
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
  oggetto: state.oggetti.find(
    (oggetto) => oggetto.id === props.match.params.id
  ),
  clienti: state.clienti,
  firma: state.firma[0],
  ceo: state.utenti.filter((utente) => utente.qualifica === 'Geschäftsführer'),
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  evaluation: state.evaluations.find(
    (evaluation) => evaluation.oggettoId === props.match.params.id
  ),
});

export default connect(mapStateToProps)(withTranslation()(ViewOggettiPage));
