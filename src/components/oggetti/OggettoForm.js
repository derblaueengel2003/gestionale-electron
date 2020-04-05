import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
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
    const { t } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- ${t('Ditta')} ${cliente.ditta}`}`
    }));
    const filterOptions = createFilterOptions({ options });

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
              {t('Tipo di immobile')}:
              <Select
                name={'tipologia'}
                value={this.props.data.tipologia}
                options={optionsTipologia}
                onChange={e =>
                  this.props.changeHandlerSelect('tipologia', e && e.value)
                }
              />
              <div className='input-field'>
                {t('Indirizzo')}:
                <input
                  name='via'
                  className={`input-field`}
                  type='text'
                  autoFocus
                  value={this.props.data.via}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                Nr.:
                <input
                  name='numeroCivico'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.numeroCivico}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('CAP')}:
                <input
                  name='capOggetto'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.capOggetto}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Quartiere')}:
                <input
                  name='quartiere'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.quartiere}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Città')}:
                <input
                  name='citta'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.citta}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Nazione')}:
                <input
                  name='nazioneOggetto'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.nazioneOggetto}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Numero appartamento')}:
                <input
                  name='numeroAppartamento'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.numeroAppartamento}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Rif')}. ID:
                <input
                  name='rifId'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.rifId}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Pretura (Amtsgericht)')}:
                <input
                  name='amtsgericht'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.amtsgericht}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Libro Fondiario (Grundbuch)')}:
                <input
                  name='grundbuch'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.grundbuch}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Foglio')} Nr.:
                <input
                  name='grundbuchBlatt'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.grundbuchBlatt}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                M2:
                <input
                  name='m2'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.m2}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Piano')}:
                <input
                  name='piano'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.piano}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Mobili')}:
              <textarea
                name='mobilio'
                className={`textarea`}
                placeholder={t('Mobili e valore')}
                value={this.props.data.mobilio}
                onChange={this.props.changeHandler}
              />
              <div className='input-field'>
                {t('Stato abitativo')}:
                <select
                  name='stato'
                  value={this.props.data.stato}
                  onChange={this.props.changeHandler}
                >
                  <option value=''></option>
                  <option value='leerstehend'>
                    {t('Non affittato, libero')}
                  </option>
                  <option value='vermietet'>{t('Affittato')}</option>
                </select>
              </div>
              <div className='input-field'>
                {t('Quota condominiale')}:
                <input
                  name='wohngeld'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.wohngeld}
                  onChange={this.props.changeHandlerValuta}
                />
              </div>
              <div className='input-field'>
                {t('Fondo di accantonamento per manutenzione')}:
                <input
                  name='ruecklage'
                  className={`input-field`}
                  type='text'
                  placeholder='Gesamt oder anteilig?'
                  value={this.props.data.ruecklage}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Affitto netto')}:
                <input
                  name='affittoNetto'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.affittoNetto}
                  onChange={this.props.changeHandlerValuta}
                />
              </div>
              <div className='input-field'>
                {t('Prezzo di vendita')}:
                <input
                  name='kaufpreis'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.kaufpreis}
                  onChange={this.props.changeHandlerValuta}
                />
              </div>
              {t('Amministratore di condominio')}:
              <div className='section'>
                <Select
                  name='verwalter'
                  value={this.props.data.verwalter}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={e =>
                    this.props.changeHandlerSelect('verwalter', e && e.value)
                  }
                />
              </div>
              {t('Proprietario')}:
              <div className='section'>
                <Select
                  name='proprietarioId'
                  value={this.props.data.proprietarioId}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={e =>
                    this.props.changeHandlerSelect(
                      'proprietarioId',
                      e && e.value
                    )
                  }
                />
              </div>
              2. {t('Proprietario')}:
              <div className='section'>
                <Select
                  name='proprietarioId2'
                  value={this.props.data.proprietarioId2}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={e =>
                    this.props.changeHandlerSelect(
                      'proprietarioId2',
                      e && e.value
                    )
                  }
                />
              </div>
              {t('Inquilino')}:
              <div className='section'>
                <Select
                  name='inquilinoId'
                  value={this.props.data.inquilinoId}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={e =>
                    this.props.changeHandlerSelect('inquilinoId', e && e.value)
                  }
                />
                <label>
                  <div className='input-field'></div>
                  <input
                    type='checkbox'
                    name='venduto'
                    checked={this.props.data.venduto}
                    onChange={this.props.changeCheckbox}
                  />
                  <span>{t('Venduto')}</span>
                </label>
              </div>
              <textarea
                name='noteOggetto'
                className={`textarea text-input`}
                placeholder='Note'
                value={this.props.data.noteOggetto}
                onChange={this.props.changeHandler}
              ></textarea>
              {this.props.utente.role === 'Admin' ? (
                <label>
                  <div className='input-field'></div>
                  <input
                    type='checkbox'
                    name='visibleOggetto'
                    checked={this.props.data.visibleOggetto}
                    onChange={this.props.changeCheckbox}
                  />
                  <span>{t('Visibile')}</span>
                </label>
              ) : (
                ''
              )}
            </div>
          </div>
          <div id='test2' className='col s12'>
            <div label='Exposé'>
              {/* Exposé */}
              <div className='input-field'>
                {t('Titolo principale')} {t('italiano')}:
                <input
                  name='titoloOggetto'
                  className={`input-field`}
                  type='text'
                  placeholder='Titolo in italiano'
                  value={this.props.data.titoloOggetto}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('italiano')}:
              <textarea
                name='descrizione'
                className={`textarea`}
                placeholder='Descrizione in italiano'
                value={this.props.data.descrizione}
                onChange={this.props.changeHandler}
              />
              <div className='input-field'>
                {t('Titolo principale')} {t('tedesco')}:
                <input
                  name='titoloDe'
                  className={`input-field`}
                  type='text'
                  placeholder='Überschrift des Exposés'
                  value={this.props.data.titoloDe}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('tedesco')}:
              <textarea
                name='descrizioneDe'
                className={`textarea`}
                placeholder='Beschreibung'
                value={this.props.data.descrizioneDe}
                onChange={this.props.changeHandler}
              />
              <div className='input-field'>
                {t('Titolo principale')} {t('inglese')}:
                <input
                  name='titoloEn'
                  className={`input-field`}
                  type='text'
                  placeholder='English title'
                  value={this.props.data.titoloEn}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('inglese')}:
              <textarea
                name='descrizioneEn'
                className={`textarea`}
                placeholder='English description'
                value={this.props.data.descrizioneEn}
                onChange={this.props.changeHandler}
              />
              <div className='input-field'>
                {t('Vani')}:
                <input
                  name='vani'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.vani}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Bagni')}:
                <input
                  name='bagni'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.bagni}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Condizioni immobile')}:
              <select
                name='condizioni'
                className='select select__form'
                value={this.props.data.condizioni}
                onChange={this.props.changeHandler}
              >
                <option value=''></option>
                <option value='neu'>{t('Come nuovo')}</option>
                <option value='gut'>{t('Buone condizioni')}</option>
                <option value='renovierungsbedürftig'>
                  {t('Da ristrutturare')}
                </option>
              </select>
              <div className='input-field'>
                {t('Anno di costruzione')}:
                <input
                  name='baujahr'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.baujahr}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Certificato energetico - tipologia')}:
              <select
                name='energieAusweisTyp'
                className='select select__form'
                value={this.props.data.energieAusweisTyp}
                onChange={this.props.changeHandler}
              >
                <option value=''></option>
                <option value='Verbrauchsausweis'>
                  {t('Basato sul consumo')}
                </option>
                <option value='Bedarfsausweis'>
                  {t('Basato sul fabbisogno')}
                </option>
              </select>
              <div className='input-field'>
                {t('Certificato energetico - valido fino al')}:
                <input
                  name='energieAusweisBis'
                  className={`input-field`}
                  type='text'
                  value={this.props.data.energieAusweisBis}
                  onChange={this.props.changeHandler}
                />
              </div>
              {t('Tipologia riscaldamento')}:
              <select
                name='heizungsart'
                className='select select__form'
                value={this.props.data.heizungsart}
                onChange={this.props.changeHandler}
              >
                <option value=''></option>
                <option value='Zentralheizung'>
                  {t('Riscaldamento centralizzato')}
                </option>
                <option value='Etagenheizung'>
                  {t('Riscaldamento autonomo')}
                </option>
              </select>
              {t('Fonte energetica')}:
              <select
                name='energieTraeger'
                className='select select__form'
                value={this.props.data.energieTraeger}
                onChange={this.props.changeHandler}
              >
                <option value=''></option>
                <option value='Erdgas'>{t('Gas')}</option>
                <option value='Öl'>{t('Olio combustibile')}</option>
                <option value='Fernwärme'>{t('Teleriscaldamento')}</option>
              </select>
              <div className='input-field'>
                {t('Consumo energetico in')} kWh/(m2*a):
                <input
                  name='energieBedarf'
                  className='input-field'
                  type='text'
                  value={this.props.data.energieBedarf}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Provvigione')}:
                <input
                  name='provvigione'
                  className='input-field'
                  type='text'
                  placeholder={t('IVA inclusa')}
                  value={this.props.data.provvigione}
                  onChange={this.props.changeHandler}
                />
              </div>
              <div>
                <label>
                  <div className='input-field'>
                    <input
                      type='checkbox'
                      name='balcone'
                      checked={this.props.data.balcone}
                      onChange={this.props.changeCheckbox}
                    />
                    <span>{t('Balcone')}</span>
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <div className='input-field'>
                    <input
                      type='checkbox'
                      name='ascensore'
                      checked={this.props.data.ascensore}
                      onChange={this.props.changeCheckbox}
                    />
                    <span>{t('Ascensore')}</span>
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <div className='input-field'>
                    <input
                      type='checkbox'
                      name='giardino'
                      checked={this.props.data.giardino}
                      onChange={this.props.changeCheckbox}
                    />
                    <span>{t('Giardino')}</span>
                  </div>
                </label>
              </div>
              <div>
                <label>
                  <div className='input-field'>
                    <input
                      type='checkbox'
                      name='cantina'
                      checked={this.props.data.cantina}
                      onChange={this.props.changeCheckbox}
                    />
                    <span>{t('Cantina')}</span>
                  </div>
                </label>
              </div>
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
