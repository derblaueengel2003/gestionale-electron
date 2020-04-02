import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { withTranslation } from 'react-i18next';
import { notarDatenblatt } from '../moduli/NotarDatenblatt';

class NotarDatenblattForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acquirenteId: '',
      acquirenteId2: '',
      venditoreId: '',
      venditoreId2: '',
      oggettoId: '',
      notaioId: '',
      belastungsVollmacht: false,
      prezzoDiVendita: '0',
      linguaRogito: ''
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
  onLinguaRogitoChange = e => {
    const linguaRogito = e ? e.value : '';
    this.setState(() => ({ linguaRogito }));
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
    const verwalter = this.findContact(oggetto.verwalter);

    if (!this.state.oggettoId) {
      this.setState(() => ({ error: this.props.t('Inserisci oggetto') }));
    } else {
      this.setState(() => ({ error: '' }));
      notarDatenblatt(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        verwalter[0],
        this.state.belastungsVollmacht,
        this.props.utente,
        this.props.firma,
        this.props.ceo,
        prezzoDiVendita,
        this.state.linguaRogito
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
      label: t(linguaRogito)
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Foglio informativo per il notaio')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className='form__error'>{this.state.error}</p>
          )}
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
          {t('Notaio')}:
          <Select
            name='notaio'
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
            name='prezzoDiVendita'
            className={`text-input`}
            type='text'
            placeholder='Prezzo di vendita'
            value={this.state.prezzoDiVendita}
            onChange={this.changeHandlerValuta}
          />
          {t('Lingua del rogito')}:
          <Select
            name={'linguaRogito'}
            value={this.state.linguaRogito}
            options={linguaRogitoOptions}
            onChange={this.onLinguaRogitoChange}
          />
          <label>
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
            <span>{t('Delega per gravami')}</span>
          </label>
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
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  utenti: state.utenti,
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  firma: state.firma[0]
});

export default connect(mapStateToProps)(withTranslation()(NotarDatenblattForm));
