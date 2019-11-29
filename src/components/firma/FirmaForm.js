import React from 'react';

export default class FirmaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.firma ? props.firma.name : '',
      name2: props.firma ? props.firma.name2 : '',
      adresse: props.firma ? props.firma.adresse : '',
      plz: props.firma ? props.firma.plz : '',
      stadt: props.firma ? props.firma.stadt : '',
      staat: props.firma ? props.firma.staat : '',
      telefon: props.firma ? props.firma.telefon : '',
      fax: props.firma ? props.firma.fax : '',
      email: props.firma ? props.firma.email : '',
      website: props.firma ? props.firma.website : '',
      steuerNr: props.firma ? props.firma.steuerNr : '',
      ustIdNr: props.firma ? props.firma.ustIdNr : '',
      motto: props.firma ? props.firma.motto : '',
      open: props.firma ? props.firma.open : '',
      kontoInhaber: props.firma ? props.firma.kontoInhaber : '',
      bank: props.firma ? props.firma.bank : '',
      iban: props.firma ? props.firma.iban : '',
      bic: props.firma ? props.firma.bic : ''
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      name: this.state.name,
      name2: this.state.name2,
      adresse: this.state.adresse,
      plz: this.state.plz,
      stadt: this.state.stadt,
      staat: this.state.staat,
      telefon: this.state.telefon,
      fax: this.state.fax,
      email: this.state.email,
      website: this.state.website,
      steuerNr: this.state.steuerNr,
      ustIdNr: this.state.ustIdNr,
      motto: this.state.motto,
      open: this.state.open,
      kontoInhaber: this.state.kontoInhaber,
      bank: this.state.bank,
      iban: this.state.iban,
      bic: this.state.bic
    });
  };
  render() {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        Name:
        <input
          name='name'
          className={`text-input`}
          type='text'
          autoFocus
          value={this.state.name}
          onChange={this.changeHandler}
        />
        Gesetzlicher Name:
        <input
          name='name2'
          className={`text-input`}
          type='text'
          autoFocus
          value={this.state.name2}
          onChange={this.changeHandler}
        />
        Adresse:
        <input
          name='adresse'
          className={`text-input`}
          type='text'
          value={this.state.adresse}
          onChange={this.changeHandler}
        />
        PLZ:
        <input
          name='plz'
          className={`text-input`}
          type='text'
          value={this.state.plz}
          onChange={this.changeHandler}
        />
        Stadt:
        <input
          name='stadt'
          className={`text-input`}
          type='text'
          value={this.state.stadt}
          onChange={this.changeHandler}
        />
        Staat:
        <input
          name='staat'
          className={`text-input`}
          type='text'
          value={this.state.staat}
          onChange={this.changeHandler}
        />
        Telefon:
        <input
          name='telefon'
          className={`text-input`}
          type='text'
          value={this.state.telefon}
          onChange={this.changeHandler}
        />
        Fax:
        <input
          name='fax'
          className={`text-input`}
          type='text'
          value={this.state.fax}
          onChange={this.changeHandler}
        />
        E-Mail:
        <input
          name='email'
          className={`text-input`}
          type='text'
          value={this.state.email}
          onChange={this.changeHandler}
        />
        Website:
        <input
          name='website'
          className={`text-input`}
          type='text'
          value={this.state.website}
          onChange={this.changeHandler}
        />
        Steuernummer:
        <input
          name='steuerNr'
          className={`text-input`}
          type='text'
          value={this.state.steuerNr}
          onChange={this.changeHandler}
        />
        Ust.-IdNr.:
        <input
          name='ustIdNr'
          className={`text-input`}
          type='text'
          value={this.state.ustIdNr}
          onChange={this.changeHandler}
        />
        Motto:
        <input
          name='motto'
          className={`text-input`}
          type='text'
          value={this.state.motto}
          onChange={this.changeHandler}
        />
        Öffnungszeit:
        <input
          name='open'
          className={`text-input`}
          type='text'
          value={this.state.open}
          onChange={this.changeHandler}
        />
        Kontoinhaber:
        <input
          name='kontoInhaber'
          className={`text-input`}
          type='text'
          value={this.state.kontoInhaber}
          onChange={this.changeHandler}
        />
        Bank:
        <input
          name='bank'
          className={`text-input`}
          type='text'
          value={this.state.bank}
          onChange={this.changeHandler}
        />
        IBAN:
        <input
          name='iban'
          className={`text-input`}
          type='text'
          value={this.state.iban}
          onChange={this.changeHandler}
        />
        BIC/SWIFT:
        <input
          name='bic'
          className={`text-input`}
          type='text'
          value={this.state.bic}
          onChange={this.changeHandler}
        />
        <div>
          <button className='btn-floating blue'>
            <i className='material-icons'>save</i>
          </button>
        </div>
      </form>
    );
  }
}
