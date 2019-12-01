import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

export class LeadForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  constructor(props) {
    super(props);
    this.state = {
      leadCreatedAt: props.lead ? moment(props.lead.leadCreatedAt) : moment(),
      calendarFocused: false,
      leadId: props.lead ? props.lead.leadId : '',
      leadBudget: props.lead ? (props.lead.leadBudget / 100).toString() : '',
      leadOggettoStato: props.lead ? props.lead.leadOggettoStato : '',
      leadNote: props.lead ? props.lead.leadNote : ''
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onBudgetChange = e => {
    const leadBudget = e.target.value;
    if (!leadBudget || leadBudget.match(/^\d{1,}(,\d{0,2})?$/)) {
      this.setState(() => ({ leadBudget }));
    }
  };
  onDateChange = leadCreatedAt => {
    if (leadCreatedAt) {
      this.setState(() => ({ leadCreatedAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onLeadIdChange = e => {
    const leadId = e ? e.value : '';
    this.setState(() => ({ leadId }));
  };
  onSubmit = e => {
    e.preventDefault();
    const leadBudget = parseFloat(this.state.leadBudget, 10) * 100;

    if (!this.state.leadId || this.state.leadBudget < 1) {
      this.setState(() => ({ error: 'Budget bitte eingeben' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        leadCreatedAt: this.state.leadCreatedAt
          ? this.state.leadCreatedAt.valueOf()
          : null,
        leadId: this.state.leadId,
        leadBudget,
        leadOggettoStato: this.state.leadOggettoStato,
        leadNote: this.state.leadNote
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
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        Anfragedatum:
        <SingleDatePicker
          date={this.state.leadCreatedAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        Kunde:
        <Select
          name='leadId'
          value={this.state.leadId}
          options={options}
          filterOptions={filterOptions}
          onChange={this.onLeadIdChange}
        />
        {/*
          tolgo il pulsante aggiungi nuovo utente 
        {!this.state.leadId && (
          <div className='page-header__actions'>
            <Link
              className='button button--secondary-clienti'
              to='/customercreate'
            >
              Neuer Kunde hinzufügen
            </Link>
          </div>
        )}
        */}
        Budget:
        <input
          className={`text-input`}
          type='text'
          placeholder='Kudenbudget'
          value={this.state.leadBudget}
          onChange={this.onBudgetChange}
        />
        Immobilientyp und -status:
        <select
          name='leadOggettoStato'
          value={this.state.leadOggettoStato}
          onChange={this.changeHandler}
        >
          <option value='libero'>WHG Leerstehend</option>
          <option value='affittato'>WHG Vermietet</option>
          <option value='libero o affittato'>
            WHG Leerstehend oder vermietet
          </option>
          <option value='commerciale'>Gewerbe</option>
          <option value='aph'>Pflegeheim</option>
          <option value=''>Egal</option>
        </select>
        <textarea
          name='leadNote'
          className={`textarea`}
          placeholder='Weitere Merkmale'
          value={this.state.leadNote}
          onChange={this.changeHandler}
        ></textarea>
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
  clienti: state.clienti
});

export default connect(mapStateToProps)(LeadForm);
