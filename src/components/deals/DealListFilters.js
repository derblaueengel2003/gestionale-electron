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

export class DealListFilters extends React.Component {
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
      <div className='button'>
        {presets.map(({ text, start, end }) => {
          return (
            <button
              className='button button--secondary-datepicker'
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
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              type='text'
              className='text-input'
              placeholder='Deals-Suche'
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className='input-group__item'>
            <select
              className='select'
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'>Datum</option>
              <option value='amount'>Betrag</option>
              <option value='paid'>Bezahlt</option>
            </select>
          </div>
          <div className='input-group__item'>
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
