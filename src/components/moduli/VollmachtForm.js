import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
      this.setState(() => ({
        error: this.props.t('Inserisci acquirente e oggetto')
      }));
    } else {
      this.setState(() => ({ error: '' }));
      delegaDocumenti(cliente, cliente2, oggetto, this.props.firma);
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

    const oggettiOptions = this.props.oggetti.map(oggetto => ({
      value: oggetto.id,
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Delega per richiesta documenti')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className='form__error'>{this.state.error}</p>
          )}
          {t('Cliente')}:
          <Select
            name='venditore'
            value={this.state.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange}
          />
          2. {t('Cliente')}:
          <Select
            name='venditore2'
            value={this.state.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange2}
          />
          {t('Oggetto')}:
          <Select
            name='oggettoId'
            value={this.state.oggettoId}
            options={oggettiOptions}
            onChange={this.onOggettoChange}
          />
          <div>
            <button className='btn-floating right'>
              <i className='material-icons'>picture_as_pdf</i>
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

export default connect(mapStateToProps)(withTranslation()(VollmachtForm));
