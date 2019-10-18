import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export class DealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      payedAgenziaPartner: props.deal ? props.deal.payedAgenziaPartner : false,
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
      belastungsVollmacht: props.deal ? props.deal.belastungsVollmacht : false,
      note: props.deal ? props.deal.note : '',
      error: '',
      modificato: '',
      provvSum: 0
    };
  }

  onDealTypeChange = e => {
    const dealType = e ? e.value : '';
    this.setState(() => ({ dealType }));
  };
  onLinguaRogitoChange = e => {
    const linguaRogito = e ? e.value : '';
    this.setState(() => ({ linguaRogito }));
  };
  onOggettoChange = e => {
    const oggetto = e ? e.value : '';
    this.setState(() => ({ oggettoId: oggetto }));
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    } else {
      this.setState(() => ({ createdAt: null }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onConsulenteVenditaChange = e => {
    const consulenteVendita = e ? e.value : '';
    this.setState(() => ({ consulenteVendita }));
  };
  onPayedAtDateStefanoChange = payedAtStefano => {
    if (payedAtStefano) {
      this.setState(() => ({ payedAtStefano }));
    } else {
      this.setState(() => ({ payedAtStefano: null }));
    }
  };
  onFocusPayedAtStefanoChange = ({ focused }) => {
    this.setState(() => ({ calendarPayedAtStefanoFocused: focused }));
  };
  onAgenziaPartnerChange = e => {
    const agenziaPartnerId = e ? e.value : '';
    this.setState(() => ({ agenziaPartnerId }));
  };
  onVenditoreIdChange = e => {
    const venditoreId = e ? e.value : '';
    this.setState(() => ({ venditoreId }));
  };
  onVenditoreIdChange2 = e => {
    const venditoreId2 = e ? e.value : '';
    this.setState(() => ({ venditoreId2 }));
  };
  onAcquirenteIdChange = e => {
    const acquirenteId = e ? e.value : '';
    this.setState(() => ({ acquirenteId }));
  };
  onAcquirenteIdChange2 = e => {
    const acquirenteId2 = e ? e.value : '';
    this.setState(() => ({ acquirenteId2 }));
  };
  onNotaioIdChange = e => {
    const notaioId = e ? e.value : '';
    this.setState(() => ({ notaioId }));
  };
  onDataRogitoChange = dataRogito => {
    if (dataRogito) {
      this.setState(() => ({ dataRogito }));
    } else {
      this.setState(() => ({ dataRogito: null }));
    }
  };
  onFocusDataRogitoChange = ({ focused }) => {
    this.setState(() => ({ calendarDataRogitoFocused: focused }));
  };
  onDataConsegnaChange = dataConsegna => {
    if (dataConsegna) {
      this.setState(() => ({ dataConsegna }));
    } else {
      this.setState(() => ({ dataConsegna: null }));
    }
  };
  onFocusDataConsegnaChange = ({ focused }) => {
    this.setState(() => ({ calendarDataConsegnaFocused: focused }));
  };

  //Nuovi change Handler
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  changeHandlerValuta = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value || value.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({
        [name]: value,
        modificato: { ...this.state.modificato, [name]: 'modificato' }
      }));
    }
  };
  onSubmit = e => {
    e.preventDefault();
    const prezzoDiVendita =
      parseFloat(this.state.prezzoDiVendita.replace(/,/, '.'), 10) * 100;
    const amount = parseFloat(this.state.amount.replace(/,/, '.'), 10) * 100;
    const provvM2square =
      parseFloat(this.state.provvM2square.replace(/,/, '.'), 10) * 100;
    const provvStefano =
      parseFloat(this.state.provvStefano.replace(/,/, '.'), 10) * 100;
    const provvAgenziaPartner =
      parseFloat(this.state.provvAgenziaPartner.replace(/,/, '.'), 10) * 100;
    const provvSum = provvM2square + provvStefano + provvAgenziaPartner;

    if (
      !this.state.oggettoId ||
      !this.state.amount ||
      !this.state.acquirenteId
    ) {
      this.setState(() => ({
        error: 'Objekt, Summe und Käufer bitte ausfüllen.'
      }));
    } else if (amount !== provvSum) {
      const differenza = (provvSum - amount) / 100;
      this.setState(() => ({
        error: `Provisionen-Summe entrspricht nicht die Gesamtprovision. ${differenza} € Unterschied.`
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        oggettoId: this.state.oggettoId,
        prezzoDiVendita,
        amount,
        consulenteVendita: this.state.consulenteVendita,
        provvM2square,
        dealType: this.state.dealType,
        provvStefano,
        payedStefano: this.state.payedStefano,
        payedAtStefano: this.state.payedAtStefano
          ? this.state.payedAtStefano.valueOf()
          : null,
        agenziaPartnerId: this.state.agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner: this.state.payedAgenziaPartner,
        createdAt: this.state.createdAt ? this.state.createdAt.valueOf() : null,
        venditoreId: this.state.venditoreId,
        venditoreId2: this.state.venditoreId2,
        acquirenteId: this.state.acquirenteId,
        acquirenteId2: this.state.acquirenteId2,
        notaioId: this.state.notaioId,
        dataRogito: this.state.dataRogito
          ? this.state.dataRogito.valueOf()
          : null,
        dataConsegna: this.state.dataConsegna
          ? this.state.dataConsegna.valueOf()
          : null,
        linguaRogito: this.state.linguaRogito,
        belastungsVollmacht: this.state.belastungsVollmacht,
        calendarDataFatturaFocused: false,
        note: this.state.note
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

    const oggettiOptions = this.props.oggetti.map(oggetto => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));
    const dealTypeOptions = [
      'Kauf Eigentumswohnung',
      'Miete Eigentumswohnung',
      'Kauf Gewerbe',
      'Miete Gewerbe',
      'APH',
      'Sonstiges'
    ].map(dealType => ({
      value: dealType,
      label: dealType
    }));
    const consulenteVenditaOptions = this.props.utenti.map(consulente => ({
      value: consulente.id,
      label: consulente.name
    }));
    const linguaRogitoOptions = [
      'Englisch',
      'Italienisch',
      'Spanisch',
      'Französisch',
      'Englisch-Italienisch',
      'Englisch-Französisch',
      'Englisch-Spanisch'
    ].map(linguaRogito => ({
      value: linguaRogito,
      label: linguaRogito
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <div>
          <button className='button button--secondary'>Speichern</button>
        </div>
        Provisiontyp:
        <Select
          name={'dealType'}
          value={this.state.dealType}
          options={dealTypeOptions}
          onChange={this.onDealTypeChange}
        />
        Objekt:
        <Select
          name='oggettoId'
          value={this.state.oggettoId}
          options={oggettiOptions}
          onChange={this.onOggettoChange}
        />
        Reservierungsdatum:
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        Verkaufspreis:
        <input
          name='prezzoDiVendita'
          className={`text-input text-input--${this.state.modificato.prezzoDiVendita}`}
          type='text'
          placeholder='Prezzo di vendita'
          value={this.state.prezzoDiVendita}
          onChange={this.changeHandlerValuta}
        />
        Gesamtprovision:
        <input
          name='amount'
          className={`text-input text-input--${this.state.modificato.amount}`}
          type='text'
          placeholder={`6%: ${parseFloat(
            this.state.prezzoDiVendita.replace(/,/, '.'),
            10
          ) * 0.06}`}
          value={this.state.amount}
          onChange={this.changeHandlerValuta}
        />
        Kundenbetreuer:
        <Select
          name='consulentevendita'
          value={this.state.consulenteVendita}
          options={consulenteVenditaOptions}
          onChange={this.onConsulenteVenditaChange}
        />
        Provision m2Square:
        <input
          name='provvM2square'
          className={`text-input text-input--${this.state.modificato.provvM2square}`}
          type='text'
          placeholder={`80%: ${parseFloat(
            this.state.amount.replace(/,/, '.') -
              this.state.provvAgenziaPartner.replace(/,/, '.'),
            10
          ) * 0.8}`}
          value={this.state.provvM2square}
          onChange={this.changeHandlerValuta}
        />
        Provision Kundenbetreuer:
        <input
          name='provvStefano'
          className={`text-input text-input--${this.state.modificato.provvStefano}`}
          type='text'
          placeholder={`20%: ${parseFloat(
            this.state.amount.replace(/,/, '.') -
              this.state.provvAgenziaPartner.replace(/,/, '.'),
            10
          ) * 0.2}`}
          value={this.state.provvStefano}
          onChange={this.changeHandlerValuta}
        />
        <label>
          Bezahlt&nbsp;
          <input
            type='checkbox'
            name='payedStefano'
            checked={this.state.payedStefano}
            onChange={() => {
              this.setState(() => ({
                payedStefano: !this.state.payedStefano,
                payedAtStefano: null
              }));
            }}
          />
        </label>
        <div className={`visible-${this.state.payedStefano} form`}>
          Bezahlt am:
          <SingleDatePicker
            date={this.state.payedAtStefano}
            onDateChange={this.onPayedAtDateStefanoChange}
            focused={this.state.calendarPayedAtStefanoFocused}
            onFocusChange={this.onFocusPayedAtStefanoChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDate={true}
          />
        </div>
        Kooperationspartner:
        <Select
          name='agenziapartner'
          value={this.state.agenziaPartnerId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onAgenziaPartnerChange}
        />
        Provision Kooperationspartner
        <input
          name='provvAgenziaPartner'
          className={`text-input text-input--${this.state.modificato.provvAgenziaPartner}`}
          type='text'
          placeholder='Provvigione Agenzia Partner'
          value={this.state.provvAgenziaPartner}
          onChange={this.changeHandlerValuta}
        />
        <label>
          Bezahlt&nbsp;
          <input
            type='checkbox'
            name='payedAgenziaPartner'
            checked={this.state.payedAgenziaPartner}
            onChange={() => {
              this.setState(() => ({
                payedAgenziaPartner: !this.state.payedAgenziaPartner
              }));
            }}
          />
        </label>
        Verkäufer:
        <Select
          name='venditore'
          value={this.state.venditoreId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onVenditoreIdChange}
        />
        2. Verkäufer:
        <Select
          name='venditore2'
          value={this.state.venditoreId2}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onVenditoreIdChange2}
        />
        Käufer:
        <Select
          name='acquirente'
          value={this.state.acquirenteId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onAcquirenteIdChange}
        />
        2. Käufer:
        <Select
          name='acquirente2'
          value={this.state.acquirenteId2}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onAcquirenteIdChange2}
        />
        Notar:
        <Select
          name='notaio'
          value={this.state.notaioId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onNotaioIdChange}
        />
        Beurkundungsdatum:
        <SingleDatePicker
          date={this.state.dataRogito}
          onDateChange={this.onDataRogitoChange}
          focused={this.state.calendarDataRogitoFocused}
          onFocusChange={this.onFocusDataRogitoChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        Beurkundungssprache:
        <Select
          name={'linguaRogito'}
          value={this.state.linguaRogito}
          options={linguaRogitoOptions}
          onChange={this.onLinguaRogitoChange}
        />
        <label>
          Belastungsvollmacht&nbsp;
          <input
            type='checkbox'
            name='belastungsVollmacht'
            checked={this.state.belastungsVollmacht}
            onChange={() => {
              this.setState(() => ({
                belastungsVollmacht: !this.state.belastungsVollmacht
              }));
            }}
          />
        </label>
        Übergabedatum:
        <SingleDatePicker
          date={this.state.dataConsegna}
          onDateChange={this.onDataConsegnaChange}
          focused={this.state.calendarDataConsegnaFocused}
          onFocusChange={this.onFocusDataConsegnaChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        <textarea
          name='note'
          className={`textarea text-input--${this.state.modificato.note}`}
          placeholder='Nota  (opzionale)'
          value={this.state.note}
          onChange={this.changeHandler}
        ></textarea>
        <div>
          <button className='button button--secondary'>Speichern</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  utenti: state.utenti,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(DealForm);
