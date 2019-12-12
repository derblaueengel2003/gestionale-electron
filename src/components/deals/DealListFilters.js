import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  sortByPaid,
  setStartDate,
  setEndDate
} from '../../actions/filters';
import moment from 'moment';
import M from 'materialize-css';

export class DealListFilters extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
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

  //Questo metodo visualizza gli anni nel datepicker
  renderDatePresets = () => {
    const startYear = 2018;
    const diff = moment().year() - startYear;
    const presets = [];
    for (let i = 0; i <= diff; i++) {
      let anno = startYear + i;
      presets.push({
        text: anno,
        start: moment([anno]),
        end: moment(`${anno}-12-31`)
      });
    }
    return (
      <div className='container'>
        {presets.map(({ text, start, end }) => {
          return (
            <button
              className='btn-floating margine-basso'
              key={text}
              type='button'
              onClick={() =>
                this.onDatesChange({ startDate: start, endDate: end })
              }
            >
              {text}
            </button>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='deals-suche'
              type='text'
              className='input-field'
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
            <label htmlFor='deal-suche'>Deals-Suche</label>
          </div>
          <div className='input-field '>
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'>Datum</option>
              <option value='amount'>Betrag</option>
              <option value='paid'>Bezahlt</option>
            </select>
            <label>Sortieren nach</label>
          </div>
          <div className=''>
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              displayFormat={'DD.MM.YYYY'}
              renderCalendarInfo={this.renderDatePresets}
            />
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
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByPaid: () => dispatch(sortByPaid()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(DealListFilters);
