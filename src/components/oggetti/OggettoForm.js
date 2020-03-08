import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
  constructor(props) {
    super(props);
    this.state = {
      via: props.oggetto ? props.oggetto.via : '',
      numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
      cap: props.oggetto ? props.oggetto.cap : '',
      citta: props.oggetto ? props.oggetto.citta : '',
      quartiere: props.oggetto ? props.oggetto.quartiere : '',
      nazione: props.oggetto ? props.oggetto.nazione : '',
      numeroAppartamento: props.oggetto ? props.oggetto.numeroAppartamento : '',
      rifId: props.oggetto ? props.oggetto.rifId : '',
      amtsgericht: props.oggetto ? props.oggetto.amtsgericht : '',
      grundbuch: props.oggetto ? props.oggetto.grundbuch : '',
      grundbuchBlatt: props.oggetto ? props.oggetto.grundbuchBlatt : '',
      m2: props.oggetto ? props.oggetto.m2 : '',
      piano: props.oggetto ? props.oggetto.piano : '',
      mobilio: props.oggetto ? props.oggetto.mobilio : '',
      stato: props.oggetto ? props.oggetto.stato : '',
      wohngeld: props.oggetto
        ? (props.oggetto.wohngeld / 100).toString().replace(/\./, ',')
        : '0',
      kaufpreis: props.oggetto
        ? (props.oggetto.kaufpreis / 100).toString().replace(/\./, ',')
        : '0',
      affittoNetto: props.oggetto
        ? (props.oggetto.affittoNetto / 100).toString().replace(/\./, ',')
        : '0',
      verwalter: props.oggetto ? props.oggetto.verwalter : '',
      ruecklage: props.oggetto ? props.oggetto.ruecklage : '',
      proprietarioId: props.oggetto ? props.oggetto.proprietarioId : '',
      proprietarioId2: props.oggetto ? props.oggetto.proprietarioId2 : '',
      inquilinoId: props.oggetto ? props.oggetto.inquilinoId : '',
      visible: props.oggetto ? props.oggetto.visible : true,
      filenames: props.oggetto ? props.oggetto.filenames : '',
      downloadURLs: props.oggetto ? props.oggetto.downloadURLs : '',
      filenamesCover: props.oggetto ? props.oggetto.filenamesCover : '',
      downloadURLsCover: props.oggetto ? props.oggetto.downloadURLsCover : '',
      filenamesGrundriss: props.oggetto ? props.oggetto.filenamesGrundriss : '',
      downloadURLsGrundriss: props.oggetto
        ? props.oggetto.downloadURLsGrundriss
        : '',
      isUploading: false,
      uploadProgress: 0,
      titolo: props.oggetto ? props.oggetto.titolo : '',
      descrizione: props.oggetto ? props.oggetto.descrizione : '',
      titoloDe: props.oggetto ? props.oggetto.titoloDe : '',
      descrizioneDe: props.oggetto ? props.oggetto.descrizioneDe : '',
      titoloEn: props.oggetto ? props.oggetto.titoloEn : '',
      descrizioneEn: props.oggetto ? props.oggetto.descrizioneEn : '',
      vani: props.oggetto ? props.oggetto.vani : '',
      bagni: props.oggetto ? props.oggetto.bagni : '',
      balcone: props.oggetto ? props.oggetto.balcone : false,
      ascensore: props.oggetto ? props.oggetto.ascensore : false,
      giardino: props.oggetto ? props.oggetto.giardino : false,
      condizioni: props.oggetto ? props.oggetto.condizioni : '',
      cantina: props.oggetto ? props.oggetto.cantina : false,
      baujahr: props.oggetto ? props.oggetto.baujahr : '',
      energieAusweisTyp: props.oggetto ? props.oggetto.energieAusweisTyp : '',
      energieAusweisBis: props.oggetto ? props.oggetto.energieAusweisBis : '',
      heizungsart: props.oggetto ? props.oggetto.heizungsart : '',
      energieTraeger: props.oggetto ? props.oggetto.energieTraeger : '',
      energieBedarf: props.oggetto ? props.oggetto.energieBedarf : '',
      provvigione: props.oggetto ? props.oggetto.provvigione : '',
      note: props.oggetto ? props.oggetto.note : '',
      venduto: props.oggetto ? props.oggetto.venduto : false
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onMoneyChange = e => {
    const name = e.target.name;
    let value = e.target.value;
    value ? value : (value = '0');
    if (!value || value.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState({ [name]: value });
    }
  };
  onVerwalterChange = e => {
    const verwalter = e ? e.value : '';
    this.setState(() => ({ verwalter }));
  };
  onProprietarioChange = e => {
    const proprietarioId = e ? e.value : '';
    this.setState(() => ({ proprietarioId }));
  };
  onProprietarioChange2 = e => {
    const proprietarioId2 = e ? e.value : '';
    this.setState(() => ({ proprietarioId2 }));
  };
  onInquilinoChange = e => {
    const inquilinoId = e ? e.value : '';
    this.setState(() => ({ inquilinoId }));
  };
  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };
  handleUploadSuccessCover = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('cover')
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenamesCover: [...oldState.filenamesCover, filename],
      downloadURLsCover: [...oldState.downloadURLsCover, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  handleUploadSuccessGrundriss = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('grundriss')
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenamesGrundriss: [...oldState.filenamesGrundriss, filename],
      downloadURLsGrundriss: [...oldState.downloadURLsGrundriss, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  handleRemovePicture = picture => {
    console.log(picture);
    let downloadURLs = this.state.downloadURLs;
    let filenames = this.state.filenames;
    downloadURLs.splice(picture, 1);
    const removedFilename = filenames.splice(picture, 1);
    const [filename] = removedFilename;
    if (downloadURLs === undefined || downloadURLs.length < 1) {
      downloadURLs = '';
    }
    if (filenames === undefined || filenames.length < 1) {
      filenames = '';
    }
    this.setState(() => ({ downloadURLs, filenames }));
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .delete()
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleRemovePictureCover = picture => {
    console.log(picture);
    let downloadURLsCover = this.state.downloadURLsCover;
    let filenamesCover = this.state.filenamesCover;
    downloadURLsCover.splice(picture, 1);
    const removedFilename = filenamesCover.splice(picture, 1);
    const [filenameCover] = removedFilename;
    if (downloadURLsCover === undefined || downloadURLsCover.length < 1) {
      downloadURLsCover = '';
    }
    if (filenamesCover === undefined || filenamesCover.length < 1) {
      filenamesCover = '';
    }
    this.setState(() => ({ downloadURLsCover, filenamesCover }));
    firebase
      .storage()
      .ref('cover')
      .child(filenameCover)
      .delete()
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleRemovePictureGrundriss = picture => {
    console.log(picture);
    let downloadURLsGrundriss = this.state.downloadURLsGrundriss;
    let filenamesGrundriss = this.state.filenamesGrundriss;
    downloadURLsGrundriss.splice(picture, 1);
    const removedFilename = filenamesGrundriss.splice(picture, 1);
    const [filenameGrundriss] = removedFilename;
    if (
      downloadURLsGrundriss === undefined ||
      downloadURLsGrundriss.length < 1
    ) {
      downloadURLsGrundriss = '';
    }
    if (filenamesGrundriss === undefined || filenamesGrundriss.length < 1) {
      filenamesGrundriss = '';
    }
    this.setState(() => ({ downloadURLsGrundriss, filenamesGrundriss }));
    firebase
      .storage()
      .ref('grundriss')
      .child(filenameGrundriss)
      .delete()
      .then(() => {
        console.log('File deleted');
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const wohngeld =
      parseFloat(this.state.wohngeld.replace(/,/, '.'), 10) * 100;
    const affittoNetto =
      parseFloat(this.state.affittoNetto.replace(/,/, '.'), 10) * 100;
    const kaufpreis =
      parseFloat(this.state.kaufpreis.replace(/,/, '.'), 10) * 100;

    if (!this.state.via || !this.state.rifId) {
      this.setState(() => ({
        error: this.props.t('Inserisci indirizzo e Rif ID')
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        via: this.state.via,
        numeroCivico: this.state.numeroCivico,
        cap: this.state.cap,
        citta: this.state.citta,
        quartiere: this.state.quartiere,
        nazione: this.state.nazione,
        numeroAppartamento: this.state.numeroAppartamento,
        rifId: this.state.rifId,
        amtsgericht: this.state.amtsgericht,
        grundbuch: this.state.grundbuch,
        grundbuchBlatt: this.state.grundbuchBlatt,
        m2: this.state.m2,
        piano: this.state.piano,
        mobilio: this.state.mobilio,
        stato: this.state.stato,
        wohngeld,
        kaufpreis,
        affittoNetto,
        verwalter: this.state.verwalter,
        ruecklage: this.state.ruecklage,
        proprietarioId: this.state.proprietarioId,
        proprietarioId2: this.state.proprietarioId2,
        inquilinoId: this.state.inquilinoId,
        visible: this.state.visible,
        filenames: this.state.filenames,
        downloadURLs: this.state.downloadURLs,
        filenamesCover: this.state.filenamesCover,
        downloadURLsCover: this.state.downloadURLsCover,
        filenamesGrundriss: this.state.filenamesGrundriss,
        downloadURLsGrundriss: this.state.downloadURLsGrundriss,
        titolo: this.state.titolo,
        descrizione: this.state.descrizione,
        titoloDe: this.state.titoloDe,
        descrizioneDe: this.state.descrizioneDe,
        titoloEn: this.state.titoloEn,
        descrizioneEn: this.state.descrizioneEn,
        vani: this.state.vani,
        bagni: this.state.bagni,
        balcone: this.state.balcone,
        ascensore: this.state.ascensore,
        giardino: this.state.giardino,
        condizioni: this.state.condizioni,
        cantina: this.state.cantina,
        baujahr: this.state.baujahr,
        energieAusweisTyp: this.state.energieAusweisTyp,
        energieAusweisBis: this.state.energieAusweisBis,
        heizungsart: this.state.heizungsart,
        energieTraeger: this.state.energieTraeger,
        energieBedarf: this.state.energieBedarf,
        provvigione: this.state.provvigione,
        note: this.state.note,
        venduto: this.state.venduto
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

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
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
              <div className='input-field'>
                {t('Indirizzo')}:
                <input
                  name='via'
                  className={`input-field`}
                  type='text'
                  autoFocus
                  value={this.state.via}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                Nr.:
                <input
                  name='numeroCivico'
                  className={`input-field`}
                  type='text'
                  value={this.state.numeroCivico}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('CAP')}:
                <input
                  name='cap'
                  className={`input-field`}
                  type='text'
                  value={this.state.cap}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Quartiere')}:
                <input
                  name='quartiere'
                  className={`input-field`}
                  type='text'
                  value={this.state.quartiere}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Città')}:
                <input
                  name='citta'
                  className={`input-field`}
                  type='text'
                  value={this.state.citta}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Nazione')}:
                <input
                  name='nazione'
                  className={`input-field`}
                  type='text'
                  value={this.state.nazione}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Numero appartamento')}:
                <input
                  name='numeroAppartamento'
                  className={`input-field`}
                  type='text'
                  value={this.state.numeroAppartamento}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Rif')}. ID:
                <input
                  name='rifId'
                  className={`input-field`}
                  type='text'
                  value={this.state.rifId}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Pretura (Amtsgericht)')}:
                <input
                  name='amtsgericht'
                  className={`input-field`}
                  type='text'
                  value={this.state.amtsgericht}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Libro Fondiario (Grundbuch)')}:
                <input
                  name='grundbuch'
                  className={`input-field`}
                  type='text'
                  value={this.state.grundbuch}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Foglio')} Nr.:
                <input
                  name='grundbuchBlatt'
                  className={`input-field`}
                  type='text'
                  value={this.state.grundbuchBlatt}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                M2:
                <input
                  name='m2'
                  className={`input-field`}
                  type='text'
                  value={this.state.m2}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Piano')}:
                <input
                  name='piano'
                  className={`input-field`}
                  type='text'
                  value={this.state.piano}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Mobili')}:
              <textarea
                name='mobilio'
                className={`textarea`}
                placeholder={t('Mobili e valore')}
                value={this.state.mobilio}
                onChange={this.changeHandler}
              />
              <div className='input-field'>
                {t('Stato abitativo')}:
                <select
                  name='stato'
                  value={this.state.stato}
                  onChange={this.changeHandler}
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
                  value={this.state.wohngeld}
                  onChange={this.onMoneyChange}
                />
              </div>
              <div className='input-field'>
                {t('Fondo di accantonamento per manutenzione')}:
                <input
                  name='ruecklage'
                  className={`input-field`}
                  type='text'
                  placeholder='Gesamt oder anteilig?'
                  value={this.state.ruecklage}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Affitto netto')}:
                <input
                  name='affittoNetto'
                  className={`input-field`}
                  type='text'
                  value={this.state.affittoNetto}
                  onChange={this.onMoneyChange}
                />
              </div>
              <div className='input-field'>
                {t('Prezzo di vendita')}:
                <input
                  name='kaufpreis'
                  className={`input-field`}
                  type='text'
                  value={this.state.kaufpreis}
                  onChange={this.onMoneyChange}
                />
              </div>
              {t('Amministratore di condominio')}:
              <div className='section'>
                <Select
                  name='verwalter'
                  value={this.state.verwalter}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={this.onVerwalterChange}
                />
              </div>
              {t('Proprietario')}:
              <div className='section'>
                <Select
                  name='proprietarioId'
                  value={this.state.proprietarioId}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={this.onProprietarioChange}
                />
              </div>
              2. {t('Proprietario')}:
              <div className='section'>
                <Select
                  name='proprietarioId2'
                  value={this.state.proprietarioId2}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={this.onProprietarioChange2}
                />
              </div>
              {t('Inquilino')}:
              <div className='section'>
                <Select
                  name='inquilinoId'
                  value={this.state.inquilinoId}
                  options={options}
                  filterOptions={filterOptions}
                  onChange={this.onInquilinoChange}
                />
                <label>
                  <div className='input-field'></div>
                  <input
                    type='checkbox'
                    name='venduto'
                    checked={this.state.venduto}
                    onChange={() => {
                      this.setState(() => ({
                        venduto: !this.state.venduto
                      }));
                    }}
                  />
                  <span>{t('Venduto')}</span>
                </label>
              </div>
              <textarea
                name='note'
                className={`textarea text-input`}
                placeholder='Note'
                value={this.state.note}
                onChange={this.changeHandler}
              ></textarea>
              {this.props.utente.role === 'Admin' ? (
                <label>
                  <div className='input-field'></div>
                  <input
                    type='checkbox'
                    name='visible'
                    checked={this.state.visible}
                    onChange={() => {
                      this.setState(() => ({
                        visible: !this.state.visible
                      }));
                    }}
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
                  name='titolo'
                  className={`input-field`}
                  type='text'
                  placeholder='Titolo in italiano'
                  value={this.state.titolo}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('italiano')}:
              <textarea
                name='descrizione'
                className={`textarea`}
                placeholder='Descrizione in italiano'
                value={this.state.descrizione}
                onChange={this.changeHandler}
              />
              <div className='input-field'>
                {t('Titolo principale')} {t('tedesco')}:
                <input
                  name='titoloDe'
                  className={`input-field`}
                  type='text'
                  placeholder='Überschrift des Exposés'
                  value={this.state.titoloDe}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('tedesco')}:
              <textarea
                name='descrizioneDe'
                className={`textarea`}
                placeholder='Beschreibung'
                value={this.state.descrizioneDe}
                onChange={this.changeHandler}
              />
              <div className='input-field'>
                {t('Titolo principale')} {t('inglese')}:
                <input
                  name='titoloEn'
                  className={`input-field`}
                  type='text'
                  placeholder='English title'
                  value={this.state.titoloEn}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Descrizione')} {t('inglese')}:
              <textarea
                name='descrizioneEn'
                className={`textarea`}
                placeholder='English description'
                value={this.state.descrizioneEn}
                onChange={this.changeHandler}
              />
              <div className='input-field'>
                {t('Vani')}:
                <input
                  name='vani'
                  className={`input-field`}
                  type='text'
                  value={this.state.vani}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Bagni')}:
                <input
                  name='bagni'
                  className={`input-field`}
                  type='text'
                  value={this.state.bagni}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Condizioni immobile')}:
              <select
                name='condizioni'
                className='select select__form'
                value={this.state.condizioni}
                onChange={this.changeHandler}
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
                  value={this.state.baujahr}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Certificato energetico - tipologia')}:
              <select
                name='energieAusweisTyp'
                className='select select__form'
                value={this.state.energieAusweisTyp}
                onChange={this.changeHandler}
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
                  value={this.state.energieAusweisBis}
                  onChange={this.changeHandler}
                />
              </div>
              {t('Tipologia riscaldamento')}:
              <select
                name='heizungsart'
                className='select select__form'
                value={this.state.heizungsart}
                onChange={this.changeHandler}
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
                value={this.state.energieTraeger}
                onChange={this.changeHandler}
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
                  value={this.state.energieBedarf}
                  onChange={this.changeHandler}
                />
              </div>
              <div className='input-field'>
                {t('Provvigione')}:
                <input
                  name='provvigione'
                  className='input-field'
                  type='text'
                  placeholder={t('IVA inclusa')}
                  value={this.state.provvigione}
                  onChange={this.changeHandler}
                />
              </div>
              <div>
                <label>
                  <div className='input-field'>
                    <input
                      type='checkbox'
                      name='balcone'
                      checked={this.state.balcone}
                      onChange={() => {
                        this.setState(() => ({
                          balcone: !this.state.balcone
                        }));
                      }}
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
                      checked={this.state.ascensore}
                      onChange={() => {
                        this.setState(() => ({
                          ascensore: !this.state.ascensore
                        }));
                      }}
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
                      checked={this.state.giardino}
                      onChange={() => {
                        this.setState(() => ({
                          giardino: !this.state.giardino
                        }));
                      }}
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
                      checked={this.state.cantina}
                      onChange={() => {
                        this.setState(() => ({
                          cantina: !this.state.cantina
                        }));
                      }}
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
                    filename={() => `${this.state.rifId}-Cover}`}
                    storageRef={firebase.storage().ref('cover')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccessCover}
                    onProgress={this.handleProgress}
                    // multiple
                  />
                </label>
                <div>
                  {this.state.downloadURLsCover &&
                    this.state.downloadURLsCover.map((downloadURLCover, i) => {
                      return (
                        <span key={i}>
                          <img className='foto' src={downloadURLCover} />
                          <img
                            src='/images/trash.jpg'
                            className='cancella'
                            onClick={() => this.handleRemovePictureCover(i)}
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
                      `${this.state.rifId}-${Math.floor(
                        Math.random() * 100000
                      ).toString()}`
                    }
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                    multiple
                  />
                </label>
                <div>
                  {this.state.downloadURLs &&
                    this.state.downloadURLs.map((downloadURL, i) => {
                      return (
                        <span key={i}>
                          <img className='foto' src={downloadURL} />
                          <img
                            src='/images/trash.jpg'
                            className='cancella'
                            onClick={() => this.handleRemovePicture(i)}
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
                      `${this.state.rifId}-Grundriss-${Math.floor(
                        Math.random() * 100
                      ).toString()}`
                    }
                    storageRef={firebase.storage().ref('grundriss')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccessGrundriss}
                    onProgress={this.handleProgress}
                    multiple
                  />
                </label>
                <div>
                  {this.state.downloadURLsGrundriss &&
                    this.state.downloadURLsGrundriss.map(
                      (downloadURLGrundriss, i) => {
                        return (
                          <span key={i}>
                            <img className='foto' src={downloadURLGrundriss} />
                            <img
                              src='/images/trash.jpg'
                              className='cancella'
                              onClick={() =>
                                this.handleRemovePictureGrundriss(i)
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

export default connect(mapStateToProps)(withTranslation()(OggettoForm));
