import React from 'react';
import firebase from 'firebase';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { DateRangePicker } from 'react-dates';
import Select from 'react-virtualized-select';

function withForm(Component) {
  return class WithForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clienti: {
          //CLIENTI
          cloudURL: props.customer
            ? props.customer.cloudURL
              ? props.customer.cloudURL
              : ''
            : '',
          nome: props.customer ? props.customer.nome : '',
          cognome: props.customer ? props.customer.cognome : '',
          titolo: props.customer ? props.customer.titolo : '',
          dataDiNascita: props.customer
            ? props.customer.dataDiNascita &&
              moment(props.customer.dataDiNascita)
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
        },
        deals: {
          //DEAL
          note: props.deal ? props.deal.note : '',
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
            ? (props.deal.provvAgenziaPartner / 100)
                .toString()
                .replace(/\./, ',')
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
          modificato: '',
          provvSum: 0,
        },
        fatture: {
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
              ? (props.fattura.mahngebuehren / 100)
                  .toString()
                  .replace(/\./, ',')
              : '0',
          mahngebuehren2:
            props.fattura && props.fattura.mahngebuehren2
              ? (props.fattura.mahngebuehren2 / 100)
                  .toString()
                  .replace(/\./, ',')
              : '0',
          payed: props.fattura ? props.fattura.payed : false,
          payedAt: props.fattura
            ? props.fattura.payedAt && moment(props.fattura.payedAt)
            : null,
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
        },
        firma: {
          //FIRMA
          bic: props.firma ? props.firma.bic : '',
          iban: props.firma ? props.firma.iban : '',
          bank: props.firma ? props.firma.bank : '',
          fax: props.firma ? props.firma.fax : '',
          email: props.firma ? props.firma.email : '',
          name: props.firma ? props.firma.name : '',
          name2: props.firma ? props.firma.name2 : '',
          adresse: props.firma ? props.firma.adresse : '',
          plz: props.firma ? props.firma.plz : '',
          stadt: props.firma ? props.firma.stadt : '',
          staat: props.firma ? props.firma.staat : '',
          telefon: props.firma ? props.firma.telefon : '',
          website: props.firma ? props.firma.website : '',
          steuerNr: props.firma ? props.firma.steuerNr : '',
          ustIdNr: props.firma ? props.firma.ustIdNr : '',
          motto: props.firma ? props.firma.motto : '',
          open: props.firma ? props.firma.open : '',
          kontoInhaber: props.firma ? props.firma.kontoInhaber : '',
        },
        leads: {
          //LEADS
          leadCreatedAt: props.lead
            ? moment(props.lead.leadCreatedAt)
            : moment(),
          leadId: props.lead ? props.lead.leadId : '',
          leadBudget: props.lead
            ? (props.lead.leadBudget / 100).toString()
            : '',
          leadOggettoStato: props.lead ? props.lead.leadOggettoStato : '',
          leadNote: props.lead ? props.lead.leadNote : '',
        },
        moduli: {
          //MODULI
          prezzoDiVendita: '',
          prezzoDiVendita2: '',
          startDate: null,
          endDate: null,
          calendarFocusedMAA: null,
          maklerProvision: '',
          provvPercentuale: '',
          belastungsVollmacht: false,
          sonstige: '',
        },
        oggetti: {
          //OGGETTO
          cloudURL: props.oggetto
            ? props.oggetto.cloudURL
              ? props.oggetto.cloudURL
              : ''
            : '',
          visible: props.oggetto ? props.oggetto.visible : true,
          note: props.oggetto ? props.oggetto.note : '',
          nazione: props.oggetto ? props.oggetto.nazione : '',
          titolo: props.oggetto ? props.oggetto.titolo : '',
          cap: props.oggetto ? props.oggetto.cap : '',
          via: props.oggetto ? props.oggetto.via : '',
          numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
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
          downloadURLsCover: props.oggetto
            ? props.oggetto.downloadURLsCover
            : '',
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
          energieAusweisTyp: props.oggetto
            ? props.oggetto.energieAusweisTyp
            : '',
          energieAusweisBis: props.oggetto
            ? props.oggetto.energieAusweisBis
            : '',
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
          //se non c'è una data, inserisco quella attuale
          dataInserimentoOggetto: props.oggetto
            ? props.oggetto.dataInserimentoOggetto
              ? moment(props.oggetto.dataInserimentoOggetto)
              : moment()
            : moment(),
          dataModificaOggetto: props.oggetto ? moment() : null,
        },
        users: {
          //USERS
          telefon: props.user ? props.user.telefon : '',
          name: props.user ? props.user.name : '',
          email: props.user ? props.user.email : '',
          role: props.user ? props.user.role : '',
          qualifica: props.user ? props.user.qualifica : '',
          firebaseAuthId: props.user ? props.user.firebaseAuthId : '',
        },

        //ERROR
        error: '',
      };
    }

    //RENDER
    renderInput = (
      object,
      property,
      label,
      type = 'text',
      handler = this.changeHandler,
      args,
      placeholder
    ) => {
      return (
        <div>
          <label htmlFor={property}>{label}</label>
          <input
            type={type}
            name={property}
            value={this.state[object][property]}
            id={property}
            className='text-input'
            placeholder={placeholder}
            onChange={(e) => handler(e, object, args)}
          />
          {this.state.error && (
            <div className='card-panel pink lighten-4'>{this.state.error}</div>
          )}
        </div>
      );
    };

    renderSelect = (object, selectName, options, label) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <Select
              name={selectName}
              value={this.state[object][selectName]}
              options={options}
              onChange={(e) =>
                this.changeHandlerSelect(selectName, e ? e.value : '', object)
              }
            />
          </div>
        </div>
      );
    };

    renderTextArea = (object, textAreaName, placeholder = 'Note') => {
      return (
        <textarea
          name={textAreaName}
          className={`textarea text-input`}
          placeholder={placeholder}
          value={this.state[object][textAreaName]}
          onChange={(e) => this.changeHandler(e, object)}
        ></textarea>
      );
    };

    renderCheckbox = (object, checkboxName, label) => {
      return (
        <div>
          <label>
            <input
              type='checkbox'
              name={checkboxName}
              checked={this.state[object][checkboxName]}
              onChange={(e) => this.changeCheckbox(e, object)}
            />
            <span>{label}</span>
          </label>
        </div>
      );
    };

    renderSingleDate = (object, dataName, focusName, label) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <SingleDatePicker
              date={this.state[object][dataName]}
              onDateChange={(e) => this.onDataChange(dataName, e, object)}
              focused={this.state[object][focusName]}
              onFocusChange={(e) => this.onFocusChange(focusName, e, object)}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDate={true}
            />
          </div>
        </div>
      );
    };

    renderDateRange = (object, focusName, label) => {
      return (
        <div>
          <label>{label}</label>
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.state[object]['startDate']}
              endDate={this.state[object]['endDate']}
              onDatesChange={(e) => this.onDatesChange(e, object)}
              focusedInput={this.state[object][focusName]}
              onFocusChange={(e) => this.onFocusChange2(e, object, focusName)}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              displayFormat={'DD.MM.YYYY'}
            />
          </div>
        </div>
      );
    };
    // HANDLER
    changeHandler = (e, object) =>
      this.setState({
        [object]: { ...this.state[object], [e.target.name]: e.target.value },
      });

    changeHandlerValuta = (e, object) => {
      const name = e.target.name;
      const value = e.target.value;
      if (!value || value.match(/^\d{1,}(,\d{0,2})?$/)) {
        this.setState(() => ({
          [object]: { ...this.state[object], [name]: value },
        }));
      }
    };

    changeHandlerValidate = (e, object, clienti) => {
      this.setState({
        [object]: { ...this.state[object], [e.target.name]: e.target.value },
      });
      let match = clienti.filter((ilcliente) => {
        const emailMatch = ilcliente.email
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
        const cognomeMatch = ilcliente.cognome
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
        const dittaMatch = ilcliente.ditta
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
        return emailMatch || cognomeMatch || dittaMatch;
      });
      if (match.length > 0) {
        this.setState(() => ({
          error: `Cliente forse già presente nel gestionale`,
        }));
      } else {
        this.setState(() => ({ error: '' }));
      }
    };

    changeHandlerSelect = (name, value, object) =>
      this.setState({ [object]: { ...this.state[object], [name]: value } });

    // le due funzioni partono insieme quindi uso un prevState per modificare lo state altrimenti si sovrascrivono
    onDataChange = (name, dataValue, object) => {
      if (dataValue) {
        this.setState((prevState) => {
          return {
            [object]: { ...prevState[object], [name]: dataValue },
          };
        });
      } else {
        this.setState(() => ({
          [object]: { ...this.state[object], [name]: null },
        }));
      }
    };

    onFocusChange = (name, { focused }, object) => {
      this.setState((prevState) => ({
        [object]: { ...prevState[object], [name]: focused },
      }));
    };

    onDatesChange = ({ startDate, endDate }, object) => {
      this.setState((prevState) => ({
        [object]: { ...prevState[object], startDate },
      }));
      this.setState((prevState) => ({
        [object]: { ...prevState[object], endDate },
      }));
    };

    onFocusChange2 = (e, object, focusName) => {
      this.setState((prevState) => ({
        [object]: { ...prevState[object], [focusName]: e },
      }));
    };

    changeCheckbox = (e, object) =>
      this.setState({
        [object]: {
          ...this.state[object],
          [e.target.name]: !this.state[object][e.target.name],
        },
      });

    handleUploadStart = () =>
      this.setState((prevState) => {
        return {
          oggetti: {
            ...prevState.oggetti,
            isUploading: true,
            uploadProgress: 0,
          },
        };
      });

    handleProgress = (progress) =>
      this.setState((prevState) => ({
        oggetti: { ...prevState.oggetti, uploadProgress: progress },
      }));

    handleUploadError = (error) => {
      this.setState((prevState) => ({
        oggetti: { ...prevState.oggetti, isUploading: false },
      }));
      console.error(error);
    };

    handleUploadSuccess = async (filename) => {
      const downloadURL = await firebase
        .storage()
        .ref('images')
        .child(filename)
        .getDownloadURL();

      this.setState((oldState) => ({
        oggetti: {
          ...oldState.oggetti,
          filenames: [...oldState.oggetti.filenames, filename],
          downloadURLs: [...oldState.oggetti.downloadURLs, downloadURL],
          uploadProgress: 100,
          isUploading: false,
        },
      }));
    };
    handleUploadSuccessCover = async (filename) => {
      const downloadURL = await firebase
        .storage()
        .ref('cover')
        .child(filename)
        .getDownloadURL();

      this.setState((oldState) => ({
        oggetti: {
          ...oldState.oggetti,
          filenamesCover: [...oldState.oggetti.filenamesCover, filename],
          downloadURLsCover: [
            ...oldState.oggetti.downloadURLsCover,
            downloadURL,
          ],
          uploadProgress: 100,
          isUploading: false,
        },
      }));
    };

    handleUploadSuccessGrundriss = async (filename) => {
      const downloadURL = await firebase
        .storage()
        .ref('grundriss')
        .child(filename)
        .getDownloadURL();

      this.setState((oldState) => ({
        oggetti: {
          ...oldState.oggetti,
          filenamesGrundriss: [
            ...oldState.oggetti.filenamesGrundriss,
            filename,
          ],
          downloadURLsGrundriss: [
            ...oldState.oggetti.downloadURLsGrundriss,
            downloadURL,
          ],
          uploadProgress: 100,
          isUploading: false,
        },
      }));
    };

    handleRemovePicture = (picture) => {
      console.log(picture);
      let downloadURLs = this.state.oggetti.downloadURLs;
      let filenames = this.state.oggetti.filenames;
      downloadURLs.splice(picture, 1);
      const removedFilename = filenames.splice(picture, 1);
      const [filename] = removedFilename;
      if (downloadURLs === undefined || downloadURLs.length < 1) {
        downloadURLs = '';
      }
      if (filenames === undefined || filenames.length < 1) {
        filenames = '';
      }
      this.setState((prevState) => ({
        oggetti: { ...prevState.oggetti, downloadURLs, filenames },
      }));
      firebase
        .storage()
        .ref('images')
        .child(filename)
        .delete()
        .then(() => {
          console.log('File deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    handleRemovePictureCover = (picture) => {
      console.log(picture);
      let downloadURLsCover = this.state.oggetti.downloadURLsCover;
      let filenamesCover = this.state.oggetti.filenamesCover;
      downloadURLsCover.splice(picture, 1);
      const removedFilename = filenamesCover.splice(picture, 1);
      const [filenameCover] = removedFilename;
      if (downloadURLsCover === undefined || downloadURLsCover.length < 1) {
        downloadURLsCover = '';
      }
      if (filenamesCover === undefined || filenamesCover.length < 1) {
        filenamesCover = '';
      }
      this.setState((prevState) => ({
        oggetti: { ...prevState.oggetti, downloadURLsCover, filenamesCover },
      }));
      firebase
        .storage()
        .ref('cover')
        .child(filenameCover)
        .delete()
        .then(() => {
          console.log('File deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    handleRemovePictureGrundriss = (picture) => {
      console.log(picture);
      let downloadURLsGrundriss = this.state.oggetti.downloadURLsGrundriss;
      let filenamesGrundriss = this.state.oggetti.filenamesGrundriss;
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
      this.setState((prevState) => ({
        oggetti: {
          ...prevState.oggetti,
          downloadURLsGrundriss,
          filenamesGrundriss,
        },
      }));
      firebase
        .storage()
        .ref('grundriss')
        .child(filenameGrundriss)
        .delete()
        .then(() => {
          console.log('File deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    render() {
      return (
        <Component
          renderInput={this.renderInput}
          renderSingleDate={this.renderSingleDate}
          renderDateRange={this.renderDateRange}
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
