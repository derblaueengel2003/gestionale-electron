import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: props.customer ? props.customer.nome : '',
      cognome: props.customer ? props.customer.cognome : '',
      titolo: props.customer ? props.customer.titolo : '',
      dataDiNascita: props.customer
        ? props.customer.dataDiNascita && moment(props.customer.dataDiNascita)
        : null,
      calendarFocused: false,
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
      codiceFiscale: props.customer ? props.customer.codiceFiscale : '',
      handelsRegisterNummer: props.customer
        ? props.customer.handelsRegisterNummer
        : '',
      bank: props.customer ? props.customer.bank : '',
      iban: props.customer ? props.customer.iban : '',
      bic: props.customer ? props.customer.bic : '',
      note: props.customer ? props.customer.note : '',
      visible: props.customer ? props.customer.visible : true,
      error: ''
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
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.cognome) {
      this.setState(() => ({ error: 'Vorname und Name bitte eingeben.' }));
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
        codiceFiscale: this.state.codiceFiscale,
        handelsRegisterNummer: this.state.handelsRegisterNummer,
        bank: this.state.bank,
        iban: this.state.iban,
        bic: this.state.bic,
        visible: this.state.visible,

        note: this.state.note
      });
    }
  };
  render() {
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
              Überprüfen
            </Link>
          </div>
        )}
        Kundenbetreuer:
        <select
          name='consulenteVenditaId'
          value={this.state.consulenteVenditaId}
          onChange={this.changeHandler}
        >
          <option></option>
          {this.props.utenti.map(consulente => (
            <option key={consulente.id} value={consulente.id}>
              {consulente.name}
            </option>
          ))}
        </select>
        Anrede:
        <input
          name='titolo'
          className={`text-input`}
          type='text'
          autoFocus
          placeholder='Herr, Frau'
          value={this.state.titolo}
          onChange={this.changeHandler}
        />
        Vorname:
        <input
          name='nome'
          className={`text-input`}
          type='text'
          placeholder='Vorname'
          value={this.state.nome}
          onChange={this.changeHandler}
        />
        Name:
        <input
          name='cognome'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          placeholder='Name'
          value={this.state.cognome}
          onChange={this.changeHandlerValidate}
        />
        E-Mail:
        <input
          name='email'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          placeholder='E-Mail Adresse'
          value={this.state.email}
          onChange={this.changeHandlerValidate}
        />
        Telefon:
        <input
          name='telefono1'
          className={`text-input`}
          type='text'
          placeholder='Telefonnummer'
          value={this.state.telefono1}
          onChange={this.changeHandler}
        />
        Geboren am:
        <SingleDatePicker
          date={this.state.dataDiNascita}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        Steuer ID-Nummer:
        <input
          name='codiceFiscale'
          className={`text-input`}
          type='text'
          placeholder='wenn Wohnsitz in Deutschland'
          value={this.state.codiceFiscale}
          onChange={this.changeHandler}
        />
        Firma:
        <input
          name='ditta'
          className={`text-input ${this.state.error && 'form__error'}`}
          type='text'
          placeholder='Firma'
          value={this.state.ditta}
          onChange={this.changeHandlerValidate}
        />
        Handelsregister-Nummer:
        <input
          name='handelsRegisterNummer'
          className={`text-input`}
          type='text'
          placeholder='HRA HRB '
          value={this.state.handelsRegisterNummer}
          onChange={this.changeHandler}
        />
        Adresse:
        <input
          name='indirizzo'
          className={`text-input`}
          type='text'
          placeholder='Straße und Nr.'
          value={this.state.indirizzo}
          onChange={this.changeHandler}
        />
        Zusatzadresse:
        <input
          name='indirizzo2'
          className={`text-input`}
          type='text'
          placeholder='c/o'
          value={this.state.indirizzo2}
          onChange={this.changeHandler}
        />
        PLZ:
        <input
          name='cap'
          className={`text-input`}
          type='text'
          placeholder='Postleitzahl'
          value={this.state.cap}
          onChange={this.changeHandler}
        />
        Stadt:
        <input
          name='comune'
          className={`text-input`}
          type='text'
          placeholder='Stadt'
          value={this.state.comune}
          onChange={this.changeHandler}
        />
        Staat:
        <input
          name='nazione'
          className={`text-input`}
          type='text'
          placeholder='Staat'
          value={this.state.nazione}
          onChange={this.changeHandler}
        />
        Sprache:
        <input
          name='lingua'
          className={`text-input`}
          type='text'
          placeholder='Sprache'
          value={this.state.lingua}
          onChange={this.changeHandler}
        />
        Bank:
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
            <span>Visible</span>
          </label>
        ) : (
          ''
        )}
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
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

export default connect(mapStateToProps)(CustomerForm);
