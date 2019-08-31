import React from 'react';
import { connect } from 'react-redux';
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
    if (match.length === 1) {
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

    if (!this.state.nome || !this.state.cognome) {
      this.setState(() => ({ error: 'Inserisci nome e cognome.' }));
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
        email: this.state.email,
        consulenteVenditaId: this.state.consulenteVenditaId,
        telefono1: this.state.telefono1,
        codiceFiscale: this.state.codiceFiscale,
        handelsRegisterNummer: this.state.handelsRegisterNummer,
        bank: this.state.bank,
        iban: this.state.iban,
        bic: this.state.bic,
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        Cliente di:
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
        Titolo:
        <input
          name='titolo'
          className={`text-input`}
          type='text'
          autoFocus
          placeholder='Titolo'
          value={this.state.titolo}
          onChange={this.changeHandler}
        />
        Nome:
        <input
          name='nome'
          className={`text-input`}
          type='text'
          placeholder='Nome'
          value={this.state.nome}
          onChange={this.changeHandler}
        />
        Cognome:
        <input
          name='cognome'
          className={`text-input`}
          type='text'
          placeholder='Cognome'
          value={this.state.cognome}
          onChange={this.changeHandlerValidate}
        />
        Data di Nascita:
        <SingleDatePicker
          date={this.state.dataDiNascita}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        Codice Fiscale:
        <input
          name='codiceFiscale'
          className={`text-input`}
          type='text'
          placeholder='per residenti in Germania'
          value={this.state.codiceFiscale}
          onChange={this.changeHandler}
        />
        Ditta:
        <input
          name='ditta'
          className={`text-input`}
          type='text'
          placeholder='Ditta'
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
        Indirizzo:
        <input
          name='indirizzo'
          className={`text-input`}
          type='text'
          placeholder='Via e numero civico'
          value={this.state.indirizzo}
          onChange={this.changeHandler}
        />
        Indirizzo ulteriore:
        <input
          name='indirizzo2'
          className={`text-input`}
          type='text'
          placeholder='c/o'
          value={this.state.indirizzo2}
          onChange={this.changeHandler}
        />
        Cap:
        <input
          name='cap'
          className={`text-input`}
          type='text'
          placeholder='cap'
          value={this.state.cap}
          onChange={this.changeHandler}
        />
        Città:
        <input
          name='comune'
          className={`text-input`}
          type='text'
          placeholder='Città'
          value={this.state.comune}
          onChange={this.changeHandler}
        />
        Nazione:
        <input
          name='nazione'
          className={`text-input`}
          type='text'
          placeholder='Nazione'
          value={this.state.nazione}
          onChange={this.changeHandler}
        />
        Email:
        <input
          name='email'
          className={`text-input`}
          type='text'
          placeholder='indirizzo email'
          value={this.state.email}
          onChange={this.changeHandlerValidate}
        />
        Telefono:
        <input
          name='telefono1'
          className={`text-input`}
          type='text'
          placeholder='Numero di telefono'
          value={this.state.telefono1}
          onChange={this.changeHandler}
        />
        Banca:
        <input
          name='bank'
          className={`text-input`}
          type='text'
          placeholder='Dati bancari del cliente'
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
          placeholder='Nota  (opzionale)'
          value={this.state.note}
          onChange={this.changeHandler}
        ></textarea>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <div>
          <button className='button'>Salva</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  utenti: state.utenti,
  clienti: state.clienti
});

export default connect(mapStateToProps)(CustomerForm);
