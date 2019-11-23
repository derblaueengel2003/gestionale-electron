import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import Tabs from '../Tabs';

export class OggettoForm extends React.Component {
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
      visible: props.oggetto ? props.oggetto.visible : true,
      filenames: props.oggetto ? props.oggetto.filenames : '',
      downloadURLs: props.oggetto ? props.oggetto.downloadURLs : '',
      filenamesCover: props.oggetto ? props.oggetto.filenamesCover : '',
      downloadURLsCover: props.oggetto ? props.oggetto.downloadURLsCover : '',
      filenamesMap: props.oggetto ? props.oggetto.filenamesMap : '',
      downloadURLsMap: props.oggetto ? props.oggetto.downloadURLsMap : '',
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
      provvigione: props.oggetto ? props.oggetto.provvigione : ''
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
  handleUploadSuccessMap = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref('map')
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenamesMap: [...oldState.filenamesMap, filename],
      downloadURLsMap: [...oldState.downloadURLsMap, downloadURL],
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
  handleRemovePictureMap = picture => {
    console.log(picture);
    let downloadURLsMap = this.state.downloadURLsMap;
    let filenamesMap = this.state.filenamesMap;
    downloadURLsMap.splice(picture, 1);
    const removedFilename = filenamesMap.splice(picture, 1);
    const [filenameMap] = removedFilename;
    if (downloadURLsMap === undefined || downloadURLsMap.length < 1) {
      downloadURLsMap = '';
    }
    if (filenamesMap === undefined || filenamesMap.length < 1) {
      filenamesMap = '';
    }
    this.setState(() => ({ downloadURLsMap, filenamesMap }));
    firebase
      .storage()
      .ref('map')
      .child(filenameMap)
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
        error: 'Bitte Adresse und Ref.Id eingeben'
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
        visible: this.state.visible,
        filenames: this.state.filenames,
        downloadURLs: this.state.downloadURLs,
        filenamesCover: this.state.filenamesCover,
        downloadURLsCover: this.state.downloadURLsCover,
        filenamesGrundriss: this.state.filenamesGrundriss,
        downloadURLsGrundriss: this.state.downloadURLsGrundriss,
        filenamesMap: this.state.filenamesMap,
        downloadURLsMap: this.state.downloadURLsMap,
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
        provvigione: this.state.provvigione
      });
    }
  };
  render() {
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));
    const filterOptions = createFilterOptions({ options });

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <Tabs>
          <div label='Eckdaten'>
            Adresse:
            <input
              name='via'
              className={`text-input`}
              type='text'
              placeholder='Adresse'
              autoFocus
              value={this.state.via}
              onChange={this.changeHandler}
            />
            Nr.:
            <input
              name='numeroCivico'
              className={`text-input`}
              type='text'
              placeholder='Straßennummer'
              value={this.state.numeroCivico}
              onChange={this.changeHandler}
            />
            PLZ:
            <input
              name='cap'
              className={`text-input`}
              type='text'
              placeholder='Postleitzahl'
              value={this.state.cap}
              onChange={this.changeHandler}
            />
            Bezirk:
            <input
              name='quartiere'
              className={`text-input`}
              type='text'
              placeholder='Bezirk'
              value={this.state.quartiere}
              onChange={this.changeHandler}
            />
            Stadt:
            <input
              name='citta'
              className={`text-input`}
              type='text'
              placeholder='Stadt'
              value={this.state.citta}
              onChange={this.changeHandler}
            />
            Staat:
            <input
              name='nazione'
              className={`text-input`}
              type='text'
              placeholder='Staat'
              value={this.state.nazione}
              onChange={this.changeHandler}
            />
            Wohnungsnummer:
            <input
              name='numeroAppartamento'
              className={`text-input`}
              type='text'
              placeholder='WE Nummer'
              value={this.state.numeroAppartamento}
              onChange={this.changeHandler}
            />
            Ref. Id:
            <input
              name='rifId'
              className={`text-input`}
              type='text'
              placeholder='Ref. Id'
              value={this.state.rifId}
              onChange={this.changeHandler}
            />
            Amtsgericht:
            <input
              name='amtsgericht'
              className={`text-input`}
              type='text'
              placeholder='amtsgericht'
              value={this.state.amtsgericht}
              onChange={this.changeHandler}
            />
            Grundbuch:
            <input
              name='grundbuch'
              className={`text-input`}
              type='text'
              placeholder='Grundbuch von'
              value={this.state.grundbuch}
              onChange={this.changeHandler}
            />
            GB Blatt Nr.:
            <input
              name='grundbuchBlatt'
              className={`text-input`}
              type='text'
              placeholder='Blatt Nr.'
              value={this.state.grundbuchBlatt}
              onChange={this.changeHandler}
            />
            M2:
            <input
              name='m2'
              className={`text-input`}
              type='text'
              placeholder='m2'
              value={this.state.m2}
              onChange={this.changeHandler}
            />
            Etage:
            <input
              name='piano'
              className={`text-input`}
              type='text'
              placeholder='Etage'
              value={this.state.piano}
              onChange={this.changeHandler}
            />
            Möbel:
            <textarea
              name='mobilio'
              className={`textarea`}
              placeholder='Möbel und Wert'
              value={this.state.mobilio}
              onChange={this.changeHandler}
            />
            Bezug:
            <select
              name='stato'
              className='select select__form'
              value={this.state.stato}
              onChange={this.changeHandler}
            >
              <option value=''></option>
              <option value='leerstehend'>Leerstehend</option>
              <option value='vermietet'>Vermietet</option>
            </select>
            Wohngeld:
            <input
              name='wohngeld'
              className={`text-input`}
              type='text'
              placeholder='Wohngeld'
              value={this.state.wohngeld}
              onChange={this.onMoneyChange}
            />
            Instandhaltungs-Rücklage:
            <input
              name='ruecklage'
              className={`text-input`}
              type='text'
              placeholder='Gesamt oder anteilig?'
              value={this.state.ruecklage}
              onChange={this.changeHandler}
            />
            Kaltmiete:
            <input
              name='affittoNetto'
              className={`text-input`}
              type='text'
              placeholder='Kaltmiete'
              value={this.state.affittoNetto}
              onChange={this.onMoneyChange}
            />
            Kaufpreis:
            <input
              name='kaufpreis'
              className={`text-input`}
              type='text'
              placeholder='Kaufpreis'
              value={this.state.kaufpreis}
              onChange={this.onMoneyChange}
            />
            Hausverwaltung:
            <Select
              name='verwalter'
              value={this.state.verwalter}
              options={options}
              filterOptions={filterOptions}
              onChange={this.onVerwalterChange}
            />
            Eigentümer:
            <Select
              name='proprietarioId'
              value={this.state.proprietarioId}
              options={options}
              filterOptions={filterOptions}
              onChange={this.onProprietarioChange}
            />
            2. Eigentümer:
            <Select
              name='proprietarioId2'
              value={this.state.proprietarioId2}
              options={options}
              filterOptions={filterOptions}
              onChange={this.onProprietarioChange2}
            />
            {this.props.utente.role === 'Admin' ? (
              <label>
                Visible&nbsp;
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
              </label>
            ) : (
              ''
            )}
          </div>
          <div label='Exposé'>
            {/* Exposé */}
            Überschrift italienisch:
            <input
              name='titolo'
              className={`text-input`}
              type='text'
              placeholder='Titolo in italiano'
              value={this.state.titolo}
              onChange={this.changeHandler}
            />
            Beschreibung italienisch:
            <textarea
              name='descrizione'
              className={`textarea`}
              placeholder='Descrizione in italiano'
              value={this.state.descrizione}
              onChange={this.changeHandler}
            />
            Überschrift deutsch:
            <input
              name='titoloDe'
              className={`text-input`}
              type='text'
              placeholder='Überschrift des Exposés'
              value={this.state.titoloDe}
              onChange={this.changeHandler}
            />
            Beschreibung deutsch:
            <textarea
              name='descrizioneDe'
              className={`textarea`}
              placeholder='Beschreibung'
              value={this.state.descrizioneDe}
              onChange={this.changeHandler}
            />
            Überschrift englisch:
            <input
              name='titoloEn'
              className={`text-input`}
              type='text'
              placeholder='English title'
              value={this.state.titoloEn}
              onChange={this.changeHandler}
            />
            Beschreibung englisch:
            <textarea
              name='descrizioneEn'
              className={`textarea`}
              placeholder='English description'
              value={this.state.descrizioneEn}
              onChange={this.changeHandler}
            />
            Zimmer:
            <input
              name='vani'
              className={`text-input`}
              type='text'
              value={this.state.vani}
              onChange={this.changeHandler}
            />
            Badezimmer:
            <input
              name='bagni'
              className={`text-input`}
              type='text'
              value={this.state.bagni}
              onChange={this.changeHandler}
            />
            Zustand:
            <select
              name='condizioni'
              className='select select__form'
              value={this.state.condizioni}
              onChange={this.changeHandler}
            >
              <option value=''></option>
              <option value='neu'>Neuwertig</option>
              <option value='gut'>Gut</option>
              <option value='renovierungsbedürftig'>
                Renovierungsbedürftig
              </option>
            </select>
            Baujahr:
            <input
              name='baujahr'
              className={`text-input`}
              type='text'
              value={this.state.baujahr}
              onChange={this.changeHandler}
            />
            Energieausweis-Typ:
            <select
              name='energieAusweisTyp'
              className='select select__form'
              value={this.state.energieAusweisTyp}
              onChange={this.changeHandler}
            >
              <option value=''></option>
              <option value='Verbrauchsausweis'>Verbrauchsausweis</option>
              <option value='Bedarfsausweis'>Bedarfsausweis</option>
            </select>
            Energieausweis gültig bis:
            <input
              name='energieAusweisBis'
              className={`text-input`}
              type='text'
              value={this.state.energieAusweisBis}
              onChange={this.changeHandler}
            />
            Heizungsart:
            <select
              name='heizungsart'
              className='select select__form'
              value={this.state.heizungsart}
              onChange={this.changeHandler}
            >
              <option value=''></option>
              <option value='Zentralheizung'>Zentralheizung</option>
              <option value='Etagenheizung'>Etagenheizung</option>
            </select>
            Energieträger:
            <select
              name='energieTraeger'
              className='select select__form'
              value={this.state.energieTraeger}
              onChange={this.changeHandler}
            >
              <option value=''></option>
              <option value='Erdgas'>Erdgas</option>
              <option value='Öl'>Öl</option>
              <option value='Fernwärme'>Fernwärme</option>
            </select>
            Endenergiebedarf in kWh/(m2*a):
            <input
              name='energieBedarf'
              className='text-input'
              type='text'
              value={this.state.energieBedarf}
              onChange={this.changeHandler}
            />
            Käuferprovision:
            <input
              name='provvigione'
              className='text-input'
              type='text'
              placeholder='inklusive MWSt.'
              value={this.state.provvigione}
              onChange={this.changeHandler}
            />
            <label>
              Balkon&nbsp;
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
            </label>
            <label>
              Aufzug&nbsp;
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
            </label>
            <label>
              Garten&nbsp;
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
            </label>
            <label>
              Keller&nbsp;
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
            </label>
          </div>
          <div label='Bilder'>
            {/* Cover */}
            <div>
              <label className='button button--secondary-oggetti'>
                Cover auswählen
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
            </div>
            {/* Bilder */}
            <div>
              <label className='button button--secondary-oggetti'>
                Bilder auswählen
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
            </div>
            {/* Grundriss */}
            <div>
              <label className='button button--secondary-oggetti'>
                Grundriss auswählen
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
                            onClick={() => this.handleRemovePictureGrundriss(i)}
                          />
                        </span>
                      );
                    }
                  )}
              </div>
            </div>
            {/* Map */}
            <div>
              <label className='button button--secondary-oggetti'>
                Map auswählen
                <FileUploader
                  hidden
                  accept='image/*'
                  name='image-uploader-multiple'
                  // randomizeFilename
                  filename={() =>
                    `${this.state.rifId}-Map-${Math.floor(
                      Math.random() * 100
                    ).toString()}`
                  }
                  storageRef={firebase.storage().ref('map')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccessMap}
                  onProgress={this.handleProgress}
                  // multiple
                />
              </label>

              <div>
                {this.state.downloadURLsMap &&
                  this.state.downloadURLsMap.map((downloadURLMap, i) => {
                    return (
                      <span key={i}>
                        <img className='foto' src={downloadURLMap} />
                        <img
                          src='/images/trash.jpg'
                          className='cancella'
                          onClick={() => this.handleRemovePictureMap(i)}
                        />
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </Tabs>

        <div>
          <button className='button button--secondary-oggetti'>
            Speichern
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

export default connect(mapStateToProps)(OggettoForm);
