import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { widerrufsBelehrung } from './WiderrufsBelehrung';

export class VWBForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venditoreId: '',
      venditoreId2: '',
      oggettoId: '',
      createdAt: null,
      calendarFocused: false
    };
  }
  onVenditoreIdChange = e => {
    const venditoreId = e ? e.value : '';
    this.setState(() => ({ venditoreId }));
  };
  onVenditoreIdChange2 = e => {
    const venditoreId2 = e ? e.value : '';
    this.setState(() => ({ venditoreId2 }));
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

  onSubmit = e => {
    e.preventDefault();
    const venditore = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId
    );
    const venditore2 = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.state.oggettoId
    );
    const createdAt = moment(this.state.createdAt).format('DD.MM.YYYY');

    if (!this.state.oggettoId || !this.state.venditoreId) {
      this.setState(() => ({ error: 'Verkäufer und Objekt bitte eingeben.' }));
    } else {
      this.setState(() => ({ error: '' }));
      widerrufsBelehrung(
        venditore,
        venditore2,
        createdAt,
        oggetto,
        this.props.firma
      );
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
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>Verbraucher WiderrufsBelehrung</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className='form__error'>{this.state.error}</p>
          )}
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
          Objekt:
          <Select
            name='oggettoId'
            value={this.state.oggettoId}
            options={oggettiOptions}
            onChange={this.onOggettoChange}
          />
          Auftragsdatum:
          <div className='input-group__item'>
            <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDate={true}
            />
          </div>
          <div>
            <button className='button button--secondary-modulistica'>
              PDF erstellen
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clienti: state.clienti,
  oggetti: state.oggetti,
  firma: state.firma[0]
});

export default connect(mapStateToProps)(VWBForm);
