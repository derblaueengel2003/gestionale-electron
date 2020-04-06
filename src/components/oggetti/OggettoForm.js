import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import M from 'materialize-css';

export class OggettoForm extends React.Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
    M.AutoInit();
  }

  onSubmit = e => {
    e.preventDefault();
    const wohngeld =
      parseFloat(this.props.data.wohngeld.replace(/,/, '.'), 10) * 100;
    const affittoNetto =
      parseFloat(this.props.data.affittoNetto.replace(/,/, '.'), 10) * 100;
    const kaufpreis =
      parseFloat(this.props.data.kaufpreis.replace(/,/, '.'), 10) * 100;

    if (!this.props.data.via || !this.props.data.rifId) {
      this.setState(() => ({
        error: this.props.t('Inserisci indirizzo e Rif ID')
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        via: this.props.data.via,
        numeroCivico: this.props.data.numeroCivico,
        cap: this.props.data.capOggetto,
        citta: this.props.data.citta,
        quartiere: this.props.data.quartiere,
        nazione: this.props.data.nazioneOggetto,
        numeroAppartamento: this.props.data.numeroAppartamento,
        rifId: this.props.data.rifId,
        amtsgericht: this.props.data.amtsgericht,
        grundbuch: this.props.data.grundbuch,
        grundbuchBlatt: this.props.data.grundbuchBlatt,
        m2: this.props.data.m2,
        piano: this.props.data.piano,
        mobilio: this.props.data.mobilio,
        stato: this.props.data.stato,
        wohngeld,
        kaufpreis,
        affittoNetto,
        verwalter: this.props.data.verwalter,
        ruecklage: this.props.data.ruecklage,
        proprietarioId: this.props.data.proprietarioId,
        proprietarioId2: this.props.data.proprietarioId2,
        inquilinoId: this.props.data.inquilinoId,
        visible: this.props.data.visibleOggetto,
        filenames: this.props.data.filenames,
        downloadURLs: this.props.data.downloadURLs,
        filenamesCover: this.props.data.filenamesCover,
        downloadURLsCover: this.props.data.downloadURLsCover,
        filenamesGrundriss: this.props.data.filenamesGrundriss,
        downloadURLsGrundriss: this.props.data.downloadURLsGrundriss,
        titolo: this.props.data.titoloOggetto,
        descrizione: this.props.data.descrizione,
        titoloDe: this.props.data.titoloDe,
        descrizioneDe: this.props.data.descrizioneDe,
        titoloEn: this.props.data.titoloEn,
        descrizioneEn: this.props.data.descrizioneEn,
        vani: this.props.data.vani,
        bagni: this.props.data.bagni,
        balcone: this.props.data.balcone,
        ascensore: this.props.data.ascensore,
        giardino: this.props.data.giardino,
        condizioni: this.props.data.condizioni,
        cantina: this.props.data.cantina,
        baujahr: this.props.data.baujahr,
        energieAusweisTyp: this.props.data.energieAusweisTyp,
        energieAusweisBis: this.props.data.energieAusweisBis,
        heizungsart: this.props.data.heizungsart,
        energieTraeger: this.props.data.energieTraeger,
        energieBedarf: this.props.data.energieBedarf,
        provvigione: this.props.data.provvigione,
        note: this.props.data.noteOggetto,
        venduto: this.props.data.venduto,
        tipologia: this.props.data.tipologia
      });
    }
  };
  render() {
    const {
      t,
      renderTextArea,
      renderCheckbox,
      renderSelect,
      renderInput,
      changeHandlerValuta
    } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- ${t('Ditta')} ${cliente.ditta}`}`
    }));

    const optionsTipologia = [
      'Eigentumswohnung',
      'Gewerbe',
      'Pflegeheim',
      'Sonstiges'
    ].map(dealType => ({
      value: dealType,
      label: t(dealType)
    }));
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        <div className='row'>
          <div className='col s12'>
            <ul
              ref={Tabs => {
                this.Tabs = Tabs;
              }}
              className='tabs'
            >
              <li className='tab col s4'>
                <a className='active' href='#test1'>
                  {t('Dati principali')}
                </a>
              </li>
              <li className='tab col s4'>
                <a href='#test2'>Exposé</a>
              </li>
              <li className='tab col s4'>
                <a href='#test3'>{t('Immagini')}</a>
              </li>
            </ul>
          </div>
          <div id='test1' className='col s12'>
            <div label='Eckdaten'>
              {renderSelect(
                'tipologia',
                optionsTipologia,
                t('Tipo di immobile')
              )}
              {renderInput('via', t('Indirizzo'))}
              {renderInput('numeroCivico', 'Nr.')}
              {renderInput('capOggetto', t('CAP'))}
              {renderInput('quartiere', t('Quartiere'))}
              {renderInput('citta', t('Città'))}
              {renderInput('nazioneOggetto', t('Nazione'))}
              {renderInput('numeroAppartamento', t('Numero appartamento'))}
              {renderInput('rifId', t('Rif') + '. ID')}
              {renderInput('amtsgericht', t('Pretura (Amtsgericht)'))}
              {renderInput('grundbuch', t('Libro Fondiario (Grundbuch)'))}
              {renderInput('grundbuchBlatt', t('Foglio'))}
              {renderInput('m2', 'M2')}
              {renderInput('piano', t('Piano'))}
              {renderTextArea('mobilio', t('Mobili e valore'))}
              {renderSelect(
                'stato',
                [
                  { value: 'leerstehend', label: t('Non affittato, libero') },
                  { value: 'vermietet', label: t('Affittato') }
                ],
                t('Stato abitativo')
              )}
              {renderInput(
                'wohngeld',
                t('Quota condominiale'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'ruecklage',
                t('Fondo di accantonamento per manutenzione'),
                undefined,
                undefined,
                undefined,
                'Gesamt oder anteilig?'
              )}
              {renderInput(
                'affittoNetto',
                t('Affitto netto'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'kaufpreis',
                t('Prezzo di vendita'),
                'text',
                changeHandlerValuta
              )}
              {renderSelect(
                'verwalter',
                options,
                t('Amministratore di condominio')
              )}
              {renderSelect('proprietarioId', options, t('Proprietario'))}
              {renderSelect(
                'proprietarioId2',
                options,
                '2. ' + t('Proprietario')
              )}
              {renderSelect('inquilinoId', options, t('Inquilino'))}
              {renderTextArea('noteOggetto')}
              {renderCheckbox('venduto', t('Venduto'))}

              {this.props.utente.role === 'Admin'
                ? renderCheckbox('visibleOggetto', t('Visibile'))
                : ''}
            </div>
          </div>
          <div id='test2' className='col s12'>
            <div label='Exposé'>
              {/* Exposé */}
              {renderInput(
                'titoloOggetto',
                `${t('Titolo principale')} ${t('italiano')}`,
                undefined,
                undefined,
                undefined,
                'Titolo in italiano'
              )}
              {renderTextArea(
                'descrizione',
                `${t('Descrizione')} ${t('italiano')}`
              )}
              {renderInput(
                'titoloDe',
                `${t('Titolo principale')} ${t('tedesco')}`,
                undefined,
                undefined,
                undefined,
                'Überschrift des Exposés'
              )}
              {renderTextArea(
                'descrizioneDe',
                `${t('Descrizione')} ${t('tedesco')}`
              )}
              {renderInput(
                'titoloEn',
                `${t('Titolo principale')} ${t('inglese')}`,
                undefined,
                undefined,
                undefined,
                'English title'
              )}
              {renderTextArea(
                'descrizioneEn',
                `${t('Descrizione')} ${t('inglese')}`
              )}
              {renderInput('vani', t('Vani'))}
              {renderInput('bagni', t('Bagni'))}
              {renderSelect(
                'condizioni',
                [
                  { value: 'neu', label: t('Come nuovo') },
                  { value: 'gut', label: t('Buone condizioni') },
                  {
                    value: 'renovierungsbedürftig',
                    label: t('Da ristrutturare')
                  }
                ],
                t('Condizioni immobile')
              )}
              {renderInput('baujahr', t('Anno di costruzione'))}
              {renderSelect(
                'energieAusweisTyp',
                [
                  {
                    value: 'Verbrauchsausweis',
                    label: t('Basato sul consumo')
                  },
                  {
                    value: 'Bedarfsausweis',
                    label: t('Basato sul fabbisogno')
                  }
                ],
                t('Certificato energetico - tipologia')
              )}
              {renderInput(
                'energieAusweisBis',
                t('Certificato energetico - valido fino al')
              )}
              {renderSelect(
                'heizungsart',
                [
                  {
                    value: 'Zentralheizung',
                    label: t('Riscaldamento centralizzato')
                  },
                  {
                    value: 'Etagenheizung',
                    label: t('Riscaldamento autonomo')
                  }
                ],
                t('Tipologia riscaldamento')
              )}
              {renderSelect(
                'energieTraeger',
                [
                  {
                    value: 'Erdgas',
                    label: t('Gas')
                  },
                  {
                    value: 'Öl',
                    label: t('Olio combustibile')
                  },
                  {
                    value: 'Fernwärme',
                    label: t('Teleriscaldamento')
                  }
                ],
                t('Fonte energetica')
              )}

              {renderInput(
                'energieBedarf',
                t('Consumo energetico in' + ' KWh/(m2*a)')
              )}
              {renderInput(
                'provvigione',
                t('Provvigione'),
                undefined,
                undefined,
                undefined,
                t('IVA inclusa')
              )}
              {renderCheckbox('balcone', t('Balcone'))}
              {renderCheckbox('ascensore', t('Ascensore'))}
              {renderCheckbox('giardino', t('Giardino'))}
              {renderCheckbox('cantina', t('Cantina'))}
            </div>
          </div>
          <div id='test3' className='col s12'>
            <ul className='collection'>
              {/* Cover */}
              <li className='collection-item'>
                {t('Scegli immagine di copertina')}
                <label className='secondary-content'>
                  {' '}
                  <i className='material-icons'>add_photo_alternate</i>
                  <FileUploader
                    hidden
                    accept='image/*'
                    name='image-uploader-multiple'
                    // randomizeFilename
                    filename={() => `${this.props.data.rifId}-Cover}`}
                    storageRef={firebase.storage().ref('cover')}
                    onUploadStart={this.props.handleUploadStart}
                    onUploadError={this.props.handleUploadError}
                    onUploadSuccess={this.props.handleUploadSuccessCover}
                    onProgress={this.props.handleProgress}
                    // multiple
                  />
                </label>
                <div>
                  {this.props.data.downloadURLsCover &&
                    this.props.data.downloadURLsCover.map(
                      (downloadURLCover, i) => {
                        return (
                          <span key={i}>
                            <img className='foto' src={downloadURLCover} />
                            <img
                              src='/images/trash.jpg'
                              className='cancella'
                              onClick={() =>
                                this.props.handleRemovePictureCover(i)
                              }
                            />
                          </span>
                        );
                      }
                    )}
                </div>
              </li>
              {/* Bilder */}
              <li className='collection-item'>
                {t('Scegli immagini')}
                <label className='secondary-content'>
                  <i className='material-icons'>add_photo_alternate</i>

                  <FileUploader
                    hidden
                    accept='image/*'
                    name='image-uploader-multiple'
                    // randomizeFilename
                    filename={() =>
                      `${this.props.data.rifId}-${Math.floor(
                        Math.random() * 100000
                      ).toString()}`
                    }
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.props.handleUploadStart}
                    onUploadError={this.props.handleUploadError}
                    onUploadSuccess={this.props.handleUploadSuccess}
                    onProgress={this.props.handleProgress}
                    multiple
                  />
                </label>
                <div>
                  {this.props.data.downloadURLs &&
                    this.props.data.downloadURLs.map((downloadURL, i) => {
                      return (
                        <span key={i}>
                          <img className='foto' src={downloadURL} />
                          <img
                            src='/images/trash.jpg'
                            className='cancella'
                            onClick={() => this.props.handleRemovePicture(i)}
                          />
                        </span>
                      );
                    })}
                </div>
              </li>
              {/* Grundriss */}
              <li className='collection-item'>
                {t('Scegli planimetria')}
                <label className='secondary-content'>
                  <i className='material-icons'>add_photo_alternate</i>

                  <FileUploader
                    hidden
                    accept='image/*'
                    name='image-uploader-multiple'
                    // randomizeFilename
                    filename={() =>
                      `${this.props.data.rifId}-Grundriss-${Math.floor(
                        Math.random() * 100
                      ).toString()}`
                    }
                    storageRef={firebase.storage().ref('grundriss')}
                    onUploadStart={this.props.handleUploadStart}
                    onUploadError={this.props.handleUploadError}
                    onUploadSuccess={this.props.handleUploadSuccessGrundriss}
                    onProgress={this.props.handleProgress}
                    multiple
                  />
                </label>
                <div>
                  {this.props.data.downloadURLsGrundriss &&
                    this.props.data.downloadURLsGrundriss.map(
                      (downloadURLGrundriss, i) => {
                        return (
                          <span key={i}>
                            <img className='foto' src={downloadURLGrundriss} />
                            <img
                              src='/images/trash.jpg'
                              className='cancella'
                              onClick={() =>
                                this.props.handleRemovePictureGrundriss(i)
                              }
                            />
                          </span>
                        );
                      }
                    )}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  clienti: state.clienti,
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(OggettoForm))
);
