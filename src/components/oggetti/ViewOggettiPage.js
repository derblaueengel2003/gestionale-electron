import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import numeral from 'numeral';
import Geocode from 'react-geocode';
import ClientiList from '../clienti/ClientiList';
import { expose } from '../moduli/Expose';
import ImmoscoutAPI from './ImmoscoutAPI';
import { ipcRenderer } from 'electron';
import Intestazione from '../common/Intestazione';

Geocode.setApiKey('AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE');
Geocode.setLanguage('de');
Geocode.setRegion('de');
Geocode.enableDebug();

export class ViewOggettiPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ latitude: '', longitude: '' }],
    };
  }

  componentDidMount() {
    M.AutoInit();

    Geocode.fromAddress(
      `${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState(
          (prevState) => (
            (prevState.stores[0].latitude = lat),
            (prevState.stores[0].longitude = lng)
          )
        );
      },
      (error) => {
        console.error(error);
      }
    );
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
    const { t, oggetto } = this.props;
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

    return (
      <div>
        <Intestazione
          intestazione={`${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta} ${oggetto.quartiere}`}
        />

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
              <div>
                {t('property_type')}: {t(oggetto.tipologia)}
              </div>
            )}
            {oggetto.rifId && <div>Ref. id: {oggetto.rifId}</div>}
            {rendita && (
              <div>
                {t('property_yield')}: {rendita}%
              </div>
            )}

            {oggetto.kaufpreis > 0 && (
              <div>{`${t('Prezzo di vendita')}: ${numeral(
                oggetto.kaufpreis / 100
              ).format('0,0[.]00 $')}`}</div>
            )}
            <ul className='collapsible'>
              <li>
                <div className='collapsible-header'>
                  <i className='material-icons'>list</i>
                  {t('Dettagli immobile')}
                </div>
                <div className='collapsible-body'>
                  {oggetto.amtsgericht && (
                    <div>
                      {t('Pretura (Amtsgericht)')}: {oggetto.amtsgericht}
                    </div>
                  )}
                  {oggetto.grundbuch && (
                    <div>
                      {t('Libro Fondiario (Grundbuch)')} {oggetto.grundbuch}
                    </div>
                  )}
                  {oggetto.grundbuchBlatt && (
                    <div>
                      {t('Foglio')} Nr.: {oggetto.grundbuchBlatt}
                    </div>
                  )}
                  {oggetto.ruecklage && (
                    <div>
                      {t('Fondo di accantonamento per manutenzione')}:{' '}
                      {oggetto.ruecklage}
                    </div>
                  )}
                  {oggetto.baujahr && (
                    <div>{`${t('Anno di costruzione')}: ${
                      oggetto.baujahr
                    }`}</div>
                  )}
                  {oggetto.energieAusweisTyp && (
                    <div>{`${t('Certificato energetico - tipologia')}: ${
                      oggetto.energieAusweisTyp
                    }`}</div>
                  )}
                  {oggetto.energieAusweisBis && (
                    <div>{`${t('Valido fino al')}: ${
                      oggetto.energieAusweisBis
                    }`}</div>
                  )}
                  {oggetto.heizungsart && (
                    <div>{`${t('Tipologia riscaldamento')}: ${
                      oggetto.heizungsart
                    }`}</div>
                  )}
                  {oggetto.energieTraeger && (
                    <div>{`${t('Fonte energetica')}: ${
                      oggetto.energieTraeger
                    }`}</div>
                  )}
                  {oggetto.energieBedarf && (
                    <div>{`${t('Consumo energetico')}: ${
                      oggetto.energieBedarf
                    }`}</div>
                  )}

                  {oggetto.m2 && <div>{`m2: ${oggetto.m2}`}</div>}
                  {oggetto.piano && (
                    <div>{`${t('Piano')}: ${oggetto.piano}`}</div>
                  )}
                  {oggetto.stato && (
                    <div>{`${t('Stato abitativo')}: ${oggetto.stato}`}</div>
                  )}
                  {oggetto.affittoNetto > 0 && (
                    <div>{`${t('Affitto netto')}: ${numeral(
                      oggetto.affittoNetto / 100
                    ).format('0,0[.]00 $')}`}</div>
                  )}
                  {`${t('Quota condominiale')}: ${numeral(
                    oggetto.wohngeld / 100
                  ).format('0,0[.]00 $')}`}
                  {oggetto.vani && <div>{`${t('Vani')}: ${oggetto.vani}`}</div>}
                  {oggetto.bagni && (
                    <div>{`${t('Bagni')}: ${oggetto.bagni}`}</div>
                  )}
                  {oggetto.balcone && (
                    <div>{`${t('Balcone')}: ${t('sì')}`}</div>
                  )}
                  {oggetto.ascensore && (
                    <div>{`${t('Ascensore')}: ${t('sì')}`}</div>
                  )}
                  {oggetto.giardino && (
                    <div>{`${t('Giardino')}: ${t('sì')}`}</div>
                  )}
                  {oggetto.cantina && (
                    <div>{`${t('Cantina')}: ${t('sì')}`}</div>
                  )}
                  {oggetto.condizioni && (
                    <div>{`${t('Condizioni immobile')}: ${
                      oggetto.condizioni
                    }`}</div>
                  )}
                </div>
              </li>
            </ul>

            {oggetto.note && <div>{`Note: ${oggetto.note}`}</div>}
            {oggetto.venduto === true && (
              <h5 className='red-text'>{t('Venduto')}!</h5>
            )}
          </div>
        </div>

        <div className='container section'>
          {this.props.utente.role === 'Admin' && (
            <ImmoscoutAPI oggetto={oggetto} />
          )}
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
                          'de',
                          this.state.stores[0]
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
                          'it',
                          this.state.stores[0]
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
                          'en',
                          this.state.stores[0]
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
              return (
                <img
                  id='img-cover'
                  className='foto'
                  key={i}
                  src={downloadURL}
                />
              );
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
          {oggetto.downloadURLs &&
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
        <div className='container'>
          <div className='grey lighten-4'>
            <div>
              <h1>{t('Mappa')}</h1>
            </div>
          </div>
          <a
            href={`https://www.google.de/maps/place/${oggetto.via}+${oggetto.numeroCivico},+${oggetto.cap}+${oggetto.citta}/`}
            target='_blank'
          >
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${oggetto.via}+${oggetto.numeroCivico},+${oggetto.cap}+${oggetto.citta}&zoom=15&size=400x400&maptype=roadmap
&markers=color:blue%7Clabel:A%7C${this.state.stores[0].latitude},${this.state.stores[0].longitude}
&key=AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE`}
            />
          </a>
        </div>
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
});

export default connect(mapStateToProps)(withTranslation()(ViewOggettiPage));
