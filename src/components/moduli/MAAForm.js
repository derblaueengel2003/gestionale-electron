import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import { maklerAlleinauftrag } from "./MaklerAlleinauftrag";

export class MAAForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venditoreId: "",
      venditoreId2: "",
      oggettoId: "",
      prezzoDiVendita: "",
      prezzoDiVendita2: "",
      startDate: null,
      endDate: null,
      calendarFocused: null,
      maklerProvision: "",
      error: "",
      sonstige: ""
    };
  }
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
  onPrezzoDiVenditaChange2 = e => {
    const prezzoDiVendita2 = e.target.value;

    if (!prezzoDiVendita2 || prezzoDiVendita2.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({ prezzoDiVendita2 }));
    }
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.setState(() => ({ startDate }));
    this.setState(() => ({ endDate }));
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    e.preventDefault();
    const venditore = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId
    );
    const venditore2 = this.props.clienti.find(
      cliente => cliente.id === this.state.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.state.oggettoId
    );
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const prezzoDiVendita = this.state.prezzoDiVendita;
    const prezzoDiVendita2 = this.state.prezzoDiVendita2;
    const maklerProvision = this.state.maklerProvision;
    const sonstige = this.state.sonstige;

    if (!this.state.oggettoId || !this.state.venditoreId) {
      this.setState(() => ({ error: "Verkäufer und Objekt bitte eingeben." }));
    } else {
      this.setState(() => ({ error: "" }));
      maklerAlleinauftrag(
        venditore,
        venditore2,
        oggetto,
        startDate,
        endDate,
        prezzoDiVendita,
        prezzoDiVendita2,
        maklerProvision,
        sonstige,
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
            <h1>Makler-Allein-Auftrag</h1>
          </div>
        </div>
        <form className="form container" onSubmit={this.onSubmit}>
          {this.state.error && (
            <p className="form__error">{this.state.error}</p>
          )}
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
          Exklusivperiode:
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              displayFormat={"DD.MM.YYYY"}
            />
          </div>
          Verkaufspreis min.:
          <input
            className={`text-input`}
            type="text"
            placeholder="Prezzo di vendita"
            value={this.state.prezzoDiVendita}
            onChange={this.onPrezzoDiVenditaChange}
          />
          Verkaufspreis max.:
          <input
            className={`text-input`}
            type="text"
            placeholder="Prezzo di vendita"
            value={this.state.prezzoDiVendita2}
            onChange={this.onPrezzoDiVenditaChange2}
          />
          Makler Provision %:
          <input
            name="maklerProvision"
            className={`text-input`}
            type="text"
            placeholder="Solo numeri"
            value={this.state.maklerProvision}
            onChange={this.changeHandler}
          />
          Sonstige Vereinbarungen:
          <input
            name="sonstige"
            className={`text-input`}
            type="text"
            placeholder="Sonstige Vereinbarungen"
            value={this.state.sonstige}
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

export default connect(mapStateToProps)(MAAForm);
