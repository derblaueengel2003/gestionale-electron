import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { DateRangePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import OptionModal from './OptionModal';
import axios, { post } from 'axios';
import Dropzone from 'react-dropzone';
import {
  visualizzaDecimaleConVirgola,
  riordinaImmagini,
  generaToken,
} from './utils';

function withForm(Component) {
  return class WithForm extends React.Component {
    componentDidUpdate(prevProps) {
      if (prevProps.oggetto !== this.props.oggetto) {
        this.setState({
          oggetti: this.props.oggetto,
        });
      }
    }
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
          feePayed: props.deal
            ? props.deal.feePayed
              ? props.deal.feePayed
              : false
            : false,
          note: props.deal ? props.deal.note : '',
          oggettoId: props.deal ? props.deal.oggettoId : '',
          prezzoDiVendita: props.deal
            ? visualizzaDecimaleConVirgola(props.deal.prezzoDiVendita)
            : '0',
          amount: props.deal
            ? visualizzaDecimaleConVirgola(props.deal.amount)
            : '',
          consulenteVendita: props.deal ? props.deal.consulenteVendita : '',
          provvM2square: props.deal
            ? visualizzaDecimaleConVirgola(props.deal.provvM2square)
            : '',
          dealType: props.deal ? props.deal.dealType : '',
          provvStefano: props.deal
            ? visualizzaDecimaleConVirgola(props.deal.provvStefano)
            : '',
          payedStefano: props.deal ? props.deal.payedStefano : false,
          payedAtStefano: props.deal
            ? props.deal.payedAtStefano && moment(props.deal.payedAtStefano)
            : null,
          calendarPayedAtStefanoFocused: false,
          agenziaPartnerId: props.deal ? props.deal.agenziaPartnerId : '',
          provvAgenziaPartner: props.deal
            ? visualizzaDecimaleConVirgola(props.deal.provvAgenziaPartner)
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
              ? visualizzaDecimaleConVirgola(props.fattura.mahngebuehren)
              : '0',
          mahngebuehren2:
            props.fattura && props.fattura.mahngebuehren2
              ? visualizzaDecimaleConVirgola(props.fattura.mahngebuehren2)
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
              ? visualizzaDecimaleConVirgola(props.fattura.importoNetto)
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
          ivaApplicata: props.firma
            ? props.firma.ivaApplicata
              ? props.firma.ivaApplicata
              : ''
            : '',
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
          leadCity: props.lead
            ? props.lead.leadCity
              ? props.lead.leadCity
              : 'Berlin'
            : 'Berlin',
          leadOggettoStato: props.lead ? props.lead.leadOggettoStato : '',
          leadNote: props.lead ? props.lead.leadNote : '',
        },
        offers: {
          calendarFocused: false,
          consulenteId: props.offer ? props.offer.consulenteId : '',
          feedback: props.offer ? props.offer.feedback : '',
          leadId: props.offer ? props.offer.leadId : props.leadId,
          offerCreatedAt: props.offer
            ? props.offer.offerCreatedAt && moment(props.offer.offerCreatedAt)
            : null,
          offerNote: props.offer ? props.offer.offerNote : '',
          offertoTramite: props.offer ? props.offer.offertoTramite : '',
          oggettoId: props.offer ? props.offer.oggettoId : props.oggettoId,
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
          affittoNetto: props.oggetto
            ? visualizzaDecimaleConVirgola(props.oggetto.affittoNetto)
            : '0',
          amtsgericht: props.oggetto ? props.oggetto.amtsgericht : '',
          ascensore: props.oggetto ? props.oggetto.ascensore : false,
          baujahr: props.oggetto ? props.oggetto.baujahr : '',
          bagni: props.oggetto ? props.oggetto.bagni : '',
          balcone: props.oggetto ? props.oggetto.balcone : false,
          cantina: props.oggetto ? props.oggetto.cantina : false,
          cap: props.oggetto ? props.oggetto.cap : '',
          citta: props.oggetto ? props.oggetto.citta : '',
          cloudURL: props.oggetto
            ? props.oggetto.cloudURL
              ? props.oggetto.cloudURL
              : ''
            : '',
          condizioni: props.oggetto ? props.oggetto.condizioni : '',
          //se non c'è una data, inserisco quella attuale
          dataInserimentoOggetto: props.oggetto
            ? props.oggetto.dataInserimentoOggetto
              ? moment(props.oggetto.dataInserimentoOggetto)
              : moment()
            : moment(),
          dataModificaOggetto: props.oggetto ? moment() : null,
          descrizione: props.oggetto ? props.oggetto.descrizione : '',
          descrizioneDe: props.oggetto ? props.oggetto.descrizioneDe : '',
          descrizioneEn: props.oggetto ? props.oggetto.descrizioneEn : '',
          downloadURLs: props.oggetto
            ? props.oggetto.downloadURLs
              ? props.oggetto.downloadURLs
              : [[], [], []]
            : [[], [], []],
          downloadURLsId: props.oggetto
            ? props.oggetto.downloadURLsId
              ? props.oggetto.downloadURLsId
              : [[], [], []]
            : [[], [], []],
          downloadURLsCover: props.oggetto
            ? props.oggetto.downloadURLsCover
              ? props.oggetto.downloadURLsCover
              : []
            : [],
          downloadURLsCoverId: props.oggetto
            ? props.oggetto.downloadURLsCoverId
              ? props.oggetto.downloadURLsCoverId
              : []
            : [],
          downloadURLsGrundriss: props.oggetto
            ? props.oggetto.downloadURLsGrundriss
              ? props.oggetto.downloadURLsGrundriss
              : []
            : [],
          downloadURLsGrundrissId: props.oggetto
            ? props.oggetto.downloadURLsGrundrissId
              ? props.oggetto.downloadURLsGrundrissId
              : []
            : [],
          energieAusweisTyp: props.oggetto
            ? props.oggetto.energieAusweisTyp
            : '',
          energieAusweisBis: props.oggetto
            ? props.oggetto.energieAusweisBis
            : '',
          energieTraeger: props.oggetto ? props.oggetto.energieTraeger : '',
          energieBedarf: props.oggetto ? props.oggetto.energieBedarf : '',
          featuredProperty: props.oggetto
            ? props.oggetto.featuredProperty
              ? props.oggetto.featuredProperty
              : 0
            : 0,
          filenames: props.oggetto ? props.oggetto.filenames : '',
          filenamesCover: props.oggetto ? props.oggetto.filenamesCover : '',
          filenamesGrundriss: props.oggetto
            ? props.oggetto.filenamesGrundriss
            : '',
          giardino: props.oggetto ? props.oggetto.giardino : false,
          grundbuch: props.oggetto ? props.oggetto.grundbuch : '',
          grundbuchBlatt: props.oggetto ? props.oggetto.grundbuchBlatt : '',
          heizungsart: props.oggetto ? props.oggetto.heizungsart : '',
          immaginiInviate: props.oggetto
            ? props.oggetto.immaginiInviate
              ? props.oggetto.immaginiInviate
              : []
            : [],
          inquilinoId: props.oggetto ? props.oggetto.inquilinoId : '',
          isUploading: false,
          kaufpreis: props.oggetto
            ? visualizzaDecimaleConVirgola(props.oggetto.kaufpreis)
            : '0',
          latitude: props.oggetto
            ? props.oggetto.latitude
              ? props.oggetto.latitude
              : ''
            : '',
          longitude: props.oggetto
            ? props.oggetto.longitude
              ? props.oggetto.longitude
              : ''
            : '',
          m2: props.oggetto ? props.oggetto.m2 : '',
          mobilio: props.oggetto ? props.oggetto.mobilio : '',
          nazione: props.oggetto ? props.oggetto.nazione : '',
          note: props.oggetto ? props.oggetto.note : '',
          numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
          numeroAppartamento: props.oggetto
            ? props.oggetto.numeroAppartamento
            : '',
          piano: props.oggetto ? props.oggetto.piano : '',
          // postId: props.oggetto
          //   ? props.oggetto.postId
          //     ? props.oggetto.postId
          //     : ''
          //   : '',
          prenotato: props.oggetto
            ? props.oggetto.prenotato
              ? props.oggetto.prenotato
              : false
            : false,

          proprietarioId: props.oggetto ? props.oggetto.proprietarioId : '',
          proprietarioId2: props.oggetto ? props.oggetto.proprietarioId2 : '',
          provvigione: props.oggetto
            ? props.oggetto.provvigione
              ? visualizzaDecimaleConVirgola(props.oggetto.provvigione)
              : '0'
            : '0',
          quartiere: props.oggetto ? props.oggetto.quartiere : '',
          rifId: props.oggetto ? props.oggetto.rifId : '',
          ruecklage: props.oggetto ? props.oggetto.ruecklage : '',
          stato: props.oggetto ? props.oggetto.stato : '',
          status: props.oggetto
            ? props.oggetto.status
              ? props.oggetto.status
              : false
            : false,
          themeSlider: props.oggetto
            ? props.oggetto.themeSlider
              ? props.oggetto.themeSlider
              : 0
            : 0,
          tipologia: props.oggetto
            ? props.oggetto.tipologia
              ? props.oggetto.tipologia
              : ''
            : '',
          titoloDe: props.oggetto ? props.oggetto.titoloDe : '',
          titoloEn: props.oggetto ? props.oggetto.titoloEn : '',
          titolo: props.oggetto ? props.oggetto.titolo : '',
          uploadProgress: 0,
          vani: props.oggetto ? props.oggetto.vani : '',
          venduto: props.oggetto ? props.oggetto.venduto : false,
          verwalter: props.oggetto ? props.oggetto.verwalter : '',
          via: props.oggetto ? props.oggetto.via : '',
          videoId: props.oggetto
            ? props.oggetto.videoId
              ? props.oggetto.videoId
              : ''
            : '',
          visible: props.oggetto ? props.oggetto.visible : true,
          wohngeld: props.oggetto
            ? visualizzaDecimaleConVirgola(props.oggetto.wohngeld)
            : '0',
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
        evaluations: {
          wohnlageSnippet: props.evaluation
            ? props.evaluation.wohnlageSnippet
              ? props.evaluation.wohnlageSnippet
              : []
            : [],
          wohnlageSnippetId: props.evaluation
            ? props.evaluation.wohnlageSnippetId
              ? props.evaluation.wohnlageSnippetId
              : []
            : [],
          bodenrichtwertSnippet: props.evaluation
            ? props.evaluation.bodenrichtwertSnippet
              ? props.evaluation.bodenrichtwertSnippet
              : []
            : [],
          bodenrichtwertSnippetId: props.evaluation
            ? props.evaluation.bodenrichtwertSnippetId
              ? props.evaluation.bodenrichtwertSnippetId
              : []
            : [],
          immobilienPreisSnippet: props.evaluation
            ? props.evaluation.immobilienPreisSnippet
              ? props.evaluation.immobilienPreisSnippet
              : []
            : [],
          immobilienPreisSnippetId: props.evaluation
            ? props.evaluation.immobilienPreisSnippetId
              ? props.evaluation.immobilienPreisSnippetId
              : []
            : [],
          is24Snippet: props.evaluation
            ? props.evaluation.is24Snippet
              ? props.evaluation.is24Snippet
              : []
            : [],
          is24SnippetId: props.evaluation
            ? props.evaluation.is24SnippetId
              ? props.evaluation.is24SnippetId
              : []
            : [],
          mietspiegelSnippet: props.evaluation
            ? props.evaluation.mietspiegelSnippet
              ? props.evaluation.mietspiegelSnippet
              : []
            : [],
          mietspiegelSnippetId: props.evaluation
            ? props.evaluation.mietspiegelSnippetId
              ? props.evaluation.mietspiegelSnippetId
              : []
            : [],

          cloudURL: props.evaluation
            ? props.evaluation.cloudURL
              ? props.evaluation.cloudURL
              : ''
            : '',
          affittoNetto: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.affittoNetto)
            : '0',
          m2: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.m2)
            : '0',
          rendite: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.rendite)
            : '0',
          wohnlage: props.evaluation ? props.evaluation.wohnlage : '',
          bodenRichtwert: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.bodenRichtwert)
            : '0',
          bodenRichtwert2: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.bodenRichtwert2)
            : '0',
          bodenRichtwert3: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.bodenRichtwert3)
            : '0',
          dataEvaluation: moment(),
          mietspiegel: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.mietspiegel)
            : '0',
          mietendeckel: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.mietendeckel)
            : '0',
          note: props.evaluation ? props.evaluation.note : '',
          immobilienpreisMin: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.immobilienpreisMin)
            : '0',
          immobilienpreisMax: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.immobilienpreisMax)
            : '0',
          immobilienpreisAverage: props.evaluation
            ? visualizzaDecimaleConVirgola(
                props.evaluation.immobilienpreisAverage
              )
            : '0',
          is24Evaluation: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.is24Evaluation)
            : '0',
          result: props.evaluation
            ? visualizzaDecimaleConVirgola(props.evaluation.result)
            : '0',
          titolo: props.evaluation ? props.evaluation.titolo : '',
          oggettoId: props.evaluation ? props.evaluation.oggettoId : '',
          visible: props.evaluation ? props.evaluation.visible : true,
          testoIntroduttivoDe: props.evaluation
            ? props.evaluation.testoIntroduttivoDe
              ? props.evaluation.testoIntroduttivoDe
              : ''
            : '',
          testoFinaleDe: props.evaluation
            ? props.evaluation.testoFinaleDe
              ? props.evaluation.testoFinaleDe
              : ''
            : '',
          testoIntroduttivoEn: props.evaluation
            ? props.evaluation.testoIntroduttivoEn
              ? props.evaluation.testoIntroduttivoEn
              : ''
            : '',
          testoFinaleEn: props.evaluation
            ? props.evaluation.testoFinaleEn
              ? props.evaluation.testoFinaleEn
              : ''
            : '',
          testoIntroduttivoIt: props.evaluation
            ? props.evaluation.testoIntroduttivoIt
              ? props.evaluation.testoIntroduttivoIt
              : ''
            : '',
          testoFinaleIt: props.evaluation
            ? props.evaluation.testoFinaleIt
              ? props.evaluation.testoFinaleIt
              : ''
            : '',
        },
        newsletters: {
          dataNewsletter: props.newsletter
            ? props.newsletter.dataNewsletter &&
              moment(props.newsletter.dataNewsletter)
            : moment(),
          dataSentNewsletter: props.newsletter
            ? props.newsletter.dataSentNewsletter &&
              moment(props.newsletter.dataSentNewsletter)
            : null,
          oggetto1: props.newsletter ? props.newsletter.oggetto1 : null,
          oggetto2: props.newsletter ? props.newsletter.oggetto2 : null,
          oggetto3: props.newsletter ? props.newsletter.oggetto3 : null,
          oggetto4: props.newsletter ? props.newsletter.oggetto4 : null,
          oggetto5: props.newsletter ? props.newsletter.oggetto5 : null,
          oggetto6: props.newsletter ? props.newsletter.oggetto6 : null,
          newsletterText: props.newsletter ? props.newsletterText : '',
          mailchimpId: props.newsletter ? props.newsletter.mailchimpId : null,
          visible: props.newsletter ? props.newsletter.visible : true,
          sent: props.newsletter ? props.newsletter.sent : false,
        },

        // ERROR
        error: '',

        // MODAL
        isOpen: false,
        contentLabel: '',
        modalContent: null,

        // SPINNER
        spinner: false,
      };
    }

    //RENDER

    renderModal = (contentLabel) => {
      const handleOpenModal = () => {
        this.setState(() => ({
          isOpen: true,
          contentLabel,
        }));
      };

      const handleCloseModal = () => {
        this.setState({ isOpen: false });
      };

      return (
        <div>
          <button className='btn green' onClick={handleOpenModal}>
            {contentLabel}
          </button>
          <OptionModal
            isOpen={this.state.isOpen}
            contentLabel={this.state.contentLabel}
            modalContent={this.state.modalContent}
            onCancel={handleCloseModal}
          />
        </div>
      );
    };

    renderError = (error = '') => {
      this.setState({ error });
    };

    renderInput = (
      object,
      property,
      label,
      type = 'text',
      handler = this.changeHandler,
      args,
      placeholder,
      required = ''
    ) => {
      return (
        <div>
          <label htmlFor={property}>
            {label}
            {required}
          </label>
          <input
            type={type}
            name={property}
            value={this.state[object][property]}
            id={property}
            className='text-input'
            placeholder={placeholder}
            onChange={(e) => handler(e, object, args)}
          />
        </div>
      );
    };

    renderSelect = (object, selectName, options, label, required = '') => {
      return (
        <div>
          <label>
            {label}
            {required}
          </label>
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

    renderSingleDate = (object, dataName, focusName, label, required = '') => {
      return (
        <div>
          <label>
            {label}
            {required}
          </label>
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

    renderUploadImage = (object, property, label) => {
      return (
        <li className='collection-item'>
          <label htmlFor={property}>{label}</label>
          <Dropzone
            onDrop={(accepted, rejected) => {
              this.handleOnDrop(accepted, rejected, property, object);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div className='file-upload-box'>
                    Drag 'n' drop some files here, or click to select files
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          {this.state.spinner ? (
            <div className='progress'>
              <div className='indeterminate'></div>
            </div>
          ) : (
            <div>
              {property === 'downloadURLs'
                ? // visualizzo solo uno degli array, gli altri sono duplicati
                  Array.isArray(this.state.oggetti.downloadURLs[0])
                  ? this.state.oggetti.downloadURLs[0].map((url, i) => {
                      return (
                        <div key={i} className='foto-container'>
                          <img className='foto' src={url} />
                          {i > 0 && (
                            <button
                              className='sposta-sinistra'
                              onClick={(e) => this.sposta(e, i, true)}
                            >
                              <i className='material-icons'>navigate_before</i>
                            </button>
                          )}

                          {i <
                            this.state.oggetti.downloadURLs[0].length - 1 && (
                            <button
                              className='sposta-destra'
                              onClick={(e) => this.sposta(e, i, false)}
                            >
                              <i className='material-icons'>navigate_next</i>
                            </button>
                          )}
                          <button
                            className='cancella'
                            onClick={(e) =>
                              this.handleRemovePicture(e, i, property, object)
                            }
                          >
                            <i className='material-icons'>delete</i>
                          </button>
                        </div>
                      );
                    })
                  : this.state.oggetti.downloadURLs &&
                    this.state.oggetti.downloadURLs.map((url, i) => {
                      return (
                        <div key={i} className='foto-container'>
                          <img className='foto' src={url} />
                          <button
                            className='cancella'
                            onClick={(e) =>
                              this.handleRemovePicture(e, i, property, object)
                            }
                          >
                            <i className='material-icons'>delete</i>
                          </button>
                        </div>
                      );
                    })
                : this.state[object][property] &&
                  this.state[object][property].map((url, i) => {
                    return (
                      <div key={i} className='foto-container'>
                        <img className='foto' src={url} />
                        <button
                          className='cancella'
                          onClick={(e) =>
                            this.handleRemovePicture(e, i, property, object)
                          }
                        >
                          <i className='material-icons'>delete</i>
                        </button>
                      </div>
                    );
                  })}
            </div>
          )}
        </li>
      );
    };

    // HANDLER
    changeHandler = (e, object) =>
      this.setState({
        [object]: { ...this.state[object], [e.target.name]: e.target.value },
      });

    handleOnDrop = (accepted, rejected, property, object) => {
      console.log(accepted, rejected, property, object);

      let urlArray = [[], [], []];
      let idArray = [[], [], []];

      if (property === 'downloadURLs') {
        urlArray[0] = [...accepted];
        urlArray[1] = [...accepted];
        urlArray[2] = [...accepted];

        idArray[0] = [...accepted];
        idArray[1] = [...accepted];
        idArray[2] = [...accepted];
      } else {
        urlArray = [...this.state[object][property]];
        idArray = [...this.state[object][`${property}Id`]];
      }

      let promiseArray = [];
      accepted.forEach((file, index) => {
        // devo triplicare ogni immagine del post per le traduzioni
        // ma non grundriss o cover
        if (property === 'downloadURLs') {
          for (let i = 0; i < 3; i++) {
            promiseArray.push(
              new Promise((resolve, reject) => {
                const carica = async () => {
                  const response = await this.fileUpload(file);
                  response &&
                    urlArray[i].splice(index, 1, response.data.source_url);
                  response && idArray[i].splice(index, 1, response.data.id);
                  resolve(index);
                };
                carica();
              })
            );
          }
        } else {
          promiseArray.push(
            new Promise((resolve, reject) => {
              const carica = async () => {
                const response = await this.fileUpload(file);
                response && urlArray.push(response.data.source_url);
                response && idArray.push(response.data.id);
                resolve(true);
              };
              carica();
            })
          );
        }
      });

      Promise.allSettled(promiseArray).then(() => {
        if (property === 'downloadURLs') {
          //elimino i placeholder (oggetti) di dropzone accepted che non sono stati sostituiti perché l'ivio
          //dell'immagine è fallito
          const sanitazeURL = urlArray[0].filter((e) => typeof e !== 'object');
          const sanitazeURL1 = urlArray[1].filter((e) => typeof e !== 'object');
          const sanitazeURL2 = urlArray[2].filter((e) => typeof e !== 'object');
          const sanitazeID = idArray[0].filter((e) => typeof e !== 'object');
          const sanitazeID1 = idArray[1].filter((e) => typeof e !== 'object');
          const sanitazeID2 = idArray[2].filter((e) => typeof e !== 'object');
          sanitazeURL.unshift(...this.state.oggetti.downloadURLs[0]);
          sanitazeURL1.unshift(...this.state.oggetti.downloadURLs[1]);
          sanitazeURL2.unshift(...this.state.oggetti.downloadURLs[2]);
          sanitazeID.unshift(...this.state.oggetti.downloadURLsId[0]);
          sanitazeID1.unshift(...this.state.oggetti.downloadURLsId[1]);
          sanitazeID2.unshift(...this.state.oggetti.downloadURLsId[2]);

          this.setState({
            oggetti: {
              ...this.state.oggetti,
              downloadURLs: [sanitazeURL, sanitazeURL1, sanitazeURL2],
              downloadURLsId: [sanitazeID, sanitazeID1, sanitazeID2],
            },
            spinner: false,
          });
        } else {
          this.setState({
            [object]: {
              ...this.state[object],
              [property]: urlArray,
              [`${property}Id`]: idArray,
            },
            spinner: false,
          });
        }
      });
    };

    fileUpload = async (file) => {
      this.setState({
        spinner: true,
      });
      // Get Token
      // generaToken();

      const url = `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media`;
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      try {
        const response = await post(url, formData, config);
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        this.setState({
          spinner: false,
        });
      }
    };

    sposta = (e, i, avanti) => {
      e.preventDefault();
      const urlArray = [...this.state.oggetti.downloadURLs];
      const idArray = [...this.state.oggetti.downloadURLsId];

      let direzione = i;
      avanti ? direzione-- : direzione++;

      riordinaImmagini(urlArray[0], i, direzione);
      riordinaImmagini(urlArray[1], i, direzione);
      riordinaImmagini(urlArray[2], i, direzione);

      riordinaImmagini(idArray[0], i, direzione);
      riordinaImmagini(idArray[1], i, direzione);
      riordinaImmagini(idArray[2], i, direzione);

      this.setState((prevState) => ({
        oggetti: {
          ...prevState.oggetti,
          downloadURLs: urlArray,
          downloadURLsId: idArray,
        },
      }));
    };

    handleRemovePicture = (e, picture, property, object) => {
      e.preventDefault();
      this.setState({ spinner: true });
      let idDe = false;
      let idEn = false;
      let idIt = false;
      let idGrundriss = false;

      if (property === 'downloadURLs') {
        const urlArray = [...this.state.oggetti.downloadURLs];

        urlArray[0].splice(picture, 1);
        urlArray[1].splice(picture, 1);
        urlArray[2].splice(picture, 1);

        const idArray = [...this.state.oggetti.downloadURLsId];

        idDe = idArray[0].splice(picture, 1);
        idEn = idArray[1].splice(picture, 1);
        idIt = idArray[2].splice(picture, 1);

        this.setState((prevState) => ({
          oggetti: {
            ...prevState.oggetti,
            downloadURLs: urlArray,
            downloadURLsId: idArray,
          },
        }));
      } else {
        let urlArray = [...this.state[object][property]];
        console.log(urlArray);
        urlArray.splice(picture, 1);
        console.log(urlArray);

        if (urlArray === undefined || urlArray.length < 1) {
          urlArray = [];
        }

        let idArray = [...this.state[object][`${property}Id`]];
        console.log(idArray);
        // se cancello grundriss passo l'id del media alla variabile idGrundriss
        // altrimenti sto cancellando cover e basta togliere l'id feature_media da post
        if (property === 'downloadURLsGrundriss') {
          idGrundriss = idArray.splice(picture, 1);
        } else {
          idArray.splice(picture, 1);
        }
        console.log(idArray);

        if (idArray === undefined || idArray.length < 1) {
          idArray = [];
        }
        this.setState((prevState) => ({
          [object]: {
            ...prevState[object],
            [property]: urlArray,
            [`${property}Id`]: idArray,
          },
        }));
      }

      // se cancello l'immagine di copertina devo cancellare il campo featured_media dal post
      if (property === 'downloadURLsCover') {
        axios
          .put(
            `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/estate_property/${this.state.oggetti.postId}`,
            { featured_media: 0 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.setState({
              spinner: false,
            });
          });
      } else if (property === 'downloadURLsGrundriss') {
        // se cancello altre immagini devo cancellare il campo post da ogni singolo media
        axios
          .put(
            `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${idGrundriss}`,
            { post: 0 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.setState({
              spinner: false,
            });
          });
      } else if (property === 'downloadURLs') {
        axios
          .put(
            `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${idDe}`,
            { post: 0 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.setState({
              spinner: false,
            });
          });
        axios
          .put(
            `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${idEn}`,
            { post: 0 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.setState({
              spinner: false,
            });
          });
        axios
          .put(
            `${process.env.REACT_APP_WPAPI}/wp-json/wp/v2/media/${idIt}`,
            { post: 0 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.setState({
              spinner: false,
            });
          });
      } else {
        this.setState({
          spinner: false,
        });
      }
    };

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
      if (e.target.value.length > 3) {
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
            error: 'customer_already_registered',
            modalContent: match,
          }));
        } else {
          this.setState(() => ({ error: '' }));
        }
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

    render() {
      return (
        <Component
          renderModal={this.renderModal}
          renderError={this.renderError}
          renderInput={this.renderInput}
          renderSingleDate={this.renderSingleDate}
          renderDateRange={this.renderDateRange}
          renderTextArea={this.renderTextArea}
          renderCheckbox={this.renderCheckbox}
          renderSelect={this.renderSelect}
          renderUploadImage={this.renderUploadImage}
          changeHandler={this.changeHandler}
          changeHandlerSelect={this.changeHandlerSelect}
          changeHandlerSelectEvaluation={this.changeHandlerSelectEvaluation}
          changeHandlerValuta={this.changeHandlerValuta}
          changeHandlerValidate={this.changeHandlerValidate}
          onDataChange={this.onDataChange}
          onFocusChange={this.onFocusChange}
          onFocusChange2={this.onFocusChange2}
          onDatesChange={this.onDatesChange}
          changeCheckbox={this.changeCheckbox}
          fileUpload={this.fileUpload}
          {...this.props}
          data={this.state}
        />
      );
    }
  };
}

export default withForm;
