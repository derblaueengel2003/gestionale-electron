import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export class OggettoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      via: props.oggetto ? props.oggetto.via : '',
      numeroCivico: props.oggetto ? props.oggetto.numeroCivico : '',
      cap: props.oggetto ? props.oggetto.cap : '',
      citta: props.oggetto ? props.oggetto.citta : '',
      nazione: props.oggetto ? props.oggetto.nazione : '',
      numeroAppartamento: props.oggetto ? props.oggetto.numeroAppartamento : '',
      rifId: props.oggetto ? props.oggetto.rifId : '',
      grundbuch: props.oggetto ? props.oggetto.grundbuch : '',
      grundbuchBlatt: props.oggetto ? props.oggetto.grundbuchBlatt : '',
      m2: props.oggetto ? props.oggetto.m2 : '',
      piano: props.oggetto ? props.oggetto.piano : '',
      mobilio: props.oggetto ? props.oggetto.mobilio : '',
      stato: props.oggetto ? props.oggetto.stato : '',
      wohngeld: props.oggetto ? (props.oggetto.wohngeld / 100).toString() : '0',
      kaufpreis: props.oggetto
        ? (props.oggetto.kaufpreis / 100).toString()
        : '0',
      affittoNetto: props.oggetto
        ? (props.oggetto.affittoNetto / 100).toString()
        : '0',
      verwalter: props.oggetto ? props.oggetto.verwalter : '',
      ruecklage: props.oggetto ? props.oggetto.ruecklage : '',
      proprietarioId: props.oggetto ? props.oggetto.proprietarioId : '',
      proprietarioId2: props.oggetto ? props.oggetto.proprietarioId2 : ''
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onMoneyChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ [name]: value });
    }
  };
  onVerwalterChange = e => {
    const verwalter = e ? e.value : '';
    this.setState(() => ({ verwalter }));
  };
  onProprietarioChange = e => {
    const proprietarioId = e ? e.value : '';
    this.setState(() => ({ proprietarioId }));
  };
  onProprietarioChange2 = e => {
    const proprietarioId2 = e ? e.value : '';
    this.setState(() => ({ proprietarioId2 }));
  };
  onSubmit = e => {
    e.preventDefault();
    const wohngeld = parseFloat(this.state.wohngeld, 10) * 100;
    const affittoNetto = parseFloat(this.state.affittoNetto, 10) * 100;
    const kaufpreis = parseFloat(this.state.kaufpreis, 10) * 100;

    if (!this.state.via || !this.state.rifId) {
      this.setState(() => ({ error: 'Inserisci via e riferimento Id.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        via: this.state.via,
        numeroCivico: this.state.numeroCivico,
        cap: this.state.cap,
        citta: this.state.citta,
        nazione: this.state.nazione,
        numeroAppartamento: this.state.numeroAppartamento,
        rifId: this.state.rifId,
        grundbuch: this.state.grundbuch,
        grundbuchBlatt: this.state.grundbuchBlatt,
        m2: this.state.m2,
        piano: this.state.piano,
        mobilio: this.state.mobilio,
        stato: this.state.stato,
        wohngeld,
        kaufpreis,
        affittoNetto,
        verwalter: this.state.verwalter,
        ruecklage: this.state.ruecklage,
        proprietarioId: this.state.proprietarioId,
        proprietarioId2: this.state.proprietarioId2
      });
    }
  };
  render() {
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));
    const filterOptions = createFilterOptions({ options });

    return (
      <form className='form' onSubmit={this.onSubmit}>
        <div>
          <button className='button button--secondary-oggetti'>Salva</button>
        </div>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        Via:
        <input
          name='via'
          className={`text-input`}
          type='text'
          placeholder='Via'
          autoFocus
          value={this.state.via}
          onChange={this.changeHandler}
        />
        Numero Civico:
        <input
          name='numeroCivico'
          className={`text-input`}
          type='text'
          placeholder='Numero Civico'
          value={this.state.numeroCivico}
          onChange={this.changeHandler}
        />
        CAP:
        <input
          name='cap'
          className={`text-input`}
          type='text'
          placeholder='CAP'
          value={this.state.cap}
          onChange={this.changeHandler}
        />
        Città:
        <input
          name='citta'
          className={`text-input`}
          type='text'
          placeholder='Città'
          value={this.state.citta}
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
        Numero Appartamento:
        <input
          name='numeroAppartamento'
          className={`text-input`}
          type='text'
          placeholder='WE numero'
          value={this.state.numeroAppartamento}
          onChange={this.changeHandler}
        />
        Rif. Id:
        <input
          name='rifId'
          className={`text-input`}
          type='text'
          placeholder='Rif. Id'
          value={this.state.rifId}
          onChange={this.changeHandler}
        />
        Grundbuch:
        <input
          name='grundbuch'
          className={`text-input`}
          type='text'
          placeholder='Grundbuch von'
          value={this.state.grundbuch}
          onChange={this.changeHandler}
        />
        GB Blatt Nr.:
        <input
          name='grundbuchBlatt'
          className={`text-input`}
          type='text'
          placeholder='Blatt Nr.'
          value={this.state.grundbuchBlatt}
          onChange={this.changeHandler}
        />
        Metri quadri:
        <input
          name='m2'
          className={`text-input`}
          type='text'
          placeholder='m2'
          value={this.state.m2}
          onChange={this.changeHandler}
        />
        Piano:
        <input
          name='piano'
          className={`text-input`}
          type='text'
          placeholder='Piano'
          value={this.state.piano}
          onChange={this.changeHandler}
        />
        Mobilio:
        <textarea
          name='mobilio'
          className={`textarea`}
          placeholder='Mobilio e valore'
          value={this.state.mobilio}
          onChange={this.changeHandler}
        />
        Stato:
        <input
          name='stato'
          className={`text-input`}
          type='text'
          placeholder='Libero o affittato'
          value={this.state.stato}
          onChange={this.changeHandler}
        />
        Wohngeld:
        <input
          name='wohngeld'
          className={`text-input`}
          type='text'
          placeholder='Wohngeld'
          value={this.state.wohngeld}
          onChange={this.onMoneyChange}
        />
        Instandhaltungs-Rücklage:
        <input
          name='ruecklage'
          className={`text-input`}
          type='text'
          placeholder='Indicare se gesamt o anteilig'
          value={this.state.ruecklage}
          onChange={this.changeHandler}
        />
        Affitto Netto:
        <input
          name='affittoNetto'
          className={`text-input`}
          type='text'
          placeholder='Affitto netto'
          value={this.state.affittoNetto}
          onChange={this.onMoneyChange}
        />
        Kaufpreis:
        <input
          name='kaufpreis'
          className={`text-input`}
          type='text'
          placeholder='Prezzo di Vendita'
          value={this.state.kaufpreis}
          onChange={this.onMoneyChange}
        />
        Amministrazione:
        <Select
          name='verwalter'
          value={this.state.verwalter}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onVerwalterChange}
        />
        Proprietario:
        <Select
          name='proprietarioId'
          value={this.state.proprietarioId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onProprietarioChange}
        />
        2. Proprietario:
        <Select
          name='proprietarioId2'
          value={this.state.proprietarioId2}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onProprietarioChange2}
        />
        <div>
          <button className='button button--secondary-oggetti'>Salva</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  clienti: state.clienti
});

export default connect(mapStateToProps)(OggettoForm);
