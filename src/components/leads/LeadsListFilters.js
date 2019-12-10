import React from 'react';
import { connect } from 'react-redux';
import {
  setLeadsFilter,
  sortByDate,
  sortByAmount,
  setLeadsStatoFilter
} from '../../actions/filters';
import M from 'materialize-css';
import numeral from 'numeral';

export class LeadsListFilters extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  onLeadChange = e => {
    //il valore convertito in euro lo riconverto in semplici numeri prima di passarli al filtro. Se cancello il valore, mi restituisce una stringa vuota per evitare errori
    const value = numeral(e.target.value).value() || '';
    this.props.setLeadsFilter(value);
  };
  onLeadsStatoChange = e => {
    this.props.setLeadsStatoFilter(e.target.value);
  };
  onSortChange = e => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } else {
      this.props.sortByPaid();
    }
  };
  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='budget'
              type='text'
              className='input-field'
              value={
                this.props.filters.lead &&
                numeral(this.props.filters.lead).format('0,0[.]00')
              }
              onChange={this.onLeadChange}
            />
            <label htmlFor='budget'>Budget</label>
          </div>
          <div className='input-field'>
            <select
              value={this.props.filters.leadStato}
              onChange={this.onLeadsStatoChange}
            >
              <option value=''>Alle</option>
              <option value='libero'>WHG Leerstehend</option>
              <option value='affittato'>WHG Vermietet</option>
              <option value='libero o affittato'>
                WHG Leerstehend oder vermietet
              </option>
              <option value='commerciale'>Gewerbe</option>
              <option value='aph'>Pflegeheim</option>
            </select>
            <label>Immobilientyp</label>
          </div>
          <div className='input-field'>
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'> Datum</option>
              <option value='amount'>Nach Budget</option>
            </select>
            <label>Sortieren nach</label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setLeadsFilter: lead => dispatch(setLeadsFilter(lead)),
  setLeadsStatoFilter: leadStato => dispatch(setLeadsStatoFilter(leadStato)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsListFilters);
