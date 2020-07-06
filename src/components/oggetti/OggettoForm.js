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
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { oggetti } = this.props.data;

    const wohngeld = parseFloat(oggetti.wohngeld.replace(/,/, '.'), 10) * 100;
    const affittoNetto =
      parseFloat(oggetti.affittoNetto.replace(/,/, '.'), 10) * 100;
    const kaufpreis = parseFloat(oggetti.kaufpreis.replace(/,/, '.'), 10) * 100;

    if (!oggetti.via || !oggetti.rifId) {
      this.props.renderError(this.props.t('property_form_submit_error'));
    } else {
      this.props.renderError('');

      this.props.onSubmit({
        cloudURL: oggetti.cloudURL,
        via: oggetti.via,
        numeroCivico: oggetti.numeroCivico,
        cap: oggetti.cap,
        citta: oggetti.citta,
        quartiere: oggetti.quartiere,
        nazione: oggetti.nazione,
        numeroAppartamento: oggetti.numeroAppartamento,
        rifId: oggetti.rifId,
        amtsgericht: oggetti.amtsgericht,
        grundbuch: oggetti.grundbuch,
        grundbuchBlatt: oggetti.grundbuchBlatt,
        m2: oggetti.m2,
        piano: oggetti.piano,
        mobilio: oggetti.mobilio,
        stato: oggetti.stato,
        wohngeld,
        kaufpreis,
        affittoNetto,
        verwalter: oggetti.verwalter,
        ruecklage: oggetti.ruecklage,
        proprietarioId: oggetti.proprietarioId,
        proprietarioId2: oggetti.proprietarioId2,
        inquilinoId: oggetti.inquilinoId,
        visible: oggetti.visible,
        filenames: oggetti.filenames,
        downloadURLs: oggetti.downloadURLs,
        filenamesCover: oggetti.filenamesCover,
        downloadURLsCover: oggetti.downloadURLsCover,
        filenamesGrundriss: oggetti.filenamesGrundriss,
        downloadURLsGrundriss: oggetti.downloadURLsGrundriss,
        titolo: oggetti.titolo,
        descrizione: oggetti.descrizione,
        titoloDe: oggetti.titoloDe,
        descrizioneDe: oggetti.descrizioneDe,
        titoloEn: oggetti.titoloEn,
        descrizioneEn: oggetti.descrizioneEn,
        vani: oggetti.vani,
        bagni: oggetti.bagni,
        balcone: oggetti.balcone,
        ascensore: oggetti.ascensore,
        giardino: oggetti.giardino,
        condizioni: oggetti.condizioni,
        cantina: oggetti.cantina,
        baujahr: oggetti.baujahr,
        energieAusweisTyp: oggetti.energieAusweisTyp,
        energieAusweisBis: oggetti.energieAusweisBis,
        heizungsart: oggetti.heizungsart,
        energieTraeger: oggetti.energieTraeger,
        energieBedarf: oggetti.energieBedarf,
        provvigione: oggetti.provvigione,
        note: oggetti.note,
        venduto: oggetti.venduto,
        tipologia: oggetti.tipologia,
        dataInserimentoOggetto: oggetti.dataInserimentoOggetto
          ? oggetti.dataInserimentoOggetto.valueOf()
          : null,
        dataModificaOggetto: oggetti.dataModificaOggetto
          ? oggetti.dataModificaOggetto.valueOf()
          : null,
      });
    }
  };
  render() {
    const { oggetti } = this.props.data;

    const {
      t,
      renderTextArea,
      renderCheckbox,
      renderSelect,
      renderInput,
      changeHandlerValuta,
    } = this.props;

    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- ${t('company')} ${cliente.ditta}`
      }`,
    }));

    const optionsTipologia = [
      'property_apt',
      'property_commercial',
      'property_nursing_home',
      'property_other',
    ].map((dealType) => ({
      value: dealType,
      label: t(dealType),
    }));
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}{' '}
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        <div className='row'>
          <div className='col s12'>
            <ul
              ref={(Tabs) => {
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
                'oggetti',
                'tipologia',
                optionsTipologia,
                t('Tipo di immobile')
              )}
              {renderInput(
                'oggetti',
                'via',
                t('address'),
                undefined,
                undefined,
                undefined,
                undefined,
                '*'
              )}
              {renderInput('oggetti', 'numeroCivico', 'Nr.')}
              {renderInput('oggetti', 'cap', t('zipcode'))}
              {renderInput('oggetti', 'quartiere', t('Quartiere'))}
              {renderInput('oggetti', 'citta', t('city'))}
              {renderInput('oggetti', 'nazione', t('nation'))}
              {renderInput(
                'oggetti',
                'numeroAppartamento',
                t('Numero appartamento')
              )}
              {renderInput(
                'oggetti',
                'rifId',
                t('Rif') + '. ID',
                undefined,
                undefined,
                undefined,
                undefined,
                '*'
              )}
              {renderInput(
                'oggetti',
                'amtsgericht',
                t('Pretura (Amtsgericht)')
              )}
              {renderInput(
                'oggetti',
                'grundbuch',
                t('Libro Fondiario (Grundbuch)')
              )}
              {renderInput('oggetti', 'grundbuchBlatt', t('Foglio'))}
              {renderInput('oggetti', 'm2', 'M2')}
              {renderInput('oggetti', 'piano', t('Piano'))}
              {renderTextArea('oggetti', 'mobilio', t('Mobili e valore'))}
              {renderSelect(
                'oggetti',
                'stato',
                [
                  { value: 'vacant', label: t('vacant') },
                  { value: 'rented', label: t('rented') },
                ],
                t('Stato abitativo')
              )}
              {renderInput(
                'oggetti',
                'wohngeld',
                t('Quota condominiale'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'oggetti',
                'ruecklage',
                t('Fondo di accantonamento per manutenzione'),
                undefined,
                undefined,
                undefined,
                'Gesamt oder anteilig?'
              )}
              {renderInput(
                'oggetti',
                'affittoNetto',
                t('Affitto netto'),
                'text',
                changeHandlerValuta
              )}
              {renderInput(
                'oggetti',
                'kaufpreis',
                t('Prezzo di vendita'),
                'text',
                changeHandlerValuta
              )}
              {renderSelect(
                'oggetti',
                'verwalter',
                options,
                t('Amministratore di condominio')
              )}
              {renderSelect(
                'oggetti',
                'proprietarioId',
                options,
                t('Proprietario')
              )}
              {renderSelect(
                'oggetti',
                'proprietarioId2',
                options,
                '2. ' + t('Proprietario')
              )}
              {renderSelect('oggetti', 'inquilinoId', options, t('Inquilino'))}
              {renderInput(
                'oggetti',
                'cloudURL',
                'Cloud URL',
                undefined,
                undefined,
                undefined,
                'http://www...'
              )}
              {renderTextArea('oggetti', 'note')}
              {renderCheckbox('oggetti', 'venduto', t('Venduto'))}

              {this.props.utente && this.props.utente.role === 'Admin'
                ? renderCheckbox('oggetti', 'visible', t('visible'))
                : ''}
            </div>
          </div>
          <div id='test2' className='col s12'>
            <div label='Exposé'>
              {/* Exposé */}
              {renderInput(
                'oggetti',
                'titolo',
                `${t('Titolo principale')} ${t('italiano')}`,
                undefined,
                undefined,
                undefined,
                'Titolo in italiano'
              )}
              {renderTextArea(
                'oggetti',
                'descrizione',
                `${t('Descrizione')} ${t('italiano')}`
              )}
              {renderInput(
                'oggetti',
                'titoloDe',
                `${t('Titolo principale')} ${t('tedesco')}`,
                undefined,
                undefined,
                undefined,
                'Überschrift des Exposés'
              )}
              {renderTextArea(
                'oggetti',
                'descrizioneDe',
                `${t('Descrizione')} ${t('tedesco')}`
              )}
              {renderInput(
                'oggetti',
                'titoloEn',
                `${t('Titolo principale')} ${t('inglese')}`,
                undefined,
                undefined,
                undefined,
                'English title'
              )}
              {renderTextArea(
                'oggetti',
                'descrizioneEn',
                `${t('Descrizione')} ${t('inglese')}`
              )}
              {renderInput('oggetti', 'vani', t('Vani'))}
              {renderInput('oggetti', 'bagni', t('Bagni'))}
              {renderSelect(
                'oggetti',
                'condizioni',
                [
                  { value: 'new', label: t('new') },
                  { value: 'good', label: t('good') },
                  {
                    value: 'to_renovate',
                    label: t('to_renovate'),
                  },
                ],
                t('property_condition')
              )}
              {renderInput('oggetti', 'baujahr', t('Anno di costruzione'))}
              {renderSelect(
                'oggetti',
                'energieAusweisTyp',
                [
                  {
                    value: 'based_on_consumption',
                    label: t('based_on_consumption'),
                  },
                  {
                    value: 'based_on_requirement',
                    label: t('based_on_requirement'),
                  },
                ],
                t('Certificato energetico - tipologia')
              )}
              {renderInput(
                'oggetti',
                'energieAusweisBis',
                t('Certificato energetico - valido fino al')
              )}
              {renderSelect(
                'oggetti',
                'heizungsart',
                [
                  {
                    value: 'heating_central',
                    label: t('heating_central'),
                  },
                  {
                    value: 'heating_floor',
                    label: t('heating_floor'),
                  },
                ],
                t('Tipologia riscaldamento')
              )}
              {renderSelect(
                'oggetti',
                'energieTraeger',
                [
                  {
                    value: 'heating_gas',
                    label: t('heating_gas'),
                  },
                  {
                    value: 'heating_oil',
                    label: t('heating_oil'),
                  },
                  {
                    value: 'heating_district',
                    label: t('heating_district'),
                  },
                ],
                t('Fonte energetica')
              )}

              {renderInput(
                'oggetti',
                'energieBedarf',
                t('energy_consumption_kwh')
              )}
              {renderInput(
                'oggetti',
                'provvigione',
                t('Provvigione'),
                undefined,
                undefined,
                undefined,
                t('IVA inclusa')
              )}
              {renderCheckbox('oggetti', 'balcone', t('Balcone'))}
              {renderCheckbox('oggetti', 'ascensore', t('Ascensore'))}
              {renderCheckbox('oggetti', 'giardino', t('Giardino'))}
              {renderCheckbox('oggetti', 'cantina', t('Cantina'))}
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
                    filename={() => `${oggetti.rifId}-Cover`}
                    storageRef={firebase.storage().ref('cover')}
                    onUploadStart={this.props.handleUploadStart}
                    onUploadError={this.props.handleUploadError}
                    onUploadSuccess={this.props.handleUploadSuccessCover}
                    onProgress={this.props.handleProgress}
                    // multiple
                  />
                </label>
                <div>
                  {oggetti.downloadURLsCover &&
                    oggetti.downloadURLsCover.map((downloadURLCover, i) => {
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
                    })}
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
                      `${oggetti.rifId}-${Math.floor(
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
                  {oggetti.downloadURLs &&
                    oggetti.downloadURLs.map((downloadURL, i) => {
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
                      `${oggetti.rifId}-Grundriss-${Math.floor(
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
                  {oggetti.downloadURLsGrundriss &&
                    oggetti.downloadURLsGrundriss.map(
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

const mapStateToProps = (state) => ({
  clienti: state.clienti,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(OggettoForm))
);
