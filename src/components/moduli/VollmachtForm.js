import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { delegaDocumenti } from './DelegaDocumenti';

export class VollmachtForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venditoreId: '',
      venditoreId2: '',
      oggettoId: ''
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

  onSubmit = e => {
    e.preventDefault();
    const cliente = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId
    );
    const cliente2 = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.state.oggettoId
    );

    if (!this.state.oggettoId || !this.state.venditoreId) {
      this.setState(() => ({ error: 'Inserisci Venditore e Oggetto' }));
    } else {
      this.setState(() => ({ error: '' }));
      delegaDocumenti(cliente, cliente2, oggetto);
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
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Vollmacht Unterlagen</h1>
          </div>
        </div>
        <form className='form content-container' onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className='form__error'>{this.state.error}</p>
          )}
          Cliente:
          <Select
            name='venditore'
            value={this.state.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange}
          />
          Secondo Cliente:
          <Select
            name='venditore2'
            value={this.state.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange2}
          />
          Oggetto:
          <Select
            name='oggettoId'
            value={this.state.oggettoId}
            options={oggettiOptions}
            onChange={this.onOggettoChange}
          />
          <div>
            <button className='button button--secondary-modulistica'>
              Crea PDF
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(VollmachtForm);
