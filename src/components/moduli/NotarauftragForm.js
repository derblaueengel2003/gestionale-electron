import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { vollmachtNotarauftrag } from './VollmachtNotarauftrag';

export class NotarauftragForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acquirenteId: '',
      acquirenteId2: '',
      venditoreId: '',
      venditoreId2: '',
      oggettoId: '',
      prezzoDiVendita: '',
      notaioId: ''
    };
  }
  onAcquirenteIdChange = e => {
    const acquirenteId = e ? e.value : '';
    this.setState(() => ({ acquirenteId }));
  };
  onAcquirenteIdChange2 = e => {
    const acquirenteId2 = e ? e.value : '';
    this.setState(() => ({ acquirenteId2 }));
  };
  onVenditoreIdChange = e => {
    const venditoreId = e ? e.value : '';
    this.setState(() => ({ venditoreId }));
  };
  onVenditoreIdChange2 = e => {
    const venditoreId2 = e ? e.value : '';
    this.setState(() => ({ venditoreId2 }));
  };
  onNotaioIdChange = e => {
    const notaioId = e ? e.value : '';
    this.setState(() => ({ notaioId }));
  };
  onOggettoChange = e => {
    const oggetto = e ? e.value : '';
    this.setState(() => ({ oggettoId: oggetto }));
  };
  onPrezzoDiVenditaChange = e => {
    const prezzoDiVendita = e.target.value;

    if (!prezzoDiVendita || prezzoDiVendita.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({ prezzoDiVendita }));
    }
  };

  findContact = contactId => {
    return this.props.clienti.filter(cliente => cliente.id === contactId);
  };
  onSubmit = e => {
    e.preventDefault();
    const acquirente = this.findContact(this.state.acquirenteId);
    const acquirente2 = this.findContact(this.state.acquirenteId2);
    const venditore = this.findContact(this.state.venditoreId);
    const venditore2 = this.findContact(this.state.venditoreId2);
    const notaio = this.findContact(this.state.notaioId);
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.state.oggettoId
    );
    const prezzoDiVendita = this.state.prezzoDiVendita * 100;

    if (!this.state.oggettoId) {
      this.setState(() => ({ error: this.props.t('Inserisci oggetto') }));
    } else {
      this.setState(() => ({ error: '' }));
      vollmachtNotarauftrag(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        prezzoDiVendita,
        this.props.firma
      );
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
            <h1>{t('Delega richiesta bozza di contratto')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className='form__error'>{this.state.error}</p>
          )}
          {t('Acquirente')}:
          <Select
            name='acquirente'
            value={this.state.acquirenteId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onAcquirenteIdChange}
          />
          2. {t('Acquirente')}:
          <Select
            name='acquirente2'
            value={this.state.acquirenteId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onAcquirenteIdChange2}
          />
          {t('Venditore')}:
          <Select
            name='venditore'
            value={this.state.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange}
          />
          2. {t('Venditore')}:
          <Select
            name='venditore2'
            value={this.state.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange2}
          />
          {t('Notaio')}:
          <Select
            name='notaioId'
            value={this.state.notaioId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onNotaioIdChange}
          />
          {t('Oggetto')}:
          <Select
            name='oggettoId'
            value={this.state.oggettoId}
            options={oggettiOptions}
            onChange={this.onOggettoChange}
          />
          {t('Prezzo di vendita')}:
          <input
            className={`text-input`}
            type='text'
            placeholder='solo numeri'
            value={this.state.prezzoDiVendita}
            onChange={this.onPrezzoDiVenditaChange}
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

export default connect(mapStateToProps)(withTranslation()(NotarauftragForm));
