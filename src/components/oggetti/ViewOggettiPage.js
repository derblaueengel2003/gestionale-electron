import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import ClientiList from '../clienti/ClientiList';
import { expose } from '../moduli/Expose';
import Geocode from 'react-geocode';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE');
// set response language. Defaults to english.
Geocode.setLanguage('de');
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('de');
// Enable or disable logs. Its optional.
Geocode.enableDebug();
// Get latidude & longitude from address.

export class ViewOggettiPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ latitude: '', longitude: '' }]
    };
  }

  componentDidMount() {
    Geocode.fromAddress(
      `${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, ${this.props.oggetto.cap} ${this.props.oggetto.citta}`
    ).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState(
          prevState => (
            (prevState.stores[0].latitude = lat),
            (prevState.stores[0].longitude = lng)
          )
        );
      },
      error => {
        console.error(error);
      }
    );
    console.log(this.state);
  }

  findContact = contact => {
    return this.props.clienti.filter(cliente => cliente.id === contact);
  };

  render() {
    const { t } = this.props;
    const verwalter = this.findContact(this.props.oggetto.verwalter);
    const proprietario = this.findContact(this.props.oggetto.proprietarioId);
    const proprietario2 = this.findContact(this.props.oggetto.proprietarioId2);
    const inquilino = this.findContact(this.props.oggetto.inquilinoId);
    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>{t('Oggetto')}</h1>
          </div>
        </div>
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right btn-floating-margin'
              to={`/oggettoedit/${this.props.oggetto.id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            {/* se l'oggetto è venduto nascondo il pulsante match */}
            {!this.props.oggetto.venduto && (
              <Link
                className='btn-floating green accent-3 right btn-floating-margin'
                to={`/oggettomatchview/${this.props.oggetto.id}`}
              >
                Match
              </Link>
            )}
          </div>

          <div>
            {this.props.oggetto.via && (
              <h5>{`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta} ${this.props.oggetto.quartiere}`}</h5>
            )}
            {this.props.oggetto.tipologia && (
              <p>Tipo di immobile: {t(this.props.oggetto.tipologia)}</p>
            )}
            {this.props.oggetto.rifId && (
              <p>Ref. id: {this.props.oggetto.rifId}</p>
            )}
            {this.props.oggetto.kaufpreis > 0 && (
              <p>{`${t('Prezzo di vendita')}: ${numeral(
                this.props.oggetto.kaufpreis / 100
              ).format('0,0[.]00 $')}`}</p>
            )}
            {this.props.oggetto.amtsgericht && (
              <p>
                {t('Pretura (Amtsgericht)')}: {this.props.oggetto.amtsgericht}
              </p>
            )}
            {this.props.oggetto.grundbuch && (
              <p>
                {t('Libro Fondiario (Grundbuch)')}{' '}
                {this.props.oggetto.grundbuch}
              </p>
            )}
            {this.props.oggetto.grundbuchBlatt && (
              <p>
                {t('Foglio')} Nr.: {this.props.oggetto.grundbuchBlatt}
              </p>
            )}
            {this.props.oggetto.ruecklage && (
              <p>
                {t('Fondo di accantonamento per manutenzione')}:{' '}
                {this.props.oggetto.ruecklage}
              </p>
            )}
            {this.props.oggetto.baujahr && (
              <p>{`${t('Anno di costruzione')}: ${
                this.props.oggetto.baujahr
              }`}</p>
            )}
            {this.props.oggetto.energieAusweisTyp && (
              <p>{`${t('Certificato energetico - tipologia')}: ${
                this.props.oggetto.energieAusweisTyp
              }`}</p>
            )}
            {this.props.oggetto.energieAusweisBis && (
              <p>{`${t('Valido fino al')}: ${
                this.props.oggetto.energieAusweisBis
              }`}</p>
            )}
            {this.props.oggetto.heizungsart && (
              <p>{`${t('Tipologia riscaldamento')}: ${
                this.props.oggetto.heizungsart
              }`}</p>
            )}
            {this.props.oggetto.energieTraeger && (
              <p>{`${t('Fonte energetica')}: ${
                this.props.oggetto.energieTraeger
              }`}</p>
            )}
            {this.props.oggetto.energieBedarf && (
              <p>{`${t('Consumo energetico')}: ${
                this.props.oggetto.energieBedarf
              }`}</p>
            )}

            {this.props.oggetto.m2 && <p>{`m2: ${this.props.oggetto.m2}`}</p>}
            {this.props.oggetto.piano && (
              <p>{`${t('Piano')}: ${this.props.oggetto.piano}`}</p>
            )}
            {this.props.oggetto.stato && (
              <p>{`${t('Stato abitativo')}: ${this.props.oggetto.stato}`}</p>
            )}
            {this.props.oggetto.affittoNetto > 0 && (
              <p>{`${t('Affitto netto')}: ${numeral(
                this.props.oggetto.affittoNetto / 100
              ).format('0,0[.]00 $')}`}</p>
            )}
            {`${t('Quota condominiale')}: ${numeral(
              this.props.oggetto.wohngeld / 100
            ).format('0,0[.]00 $')}`}
            {this.props.oggetto.vani && (
              <p>{`${t('Vani')}: ${this.props.oggetto.vani}`}</p>
            )}
            {this.props.oggetto.bagni && (
              <p>{`${t('Bagni')}: ${this.props.oggetto.bagni}`}</p>
            )}
            {this.props.oggetto.balcone && (
              <p>{`${t('Balcone')}: ${t('sì')}`}</p>
            )}
            {this.props.oggetto.ascensore && (
              <p>{`${t('Ascensore')}: ${t('sì')}`}</p>
            )}
            {this.props.oggetto.giardino && (
              <p>{`${t('Giardino')}: ${t('sì')}`}</p>
            )}
            {this.props.oggetto.cantina && (
              <p>{`${t('Cantina')}: ${t('sì')}`}</p>
            )}
            {this.props.oggetto.condizioni && (
              <p>{`${t('Condizioni immobile')}: ${
                this.props.oggetto.condizioni
              }`}</p>
            )}
            {this.props.oggetto.note && (
              <p>{`Note: ${this.props.oggetto.note}`}</p>
            )}
            {this.props.oggetto.venduto === true && (
              <h5 className='red-text'>{t('Venduto')}!</h5>
            )}
          </div>
        </div>
        <div className='container section'>
          {/* Se ho cover e titolo, mostro il pulsante exposé */}
          <ul className='collection  s12 m6'>
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloDe && (
                <li className='collection-item'>
                  <div>
                    Exposé {t('tedesco')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          expose(
                            this.props.oggetto,
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

            {this.props.oggetto.downloadURLsCover && this.props.oggetto.titolo && (
              <li className='collection-item'>
                <div>
                  Exposé {t('italiano')}
                  <a href='#!' className='secondary-content'>
                    <i
                      className='material-icons'
                      onClick={() => {
                        expose(
                          this.props.oggetto,
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
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloEn && (
                <li className='collection-item'>
                  <div>
                    Exposé {t('inglese')}
                    <a href='#!' className='secondary-content'>
                      <i
                        className='material-icons'
                        onClick={() => {
                          expose(
                            this.props.oggetto,
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

          {!this.props.oggetto.downloadURLsCover ||
          this.props.oggetto.titolo.length < 1 ||
          this.props.oggetto.titoloDe.length < 1 ||
          this.props.oggetto.titoloEn.length < 1 ? (
            <div className=''>
              {t(
                'Per creare un exposé inserisci almeno una immagine di copertina e un titolo principale'
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        {this.props.oggetto.verwalter && (
          <div>
            <ClientiList
              cliente={verwalter}
              ruolo={t('Amministratore di condominio')}
            />
          </div>
        )}
        {this.props.oggetto.proprietarioId && (
          <div>
            <ClientiList cliente={proprietario} ruolo={t('Proprietario')} />
          </div>
        )}
        {this.props.oggetto.proprietarioId2 && (
          <div>
            <ClientiList
              cliente={proprietario2}
              ruolo={`2. ${t('Proprietario')}`}
            />
          </div>
        )}
        {this.props.oggetto.inquilinoId && (
          <div>
            <ClientiList cliente={inquilino} ruolo={t('Inquilino')} />
          </div>
        )}
        <div className='container'>
          {this.props.oggetto.downloadURLsCover && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('Immagine di copertina')}</h1>
              </div>{' '}
            </div>
          )}
          {this.props.oggetto.downloadURLsCover &&
            this.props.oggetto.downloadURLsCover.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {this.props.oggetto.downloadURLs && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('Immagini')}</h1>
              </div>{' '}
            </div>
          )}
          {this.props.oggetto.downloadURLs &&
            this.props.oggetto.downloadURLs.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>

        <div className='container'>
          {this.props.oggetto.downloadURLsGrundriss && (
            <div className='grey lighten-4'>
              <div>
                <h1>{t('Planimetria')}</h1>
              </div>{' '}
            </div>
          )}
          {this.props.oggetto.downloadURLsGrundriss &&
            this.props.oggetto.downloadURLsGrundriss.map((downloadURL, i) => {
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
            href={`https://www.google.de/maps/place/${this.props.oggetto.via}+${this.props.oggetto.numeroCivico},+${this.props.oggetto.cap}+${this.props.oggetto.citta}/`}
            target='_blank'
          >
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.oggetto.via}+${this.props.oggetto.numeroCivico},+${this.props.oggetto.cap}+${this.props.oggetto.citta}&zoom=15&size=400x400&maptype=roadmap
&markers=color:blue%7Clabel:A%7C${this.state.stores[0].latitude},${this.state.stores[0].longitude}
&key=AIzaSyBlElUhBRSKAy_GooSEN7uZaA1dLtjzfzE`}
            />
          </a>
        </div>
        {this.props.oggetto.titolo && (
          <div className='container margine-basso'>
            <div className='grey lighten-4'>
              <div>
                <h1>{t("Testo dell'exposé in italiano")}</h1>
              </div>
            </div>
            <div>{`Titolo: ${this.props.oggetto.titolo}`}</div>
            <div>{`Descrizione: ${this.props.oggetto.descrizione}`}</div>
          </div>
        )}
        {this.props.oggetto.titoloDe && (
          <div className='container margine-basso'>
            <div className='grey lighten-4'>
              <div>
                <h1>{t("Testo dell'exposé in tedesco")}</h1>
              </div>
            </div>
            <div>{`Titel: ${this.props.oggetto.titoloDe}`}</div>
            <div>{`Beschreibung: ${this.props.oggetto.descrizioneDe}`}</div>
          </div>
        )}
        {this.props.oggetto.titoloEn && (
          <div className='container margine-basso'>
            <div className='grey lighten-4'>
              <div>
                <h1>{t("Testo dell'exposé in inglese")}</h1>
              </div>
            </div>
            <div>{`Title: ${this.props.oggetto.titoloEn}`}</div>
            <div>{`Description: ${this.props.oggetto.descrizioneEn}`}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  oggetto: state.oggetti.find(oggetto => oggetto.id === props.match.params.id),
  clienti: state.clienti,
  firma: state.firma[0],
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
});

export default connect(mapStateToProps)(withTranslation()(ViewOggettiPage));
