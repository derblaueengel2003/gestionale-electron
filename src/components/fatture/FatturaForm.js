import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class FatturaForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  constructor(props) {
    super(props);
    this.state = {
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
      error: '',
      modificato: '',
      note: props.fattura ? props.fattura.note : ''
    };
  }
  onNumeroFatturaChange = e => {
    const numeroFattura = e.target.value;
    this.setState(() => ({
      numeroFattura,
      modificato: {
        ...this.state.modificato,
        numeroFattura: 'modificato'
      }
    }));
  };
  onDataFatturaChange = dataFattura => {
    if (dataFattura) {
      this.setState(() => ({ dataFattura }));
    } else {
      this.setState(() => ({ dataFattura: null }));
    }
  };
  onFocusDataFatturaChange = ({ focused }) => {
    this.setState(() => ({ calendarDataFatturaFocused: focused }));
  };
  onDataZahlungserinnerungChange = dataZahlungserinnerung => {
    if (dataZahlungserinnerung) {
      this.setState(() => ({ dataZahlungserinnerung }));
    } else {
      this.setState(() => ({ dataZahlungserinnerung: null }));
    }
  };
  onFocusDataZahlungserinnerungChange = ({ focused }) => {
    this.setState(() => ({
      calendarDataZahlungserinnerungFocused: focused
    }));
  };
  onDataMahnungChange = dataMahnung => {
    if (dataMahnung) {
      this.setState(() => ({ dataMahnung }));
    } else {
      this.setState(() => ({ dataMahnung: null }));
    }
  };
  onFocusDataMahnungChange = ({ focused }) => {
    this.setState(() => ({ calendarDataMahnungFocused: focused }));
  };
  onDataMahnung2Change = dataMahnung2 => {
    if (dataMahnung2) {
      this.setState(() => ({ dataMahnung2 }));
    } else {
      this.setState(() => ({ dataMahnung2: null }));
    }
  };
  onFocusDataMahnung2Change = ({ focused }) => {
    this.setState(() => ({ calendarDataMahnung2Focused: focused }));
  };
  onPayedChange = () => {
    this.setState(() => ({ payed: !this.state.payed }));
    if (this.state.payed === false) {
      this.setState(() => ({ payedAt: null }));
    }
  };
  onPayedAtDateChange = payedAt => {
    if (payedAt) {
      this.setState(() => ({ payedAt }));
    } else {
      this.setState(() => ({ payedAt: null }));
    }
  };
  onFocusPayedAtChange = ({ focused }) => {
    this.setState(() => ({ calendarPayedAtFocused: focused }));
  };
  onDealIdChange = e => {
    const dealId = e.value;
    this.setState(() => ({ dealId }));
  };
  onClienteIdChange = e => {
    const clienteId = e ? e.value : '';
    this.setState(() => ({ clienteId }));
  };
  onClienteIdChange2 = e => {
    const clienteId2 = e ? e.value : '';
    this.setState(() => ({ clienteId2 }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  changeHandlerValuta = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value || value.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({
        [name]: value
      }));
    }
  };
  onSubmit = e => {
    e.preventDefault();
    const mahngebuehren =
      parseFloat(this.state.mahngebuehren.replace(/,/, '.'), 10) * 100;
    const mahngebuehren2 =
      parseFloat(this.state.mahngebuehren2.replace(/,/, '.'), 10) * 100;

    if (!this.state.numeroFattura || !this.state.dataFattura) {
      this.setState(() => ({
        error: 'Datum und Rechnungsnummer bitte eingeben'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        dealId: this.state.dealId,
        clienteId: this.state.clienteId,
        clienteId2: this.state.clienteId2,
        numeroFattura: this.state.numeroFattura,
        dataFattura: this.state.dataFattura
          ? this.state.dataFattura.valueOf()
          : null,
        dataZahlungserinnerung: this.state.dataZahlungserinnerung
          ? this.state.dataZahlungserinnerung.valueOf()
          : null,
        dataMahnung: this.state.dataMahnung
          ? this.state.dataMahnung.valueOf()
          : null,
        dataMahnung2: this.state.dataMahnung2
          ? this.state.dataMahnung2.valueOf()
          : null,
        mahngebuehren,
        mahngebuehren2,
        payed: this.state.payed,
        payedAt: this.state.payedAt ? this.state.payedAt.valueOf() : null,
        note: this.state.note
      });
    }
  };
  render() {
    const { t } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));
    const filterOptions = createFilterOptions({ options });

    const dealIdOptions = this.props.deals.map(deal => ({
      value: deal.id,
      label: `${
        this.props.oggetti.find(ogg => ogg.id === deal.oggettoId).rifId
      } - 
                        ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).via
                        } 
                        ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).numeroCivico
                        },
                        WE ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).numeroAppartamento
                        }`
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {t('Vendita')}:
        <Select
          name='dealId'
          value={this.state.dealId}
          options={dealIdOptions}
          onChange={this.onDealIdChange}
        />
        {t('Cliente')}:
        <Select
          name='clienteId'
          value={this.state.clienteId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onClienteIdChange}
        />
        2. {t('Cliente')}:
        <Select
          name='clienteId2'
          value={this.state.clienteId2}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onClienteIdChange2}
        />
        {t('Numero fattura')}:
        <input
          className={`text-input text-input--${this.state.modificato.numeroFattura}`}
          type='text'
          placeholder='Rechnungsnummer'
          value={this.state.numeroFattura}
          onChange={this.onNumeroFatturaChange}
        />
        {t('Data fattura')}:
        <SingleDatePicker
          date={this.state.dataFattura}
          onDateChange={this.onDataFatturaChange}
          focused={this.state.calendarDataFatturaFocused}
          onFocusChange={this.onFocusDataFatturaChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Data sollecito')}:
        <SingleDatePicker
          date={this.state.dataZahlungserinnerung}
          onDateChange={this.onDataZahlungserinnerungChange}
          focused={this.state.calendarDataZahlungserinnerungFocused}
          onFocusChange={this.onFocusDataZahlungserinnerungChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        1. {t('Sollecito con penale')}:
        <SingleDatePicker
          date={this.state.dataMahnung}
          onDateChange={this.onDataMahnungChange}
          focused={this.state.calendarDataMahnungFocused}
          onFocusChange={this.onFocusDataMahnungChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        1. {t('Penale')}:
        <input
          name='mahngebuehren'
          className={`text-input `}
          type='text'
          placeholder={`7,50`}
          value={this.state.mahngebuehren}
          onChange={this.changeHandlerValuta}
        />
        2. {t('Sollecito con penale')}:
        <SingleDatePicker
          date={this.state.dataMahnung2}
          onDateChange={this.onDataMahnung2Change}
          focused={this.state.calendarDataMahnung2Focused}
          onFocusChange={this.onFocusDataMahnung2Change}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        2. {t('Penale')}:
        <input
          name='mahngebuehren2'
          className={`text-input `}
          type='text'
          placeholder={`15`}
          value={this.state.mahngebuehren2}
          onChange={this.changeHandlerValuta}
        />
        <label>
          <input
            type='checkbox'
            name='payed'
            checked={this.state.payed}
            onChange={this.onPayedChange}
          />
          <span>{t('Pagato')}</span>
        </label>
        <div className={`visible-${this.state.payed} form`}>
          {t('Pagato il')}:
          <SingleDatePicker
            date={this.state.payedAt}
            onDateChange={this.onPayedAtDateChange}
            focused={this.state.calendarPayedAtFocused}
            onFocusChange={this.onFocusPayedAtChange}
            showClearDate={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDate={true}
          />
        </div>
        <textarea
          className={`textarea text-input--${this.state.modificato.note}`}
          placeholder={`Hier kann mann die Rechnung anpassen, z.B.: 
Schlüssel Übergabe:        10 €
+19% MWSt.:                1,9 €
_________________________________
Gesamtbetrag:             11,9 €`}
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>
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
  deals: state.deals,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(withTranslation()(FatturaForm));
