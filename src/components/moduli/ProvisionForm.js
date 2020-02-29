import React from "react";
import { connect } from "react-redux";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import { creaPrenotazione } from "./Provisionsbestaetigung";

export class ProvisionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acquirenteId: "",
      acquirenteId2: "",
      venditoreId: "",
      venditoreId2: "",
      oggettoId: "",
      prezzoDiVendita: "",
      provvPercentuale: ""
    };
  }
  onAcquirenteIdChange = e => {
    const acquirenteId = e ? e.value : "";
    this.setState(() => ({ acquirenteId }));
  };
  onAcquirenteIdChange2 = e => {
    const acquirenteId2 = e ? e.value : "";
    this.setState(() => ({ acquirenteId2 }));
  };
  onVenditoreIdChange = e => {
    const venditoreId = e ? e.value : "";
    this.setState(() => ({ venditoreId }));
  };
  onVenditoreIdChange2 = e => {
    const venditoreId2 = e ? e.value : "";
    this.setState(() => ({ venditoreId2 }));
  };
  onOggettoChange = e => {
    const oggetto = e ? e.value : "";
    this.setState(() => ({ oggettoId: oggetto }));
  };
  onPrezzoDiVenditaChange = e => {
    const prezzoDiVendita = e.target.value;

    if (!prezzoDiVendita || prezzoDiVendita.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({ prezzoDiVendita }));
    }
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
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
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.state.oggettoId
    );

    const prezzoDiVendita = this.state.prezzoDiVendita * 100;
    const provvPercentuale = this.state.provvPercentuale;

    if (!this.state.oggettoId) {
      this.setState(() => ({ error: "Objekt bitte eingeben." }));
    } else {
      this.setState(() => ({ error: "" }));
      creaPrenotazione(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        provvPercentuale,
        prezzoDiVendita,
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
          <div className="container">
            <h1>Provisionsbestätigung</h1>
          </div>
        </div>
        <form className="form container" onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
          Käufer:
          <Select
            name="acquirente"
            value={this.state.acquirenteId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onAcquirenteIdChange}
          />
          2. Käufer:
          <Select
            name="acquirente2"
            value={this.state.acquirenteId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onAcquirenteIdChange2}
          />
          Verkäufer:
          <Select
            name="venditore"
            value={this.state.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange}
          />
          2. Verkäufer:
          <Select
            name="venditore2"
            value={this.state.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={this.onVenditoreIdChange2}
          />
          Objekt:
          <Select
            name="oggettoId"
            value={this.state.oggettoId}
            options={oggettiOptions}
            onChange={this.onOggettoChange}
          />
          Verkaufspreis:
          <input
            className={`text-input`}
            type="text"
            placeholder="solo numeri"
            value={this.state.prezzoDiVendita}
            onChange={this.onPrezzoDiVenditaChange}
          />
          Makler Provision %:
          <input
            name="provvPercentuale"
            className={`text-input`}
            type="text"
            placeholder="senza % es. 7,14"
            value={this.state.provvPercentuale}
            onChange={this.changeHandler}
          />
          <div>
            <button className="btn-floating right">
              <i className="material-icons">picture_as_pdf</i>
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

export default connect(mapStateToProps)(ProvisionForm);
