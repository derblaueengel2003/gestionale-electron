import React from 'react';
import { connect } from 'react-redux';
import {
  setLeadsFilter,
  sortByDate,
  sortByAmount,
  setLeadsStatoFilter
} from '../../actions/filters';

export class LeadsListFilters extends React.Component {
  onLeadChange = e => {
    this.props.setLeadsFilter(e.target.value);
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
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              type='text'
              className='text-input'
              placeholder='Budget'
              value={this.props.filters.lead}
              onChange={this.onLeadChange}
            />
          </div>
          <div className='input-group__item'>
            <select
              className='select'
              value={this.props.filters.leadStato}
              onChange={this.onLeadsStatoChange}
            >
              <option value=''>Typ:</option>
              <option value='libero'>Leerstehend</option>
              <option value='affittato'>Vermietet</option>
              <option value='libero o affittato'>
                Leerstehend oder vermietet
              </option>
              <option value='commerciale'>Gewerbe</option>
              <option value='aph'>Pflegeheim</option>
            </select>
          </div>
          <div className='input-group__item'>
            <label>Sortieren: </label>
            <select
              className='select'
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'>Datum</option>
              <option value='amount'>Budget</option>
            </select>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadsListFilters);
