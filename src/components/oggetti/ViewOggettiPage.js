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
        <div>
          <div className='page-header page-header-oggetti'>
            <div className='content-container'>
              <h1 className='page-header__title'>Objekt</h1>
            </div>
          </div>
          <div className='content-container'>
            <div className='list-header list-header-oggetti'>
              <div className='show-for-mobile'>Details</div>
              <div className='show-for-desktop'>Details</div>
              <div className='show-for-desktop'></div>
            </div>
            <div className='list-body'>
              <div className='list-item'>
                <div>
                  {this.props.oggetto.via.length > 0 && (
                    <h3>{`${this.props.oggetto.via} ${this.props.oggetto.numeroCivico}, WE ${this.props.oggetto.numeroAppartamento}, ${this.props.oggetto.cap} ${this.props.oggetto.citta} ${this.props.oggetto.quartiere}`}</h3>
                  )}
                  {this.props.oggetto.rifId.length > 0 && (
                    <div>Ref. id: {this.props.oggetto.rifId}</div>
                  )}
                  {this.props.oggetto.kaufpreis > 0 && (
                    <div>{`Kaufpreis: ${numeral(
                      this.props.oggetto.kaufpreis / 100
                    ).format('0,0[.]00 $')}`}</div>
                  )}
                  {this.props.oggetto.amtsgericht.length > 0 && (
                    <div>Amtsgericht: {this.props.oggetto.amtsgericht}</div>
                  )}
                  {this.props.oggetto.grundbuch.length > 0 && (
                    <div>Grundbuch von {this.props.oggetto.grundbuch}</div>
                  )}
                  {this.props.oggetto.grundbuchBlatt.length > 0 && (
                    <div>Blatt Nr.: {this.props.oggetto.grundbuchBlatt}</div>
                  )}
                  {this.props.oggetto.ruecklage.length > 0 && (
                    <div>Rücklage: {this.props.oggetto.ruecklage}</div>
                  )}
                  {this.props.oggetto.baujahr.length > 0 && (
                    <div>{`Baujahr: ${this.props.oggetto.baujahr}`}</div>
                  )}
                  {this.props.oggetto.energieAusweisTyp.length > 0 && (
                    <div>{`Energieausweis-Typ: ${this.props.oggetto.energieAusweisTyp}`}</div>
                  )}
                  {this.props.oggetto.energieAusweisBis.length > 0 && (
                    <div>{`Gültig bis: ${this.props.oggetto.energieAusweisBis}`}</div>
                  )}
                  {this.props.oggetto.heizungsart.length > 0 && (
                    <div>{`Heizungsart: ${this.props.oggetto.heizungsart}`}</div>
                  )}
                  {this.props.oggetto.energieTraeger.length > 0 && (
                    <div>{`Enerigeträger: ${this.props.oggetto.energieTraeger}`}</div>
                  )}
                  {this.props.oggetto.energieBedarf.length > 0 && (
                    <div>{`Energiebedarf: ${this.props.oggetto.energieBedarf}`}</div>
                  )}
                </div>
                <div>
                  {this.props.oggetto.m2.length > 0 && (
                    <div>{`m2: ${this.props.oggetto.m2}`}</div>
                  )}
                  {this.props.oggetto.piano.length > 0 && (
                    <div>{`Etage: ${this.props.oggetto.piano}`}</div>
                  )}
                  {this.props.oggetto.stato.length > 0 && (
                    <div>{`Status: ${this.props.oggetto.stato}`}</div>
                  )}
                  {this.props.oggetto.affittoNetto > 0 && (
                    <div>{`Kaltmiete: ${numeral(
                      this.props.oggetto.affittoNetto / 100
                    ).format('0,0[.]00 $')}`}</div>
                  )}
                  {`Wohngeld: ${numeral(
                    this.props.oggetto.wohngeld / 100
                  ).format('0,0[.]00 $')}`}
                  {this.props.oggetto.vani.length > 0 && (
                    <div>{`Zimmer: ${this.props.oggetto.vani}`}</div>
                  )}
                  {this.props.oggetto.bagni.length > 0 && (
                    <div>{`Bad: ${this.props.oggetto.bagni}`}</div>
                  )}
                  {this.props.oggetto.balcone && <div>{`Balkon: ja`}</div>}
                  {this.props.oggetto.ascensore && <div>{`Aufzug: ja`}</div>}
                  {this.props.oggetto.giardino && <div>{`Garten: ja`}</div>}
                  {this.props.oggetto.cantina && <div>{`Keller: ja`}</div>}
                  {this.props.oggetto.condizioni.length > 0 && (
                    <div>{`Zustand: ${this.props.oggetto.condizioni}`}</div>
                  )}
                </div>
              </div>
            </div>
            <Link
              className='button button--secondary-oggetti'
              to={`/oggettoedit/${this.props.oggetto.id}`}
            >
              Objekt ändern
            </Link>
            <Link
              className='button button--secondary-leads'
              to={`/oggettomatchview/${this.props.oggetto.id}`}
            >
              Find a Match!
            </Link>
            {/* Se ho cover e titolo, mostro il pulsante exposé */}
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloDe.length > 0 && (
                <button
                  className='print button button--secondary-oggetti'
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
                  Exposé deutsch
                </button>
              )}
            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titolo.length > 0 && (
                <button
                  className='print button button--secondary-oggetti'
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
                  Exposé italienisch
                </button>
              )}

            {this.props.oggetto.downloadURLsCover &&
              this.props.oggetto.titoloEn.length > 0 && (
                <button
                  className='print button button--secondary-oggetti'
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
                  Exposé englisch
                </button>
              )}
            {!this.props.oggetto.downloadURLsCover ||
            this.props.oggetto.titolo.length < 1 ||
            this.props.oggetto.titoloDe.length < 1 ||
            this.props.oggetto.titoloEn.length < 1 ? (
              <div className='list-item__sub-title'>
                Um ein Exposé zu erstellen, fügen Sie wenigstens ein Cover-Bild
                und eine Überschrift hinzu
              </div>
            ) : (
              ''
            )}
          </div>
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
        <div className='content-container'>
          {this.props.oggetto.downloadURLsCover && (
            <div className='list-header list-header-oggetti'>Cover</div>
          )}
          {this.props.oggetto.downloadURLsCover &&
            this.props.oggetto.downloadURLsCover.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='content-container'>
          {this.props.oggetto.downloadURLs && (
            <div className='list-header list-header-oggetti'>Bilder</div>
          )}
          {this.props.oggetto.downloadURLs &&
            this.props.oggetto.downloadURLs.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>

        <div className='content-container'>
          {this.props.oggetto.downloadURLsGrundriss && (
            <div className='list-header list-header-oggetti'>Grundriss</div>
          )}
          {this.props.oggetto.downloadURLsGrundriss &&
            this.props.oggetto.downloadURLsGrundriss.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        <div className='content-container'>
          {this.props.oggetto.downloadURLsMap && (
            <div className='list-header list-header-oggetti'>Map</div>
          )}
          {this.props.oggetto.downloadURLsMap &&
            this.props.oggetto.downloadURLsMap.map((downloadURL, i) => {
              return <img className='foto' key={i} src={downloadURL} />;
            })}
        </div>
        {this.props.oggetto.titolo.length > 0 && (
          <div className='content-container'>
            <div className='list-header list-header-oggetti'>Texte</div>
            <div className='list-item__sub-title'>{`Titolo: ${this.props.oggetto.titolo}`}</div>
            <div className='list-item__sub-title'>{`Descrizione: ${this.props.oggetto.descrizione}`}</div>
            <div className='list-item__sub-title'>{`Titel: ${this.props.oggetto.titoloDe}`}</div>
            <div className='list-item__sub-title'>{`Beschreibung: ${this.props.oggetto.descrizioneDe}`}</div>
            <div className='list-item__sub-title'>{`Title: ${this.props.oggetto.titoloEn}`}</div>
            <div className='list-item__sub-title'>{`Description: ${this.props.oggetto.descrizioneEn}`}</div>
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
