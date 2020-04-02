import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import moment from 'moment';

export class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: props.customer ? props.customer.nome : '',
      cognome: props.customer ? props.customer.cognome : '',
      calendarFocused: false,
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
      calendarDataConsensoDSGVOFocused: false
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeHandlerValidate = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    let match = this.props.clienti.filter(ilcliente => {
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
  onDateChange = dataDiNascita => {
    if (dataDiNascita) {
      this.setState(() => ({ dataDiNascita }));
    } else {
      this.setState(() => ({ dataDiNascita: null }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onConsulenteVenditaChange = e => {
    const consulenteVenditaId = e ? e.value : '';
    this.setState(() => ({ consulenteVenditaId }));
  };

  onDataRegistrazioneChange = dataRegistrazione => {
    if (dataRegistrazione) {
      this.setState(() => ({ dataRegistrazione }));
    } else {
      this.setState(() => ({ dataRegistrazione: null }));
    }
  };
  onFocusDataRegistrazioneChange = ({ focused }) => {
    this.setState(() => ({ calendarDataRegistrazioneFocused: focused }));
  };
  onDataConsensoDSGVOChange = dataConsensoDSGVO => {
    if (dataConsensoDSGVO) {
      this.setState(() => ({ dataConsensoDSGVO }));
    } else {
      this.setState(() => ({ dataConsensoDSGVO: null }));
    }
  };
  onFocusDataConsensoDSGVOChange = ({ focused }) => {
    this.setState(() => ({ calendarDataConsensoDSGVOFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.cognome) {
      this.setState(() => ({
        error: 'Vorname und Name bitte eingeben.'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        nome: this.state.nome,
        cognome: this.state.cognome,
        titolo: this.state.titolo,
        dataDiNascita: this.state.dataDiNascita
          ? this.state.dataDiNascita.valueOf()
          : null,
        ditta: this.state.ditta,
        indirizzo: this.state.indirizzo,
        indirizzo2: this.state.indirizzo2,
        cap: this.state.cap,
        comune: this.state.comune,
        nazione: this.state.nazione,
        lingua: this.state.lingua,
        email: this.state.email,
        consulenteVenditaId: this.state.consulenteVenditaId,
        telefono1: this.state.telefono1,
        fax: this.state.fax,
        cellulare: this.state.cellulare,
        codiceFiscale: this.state.codiceFiscale,
        handelsRegisterNummer: this.state.handelsRegisterNummer,
        bank: this.state.bank,
        iban: this.state.iban,
        bic: this.state.bic,
        visible: this.state.visible,
        www: this.state.www,
        note: this.state.note,
        dataRegistrazione: this.state.dataRegistrazione
          ? this.state.dataRegistrazione.valueOf()
          : null,
        dataConsensoDSGVO: this.state.dataConsensoDSGVO
          ? this.state.dataConsensoDSGVO.valueOf()
          : null,
        consensoDSGVO: this.state.consensoDSGVO
      });
    }
  };
  render() {
    const { t } = this.props;
    const consulenteVenditaOptions = this.props.utenti.map(consulente => ({
      value: consulente.id,
      label: consulente.name
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {this.state.error && (
          <div>
            <p className='form__error'>{this.state.error}</p>
            <Link to={`customer/`} target='_blank' className='btn'>
              {t('Verificare')}
            </Link>
          </div>
        )}
        {t('Data registrazione dati del cliente')}:
        <SingleDatePicker
          date={
            this.state.dataRegistrazione
              ? this.state.dataRegistrazione
              : moment()
          }
          onDateChange={this.onDataRegistrazioneChange}
          focused={this.state.calendarDataRegistrazioneFocused}
          onFocusChange={this.onFocusDataRegistrazioneChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Consulente vendita')}:
        <Select
          name='consulentevendita'
          value={this.state.consulenteVenditaId}
          options={consulenteVenditaOptions}
          onChange={this.onConsulenteVenditaChange}
        />
        {t('Titolo')}:
        <input
          name='titolo'
          className={`text-input`}
          type='text'
          autoFocus
          placeholder='Herr, Frau'
          value={this.state.titolo}
          onChange={this.changeHandler}
        />
        {t('Nome')}:
        <input
          name='nome'
          className={`text-input`}
          type='text'
          value={this.state.nome}
          onChange={this.changeHandler}
        />
        {t('Cognome')}:
        <input
          name='cognome'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          value={this.state.cognome}
          onChange={this.changeHandlerValidate}
        />
        {t('Email')}:
        <input
          name='email'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          placeholder='info@esempio.it'
          value={this.state.email}
          onChange={this.changeHandlerValidate}
        />
        {t('Telefono fisso')}:
        <input
          name='telefono1'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.state.telefono1}
          onChange={this.changeHandler}
        />
        Fax:
        <input
          name='fax'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.state.fax}
          onChange={this.changeHandler}
        />
        {t('Cellulare')}:
        <input
          name='cellulare'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.state.cellulare}
          onChange={this.changeHandler}
        />
        {t('Sito web')}:
        <input
          name='www'
          className={`text-input`}
          type='text'
          value={this.state.www}
          onChange={this.changeHandler}
        />
        {t('Data di nascita')}:
        <SingleDatePicker
          date={this.state.dataDiNascita}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Codice fiscale tedesco')}:
        <input
          name='codiceFiscale'
          className={`text-input`}
          type='text'
          placeholder='wenn Wohnsitz in Deutschland'
          value={this.state.codiceFiscale}
          onChange={this.changeHandler}
        />
        {t('Ditta')}:
        <input
          name='ditta'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          placeholder='Firma'
          value={this.state.ditta}
          onChange={this.changeHandlerValidate}
        />
        {t('Numero iscrizione registro delle imprese')}:
        <input
          name='handelsRegisterNummer'
          className={`text-input`}
          type='text'
          placeholder='HRA HRB '
          value={this.state.handelsRegisterNummer}
          onChange={this.changeHandler}
        />
        {t('Indirizzo')}:
        <input
          name='indirizzo'
          className={`text-input`}
          type='text'
          placeholder='Straße und Nr.'
          value={this.state.indirizzo}
          onChange={this.changeHandler}
        />
        {t('Estensione indirizzo')}:
        <input
          name='indirizzo2'
          className={`text-input`}
          type='text'
          placeholder='c/o'
          value={this.state.indirizzo2}
          onChange={this.changeHandler}
        />
        {t('CAP')}:
        <input
          name='cap'
          className={`text-input`}
          type='text'
          placeholder='Postleitzahl'
          value={this.state.cap}
          onChange={this.changeHandler}
        />
        {t('Città')}:
        <input
          name='comune'
          className={`text-input`}
          type='text'
          placeholder='Stadt'
          value={this.state.comune}
          onChange={this.changeHandler}
        />
        {t('Nazione')}:
        <input
          name='nazione'
          className={`text-input`}
          type='text'
          placeholder='Staat'
          value={this.state.nazione}
          onChange={this.changeHandler}
        />
        {t('Lingua')}:
        <input
          name='lingua'
          className={`text-input`}
          type='text'
          placeholder='Sprache'
          value={this.state.lingua}
          onChange={this.changeHandler}
        />
        {t('Banca')}:
        <input
          name='bank'
          className={`text-input`}
          type='text'
          placeholder='Bankdaten'
          value={this.state.bank}
          onChange={this.changeHandler}
        />
        IBAN:
        <input
          name='iban'
          className={`text-input`}
          type='text'
          placeholder='IBAN'
          value={this.state.iban}
          onChange={this.changeHandler}
        />
        BIC/SWIFT:
        <input
          name='bic'
          className={`text-input`}
          type='text'
          placeholder='BIC/SWIFT'
          value={this.state.bic}
          onChange={this.changeHandler}
        />
        <textarea
          name='note'
          className={`textarea text-input`}
          placeholder='Note'
          value={this.state.note}
          onChange={this.changeHandler}
        ></textarea>
        {this.props.utente.role === 'Admin' ? (
          <label>
            <input
              type='checkbox'
              name='visible'
              checked={this.state.visible}
              onChange={() => {
                this.setState(() => ({
                  visible: !this.state.visible
                }));
              }}
            />
            <span>{t('Visibile')}</span>
          </label>
        ) : (
          ''
        )}
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <label>
          <input
            type='checkbox'
            name='consensoDSGVO'
            checked={this.state.consensoDSGVO}
            onChange={() => {
              this.setState(() => ({
                consensoDSGVO: !this.state.consensoDSGVO
              }));
            }}
          />
          <span>{t('Consenso al trattamento dei dati personali')}</span>
        </label>
        {t('Data consenso')}:
        <SingleDatePicker
          date={this.state.dataConsensoDSGVO}
          onDateChange={this.onDataConsensoDSGVOChange}
          focused={this.state.calendarDataConsensoDSGVOFocused}
          onFocusChange={this.onFocusDataConsensoDSGVOChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
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
  utenti: state.utenti,
  clienti: state.clienti,
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
});

export default connect(mapStateToProps)(withTranslation()(CustomerForm));
