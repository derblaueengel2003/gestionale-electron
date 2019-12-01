import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import ClientiList from '../clienti/ClientiList';
import { expose } from '../moduli/Expose';

export class ViewOggettiPage extends React.Component {
  render() {
    const verwalter = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.verwalter
    );
    const proprietario = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.proprietarioId
    );
    const proprietario2 = this.props.clienti.find(
      cliente => cliente.id === this.props.oggetto.proprietarioId2
    );

    return (
      <div>
        <div className='grey lighten-4'>
          <div className='container'>
            <h1>Objekt</h1>
          </div>
        </div>
        <div className='container section'>
          <div>
            <Link
              className='btn-floating orange right'
              to={`/oggettoedit/${this.props.oggetto.id}`}
            >
              <i className='material-icons'>edit</i>
            </Link>
            <Link
              className='btn-floating green accent-3 right btn-floating-margin'
              to={`/oggettomatchview/${this.props.oggetto.id}`}
            >
              Match
            </Link>
          </div>

          <div>
            {this.props.oggetto.via.length > 0 && (
              <h5>{`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta} ${this.props.oggetto.quartiere}`}</h5>
            )}
            {this.props.oggetto.rifId.length > 0 && (
              <p>Ref. id: {this.props.oggetto.rifId}</p>
            )}
            {this.props.oggetto.kaufpreis > 0 && (
              <p>{`Kaufpreis: ${numeral(
                this.props.oggetto.kaufpreis / 100
              ).format('0,0[.]00 $')}`}</p>
            )}
            {this.props.oggetto.amtsgericht.length > 0 && (
              <p>Amtsgericht: {this.props.oggetto.amtsgericht}</p>
            )}
            {this.props.oggetto.grundbuch.length > 0 && (
              <p>Grundbuch von {this.props.oggetto.grundbuch}</p>
            )}
            {this.props.oggetto.grundbuchBlatt.length > 0 && (
              <p>Blatt Nr.: {this.props.oggetto.grundbuchBlatt}</p>
            )}
            {this.props.oggetto.ruecklage.length > 0 && (
              <p>Rücklage: {this.props.oggetto.ruecklage}</p>
            )}
            {this.props.oggetto.baujahr.length > 0 && (
              <p>{`Baujahr: ${this.props.oggetto.baujahr}`}</p>
            )}
            {this.props.oggetto.energieAusweisTyp.length > 0 && (
              <p>{`Energieausweis-Typ: ${this.props.oggetto.energieAusweisTyp}`}</p>
            )}
            {this.props.oggetto.energieAusweisBis.length > 0 && (
              <p>{`Gültig bis: ${this.props.oggetto.energieAusweisBis}`}</p>
            )}
            {this.props.oggetto.heizungsart.length > 0 && (
              <p>{`Heizungsart: ${this.props.oggetto.heizungsart}`}</p>
            )}
            {this.props.oggetto.energieTraeger.length > 0 && (
              <p>{`Enerigeträger: ${this.props.oggetto.energieTraeger}`}</p>
            )}
            {this.props.oggetto.energieBedarf.length > 0 && (
              <p>{`Energiebedarf: ${this.props.oggetto.energieBedarf}`}</p>
            )}

            {this.props.oggetto.m2.length > 0 && (
              <p>{`m2: ${this.props.oggetto.m2}`}</p>
            )}
            {this.props.oggetto.piano.length > 0 && (
              <p>{`Etage: ${this.props.oggetto.piano}`}</p>
            )}
            {this.props.oggetto.stato.length > 0 && (
              <p>{`Status: ${this.props.oggetto.stato}`}</p>
            )}
            {this.props.oggetto.affittoNetto > 0 && (
              <p>{`Kaltmiete: ${numeral(
                this.props.oggetto.affittoNetto / 100
              ).format('0,0[.]00 $')}`}</p>
            )}
            {`Wohngeld: ${numeral(this.props.oggetto.wohngeld / 100).format(
              '0,0[.]00 $'
            )}`}
            {this.props.oggetto.vani.length > 0 && (
              <p>{`Zimmer: ${this.props.oggetto.vani}`}</p>
            )}
            {this.props.oggetto.bagni.length > 0 && (
              <p>{`Bad: ${this.props.oggetto.bagni}`}</p>
            )}
            {this.props.oggetto.balcone && <p>{`Balkon: ja`}</p>}
            {this.props.oggetto.ascensore && <p>{`Aufzug: ja`}</p>}
            {this.props.oggetto.giardino && <p>{`Garten: ja`}</p>}
            {this.props.oggetto.cantina && <p>{`Keller: ja`}</p>}
            {this.props.oggetto.condizioni.length > 0 && (
              <p>{`Zustand: ${this.props.oggetto.condizioni}`}</p>
            )}
          </div>
        </div>
        <div className='container section'>
          {/* Se ho cover e titolo, mostro il pulsante exposé */}
          <ul className='collection  s12 m6'>
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloDe.length > 0 && (
                <li class='collection-item'>
                  <div>
                    Exposé deutsch
                    <a href='#!' class='secondary-content'>
                      <i
                        class='material-icons'
                        onClick={() => {
                          expose(
                            this.props.oggetto,
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

            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titolo.length > 0 && (
                <li class='collection-item'>
                  <div>
                    Exposé italienisch
                    <a href='#!' class='secondary-content'>
                      <i
                        class='material-icons'
                        onClick={() => {
                          expose(
                            this.props.oggetto,
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
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloEn.length > 0 && (
                <li class='collection-item'>
                  <div>
                    Exposé englisch
                    <a href='#!' class='secondary-content'>
                      <i
                        class='material-icons'
                        onClick={() => {
                          expose(
                            this.props.oggetto,
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

          {!this.props.oggetto.downloadURLsCover ||
          this.props.oggetto.titolo.length < 1 ||
          this.props.oggetto.titoloDe.length < 1 ||
          this.props.oggetto.titoloEn.length < 1 ? (
            <div className=''>
              Um ein Exposé zu erstellen, fügen Sie wenigstens ein Cover-Bild
              und eine Überschrift hinzu
            </div>
          ) : (
            ''
          )}
        </div>

        {this.props.oggetto.verwalter.length > 0 && (
          <div>
            <ClientiList cliente={verwalter} ruolo={'Hausverwaltung'} />
          </div>
        )}
        {this.props.oggetto.proprietarioId.length > 0 && (
          <div>
            <ClientiList cliente={proprietario} ruolo={'Eigentümer'} />
          </div>
        )}
        {this.props.oggetto.proprietarioId2.length > 0 && (
          <div>
            <ClientiList cliente={proprietario2} ruolo={'2. Eigentümer'} />
          </div>
        )}
        <div className='container'>
          {this.props.oggetto.downloadURLsCover && (
            <div className='grey lighten-4'>
              <div>
                <h1>Cover</h1>
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
                <h1>Bilder</h1>
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
                <h1>Grundriss</h1>
              </div>{' '}
            </div>
          )}
          {this.props.oggetto.downloadURLsGrundriss &&
            this.props.oggetto.downloadURLsGrundriss.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='container'>
          {this.props.oggetto.downloadURLsMap && (
            <div className='grey lighten-4'>
              <div>
                <h1>Map</h1>
              </div>{' '}
            </div>
          )}
          {this.props.oggetto.downloadURLsMap &&
            this.props.oggetto.downloadURLsMap.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        {this.props.oggetto.titolo.length > 0 && (
          <div className='container margine-basso'>
            <div className='grey lighten-4'>
              <div>
                <h1>Texte</h1>
              </div>
            </div>
            <div>{`Titolo: ${this.props.oggetto.titolo}`}</div>
            <div>{`Descrizione: ${this.props.oggetto.descrizione}`}</div>
            <div>{`Titel: ${this.props.oggetto.titoloDe}`}</div>
            <div>{`Beschreibung: ${this.props.oggetto.descrizioneDe}`}</div>
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

export default connect(mapStateToProps)(ViewOggettiPage);
