import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';

function withForm(Component) {
  return class WithForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //CLIENTI
        nome: props.customer ? props.customer.nome : '',
        cognome: props.customer ? props.customer.cognome : '',
        titolo: props.customer ? props.customer.titolo : '',
        dataDiNascita: props.customer
          ? props.customer.dataDiNascita && moment(props.customer.dataDiNascita)
          : null,
        ditta: props.customer ? props.customer.ditta : '',
        indirizzo: props.customer ? props.customer.indirizzo : '',
        indirizzo2: props.customer ? props.customer.indirizzo2 : '',
        cap: props.customer ? props.customer.cap : '',
        comune: props.customer ? props.customer.comune : '',
        nazione: props.customer ? props.customer.nazione : '',
        lingua: props.customer ? props.customer.lingua : '',
        email: props.customer ? props.customer.email : '',
        consulenteVenditaId: props.customer
          ? props.customer.consulenteVenditaId
          : '',
        telefono1: props.customer ? props.customer.telefono1 : '',
        fax: props.customer ? props.customer.fax : '',
        cellulare: props.customer ? props.customer.cellulare : '',
        codiceFiscale: props.customer ? props.customer.codiceFiscale : '',
        handelsRegisterNummer: props.customer
          ? props.customer.handelsRegisterNummer
          : '',
        bank: props.customer ? props.customer.bank : '',
        iban: props.customer ? props.customer.iban : '',
        bic: props.customer ? props.customer.bic : '',
        note: props.customer ? props.customer.note : '',
        visible: props.customer ? props.customer.visible : true,
        error: '',
        www: props.customer ? props.customer.www || '' : '',
        dataRegistrazione: props.customer
          ? props.customer.dataRegistrazione
            ? moment(props.customer.dataRegistrazione)
            : null
          : null,
        calendarDataRegistrazioneFocused: false,
        consensoDSGVO: props.customer
          ? props.customer.consensoDSGVO
            ? props.customer.consensoDSGVO
            : false
          : false,
        dataConsensoDSGVO: props.customer
          ? props.customer.dataConsensoDSGVO
            ? moment(props.customer.dataConsensoDSGVO)
            : null
          : null,
        calendarDataConsensoDSGVOFocused: false,

        //DEAL
        oggettoId: props.deal ? props.deal.oggettoId : '',
        prezzoDiVendita: props.deal
          ? (props.deal.prezzoDiVendita / 100).toString().replace(/\./, ',')
          : '0',
        amount: props.deal
          ? (props.deal.amount / 100).toString().replace(/\./, ',')
          : '',
        consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
        provvM2square: props.deal
          ? (props.deal.provvM2square / 100).toString().replace(/\./, ',')
          : '',
        dealType: props.deal ? props.deal.dealType : '',
        provvStefano: props.deal
          ? (props.deal.provvStefano / 100).toString().replace(/\./, ',')
          : '',
        payedStefano: props.deal ? props.deal.payedStefano : false,
        payedAtStefano: props.deal
          ? props.deal.payedAtStefano && moment(props.deal.payedAtStefano)
          : null,
        calendarPayedAtStefanoFocused: false,
        agenziaPartnerId: props.deal ? props.deal.agenziaPartnerId : '',
        provvAgenziaPartner: props.deal
          ? (props.deal.provvAgenziaPartner / 100).toString().replace(/\./, ',')
          : '0',
        payedAgenziaPartner: props.deal
          ? props.deal.payedAgenziaPartner
          : false,
        createdAt: props.deal
          ? props.deal.createdAt && moment(props.deal.createdAt)
          : null,
        calendarFocused: false,
        venditoreId: props.deal ? props.deal.venditoreId : '',
        venditoreId2: props.deal ? props.deal.venditoreId2 : '',
        acquirenteId: props.deal ? props.deal.acquirenteId : '',
        acquirenteId2: props.deal ? props.deal.acquirenteId2 : '',
        notaioId: props.deal ? props.deal.notaioId : '',
        dataRogito: props.deal
          ? props.deal.dataRogito && moment(props.deal.dataRogito)
          : null,
        calendarDataRogitoFocused: false,
        dataConsegna: props.deal
          ? props.deal.dataConsegna && moment(props.deal.dataConsegna)
          : null,
        calendarDataConsegnaFocused: false,
        linguaRogito: props.deal ? props.deal.linguaRogito : '',
        belastungsVollmacht: props.deal
          ? props.deal.belastungsVollmacht
          : false,
        noteDeal: props.deal ? props.deal.note : '',

        modificato: '',
        provvSum: 0,

        //FATTURE
        dealId: props.fattura ? props.fattura.dealId : '',
        clienteId: props.fattura ? props.fattura.clienteId : '',
        clienteId2: props.fattura ? props.fattura.clienteId2 : '',
        numeroFattura: props.fattura ? props.fattura.numeroFattura : '',
        dataFattura: props.fattura
          ? props.fattura.dataFattura && moment(props.fattura.dataFattura)
          : null,
        calendarDataFatturaFocused: false,
        dataZahlungserinnerung: props.fattura
          ? props.fattura.dataZahlungserinnerung &&
            moment(props.fattura.dataZahlungserinnerung)
          : null,
        calendarDataZahlungserinnerungFocused: false,
        dataMahnung: props.fattura
          ? props.fattura.dataMahnung && moment(props.fattura.dataMahnung)
          : null,
        calendarDataMahnungFocused: false,
        dataMahnung2: props.fattura
          ? props.fattura.dataMahnung2 && moment(props.fattura.dataMahnung2)
          : null,
        calendarDataMahnung2Focused: false,
        mahngebuehren:
          props.fattura && props.fattura.mahngebuehren
            ? (props.fattura.mahngebuehren / 100).toString().replace(/\./, ',')
            : '0',
        mahngebuehren2:
          props.fattura && props.fattura.mahngebuehren2
            ? (props.fattura.mahngebuehren2 / 100).toString().replace(/\./, ',')
            : '0',
        payed: props.fattura ? props.fattura.payed : false,
        payedAt: props.fattura
          ? props.fattura.payedAt && moment(props.fattura.payedAt)
          : null,
        modificato: '',
        descrizioneProdotto: props.fattura
          ? props.fattura.descrizioneProdotto
            ? props.fattura.descrizioneProdotto
            : ''
          : '',
        importoNetto: props.fattura
          ? props.fattura.importoNetto
            ? (props.fattura.importoNetto / 100).toString().replace(/\./, ',')
            : '0'
          : '0',
        dataPrestazione: props.fattura
          ? props.fattura.dataPrestazione
            ? props.fattura.dataPrestazione &&
              moment(props.fattura.dataPrestazione)
            : null
          : null,
        calendarDataPrestazioneFocus: false,

        //FIRMA
        name: props.firma ? props.firma.name : '',
        name2: props.firma ? props.firma.name2 : '',
        adresse: props.firma ? props.firma.adresse : '',
        plz: props.firma ? props.firma.plz : '',
        stadt: props.firma ? props.firma.stadt : '',
        staat: props.firma ? props.firma.staat : '',
        telefon: props.firma ? props.firma.telefon : '',
        faxFirma: props.firma ? props.firma.fax : '',
        emailFirma: props.firma ? props.firma.email : '',
        websiteFirma: props.firma ? props.firma.website : '',
        steuerNrFirma: props.firma ? props.firma.steuerNr : '',
        ustIdNrFirma: props.firma ? props.firma.ustIdNr : '',
        motto: props.firma ? props.firma.motto : '',
        open: props.firma ? props.firma.open : '',
        kontoInhaber: props.firma ? props.firma.kontoInhaber : '',
        bankFirma: props.firma ? props.firma.bank : '',
        ibanFirma: props.firma ? props.firma.iban : '',
        bicFirma: props.firma ? props.firma.bic : '',

        //LEADS
        leadCreatedAt: props.lead ? moment(props.lead.leadCreatedAt) : moment(),
        leadId: props.lead ? props.lead.leadId : '',
        leadBudget: props.lead ? (props.lead.leadBudget / 100).toString() : '',
        leadOggettoStato: props.lead ? props.lead.leadOggettoStato : '',
        leadNote: props.lead ? props.lead.leadNote : '',

        //MODULI
        prezzoDiVendita2: '',
        startDate: null,
        endDate: null,
        calendarFocusedMAA: null,
        maklerProvision: '',
        provvPercentuale: '',
        sonstige: '',

        //OGGETTO
        via: props.oggetto ? props.oggetto.via : '',
        numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
        titoloOggetto: props.oggetto ? props.oggetto.titolo : '',
        nazioneOggetto: props.oggetto ? props.oggetto.nazione : '',
        capOggetto: props.oggetto ? props.oggetto.cap : '',
        noteOggetto: props.oggetto ? props.oggetto.note : '',
        visibleOggetto: props.oggetto ? props.oggetto.visible : true,
        citta: props.oggetto ? props.oggetto.citta : '',
        quartiere: props.oggetto ? props.oggetto.quartiere : '',
        numeroAppartamento: props.oggetto
          ? props.oggetto.numeroAppartamento
          : '',
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
        filenames: props.oggetto ? props.oggetto.filenames : '',
        downloadURLs: props.oggetto ? props.oggetto.downloadURLs : '',
        filenamesCover: props.oggetto ? props.oggetto.filenamesCover : '',
        downloadURLsCover: props.oggetto ? props.oggetto.downloadURLsCover : '',
        filenamesGrundriss: props.oggetto
          ? props.oggetto.filenamesGrundriss
          : '',
        downloadURLsGrundriss: props.oggetto
          ? props.oggetto.downloadURLsGrundriss
          : '',
        isUploading: false,
        uploadProgress: 0,
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
        venduto: props.oggetto ? props.oggetto.venduto : false,
        tipologia: props.oggetto
          ? props.oggetto.tipologia
            ? props.oggetto.tipologia
            : ''
          : '',

        //USERS
        nameUser: props.user ? props.user.name : '',
        role: props.user ? props.user.role : '',
        emailUser: props.user ? props.user.email : '',
        telefonUser: props.user ? props.user.telefon : '',
        qualifica: props.user ? props.user.qualifica : '',
        firebaseAuthId: props.user ? props.user.firebaseAuthId : '',

        //ERROR
        error: ''
      };
    }

    //RENDER
    renderInput = (
      name,
      label,
      type = 'text',
      handler = this.changeHandler,
      args,
      placeholder
    ) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            value={this.state[name]}
            id={name}
            className='text-input'
            placeholder={placeholder}
            onChange={e => handler(e, args)}
          />
          {this.state.error && (
            <div className='card-panel pink lighten-4'>{this.state.error}</div>
          )}
        </div>
      );
    };

    renderTextArea = (textAreaName, placeholder = 'Note') => {
      return (
        <textarea
          name={textAreaName}
          className={`textarea text-input`}
          placeholder={placeholder}
          value={this.state[textAreaName]}
          onChange={this.changeHandler}
        ></textarea>
      );
    };

    renderCheckbox = (checkboxName, label) => {
      return (
        <div>
          <label>
            <input
              type='checkbox'
              name={checkboxName}
              checked={this.state[checkboxName]}
              onChange={this.changeCheckbox}
            />
            <span>{label}</span>
          </label>
        </div>
      );
    };

    renderSingleDate = (dataName, focusName, label) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <SingleDatePicker
              date={this.state[dataName]}
              onDateChange={e => this.onDataChange(dataName, e)}
              focused={this.state[focusName]}
              onFocusChange={e => this.onFocusChange(focusName, e)}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDate={true}
            />
          </div>
        </div>
      );
    };

    renderSelect = (selectName, options, label) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <Select
              name={selectName}
              value={this.state[selectName]}
              options={options}
              onChange={e => this.changeHandlerSelect(selectName, e && e.value)}
            />
          </div>
        </div>
      );
    };

    // HANDLER
    changeHandler = e => this.setState({ [e.target.name]: e.target.value });

    changeHandlerSelect = (name, value) => this.setState({ [name]: value });

    changeHandlerValuta = e => {
      const name = e.target.name;
      const value = e.target.value;
      if (!value || value.match(/^\d{1,}(,\d{0,2})?$/)) {
        this.setState(() => ({
          [name]: value
        }));
      }
    };

    changeHandlerValidate = (e, clienti) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: value });
      let match = clienti.filter(ilcliente => {
        const emailMatch = ilcliente.email
          .toLowerCase()
          .includes(value.toLowerCase());
        const cognomeMatch = ilcliente.cognome
          .toLowerCase()
          .includes(value.toLowerCase());
        const dittaMatch = ilcliente.ditta
          .toLowerCase()
          .includes(value.toLowerCase());
        return emailMatch || cognomeMatch || dittaMatch;
      });
      if (match.length > 0) {
        this.setState(() => ({
          error: `Cliente forse già presente nel gestionale`
        }));
      } else {
        this.setState(() => ({ error: '' }));
      }
    };

    onDataChange = (name, data) => {
      if (data) {
        this.setState(() => ({ [name]: data }));
      } else {
        this.setState(() => ({ [name]: null }));
      }
    };

    onFocusChange = (name, { focused }) => {
      this.setState(() => ({ [name]: focused }));
    };

    onDatesChange = ({ startDate, endDate }) => {
      this.setState(() => ({ startDate }));
      this.setState(() => ({ endDate }));
    };

    onFocusChange2 = calendarFocusedMAA => {
      this.setState(() => ({ calendarFocusedMAA }));
    };

    changeCheckbox = e =>
      this.setState({ [e.target.name]: !this.state[e.target.name] });

    handleUploadStart = () =>
      this.setState({
        isUploading: true,
        uploadProgress: 0
      });

    handleProgress = progress => this.setState({ uploadProgress: progress });

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

    render() {
      return (
        <Component
          renderInput={this.renderInput}
          renderSingleDate={this.renderSingleDate}
          renderTextArea={this.renderTextArea}
          renderCheckbox={this.renderCheckbox}
          renderSelect={this.renderSelect}
          changeHandler={this.changeHandler}
          changeHandlerSelect={this.changeHandlerSelect}
          changeHandlerValuta={this.changeHandlerValuta}
          changeHandlerValidate={this.changeHandlerValidate}
          onDataChange={this.onDataChange}
          onFocusChange={this.onFocusChange}
          onFocusChange2={this.onFocusChange2}
          onDatesChange={this.onDatesChange}
          changeCheckbox={this.changeCheckbox}
          handleUploadStart={this.handleUploadStart}
          handleProgress={this.handleProgress}
          handleUploadError={this.handleUploadError}
          handleUploadSuccess={this.handleUploadSuccess}
          handleUploadSuccessCover={this.handleUploadSuccessCover}
          handleUploadSuccessGrundriss={this.handleUploadSuccessGrundriss}
          handleRemovePicture={this.handleRemovePicture}
          handleRemovePictureCover={this.handleRemovePictureCover}
          handleRemovePictureGrundriss={this.handleRemovePictureGrundriss}
          {...this.props}
          data={this.state}
        />
      );
    }
  };
}

export default withForm;
