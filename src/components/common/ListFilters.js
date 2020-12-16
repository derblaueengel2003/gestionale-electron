import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  sortByPaid,
  sortByPublished,
  sortByName,
  setStartDate,
  setEndDate,
} from '../../actions/filters';
import moment from 'moment';
import M from 'materialize-css';

export class ListFilters extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } else if (e.target.value === 'paid') {
      this.props.sortByPaid();
    } else if (e.target.value === 'published') {
      this.props.sortByPublished();
    } else {
      this.props.sortByName();
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
        end: moment(`${anno}-12-31`),
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
    const { t, filters, options } = this.props;
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='deals-suche'
              type='text'
              className='input-field'
              value={filters.text}
              onChange={this.onTextChange}
            />
            <label className='active' htmlFor='deals-suche'>
              {t('Cerca')}
            </label>
          </div>
          <div className='input-field '>
            <select value={filters.sortBy} onChange={this.onSortChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </select>
            <label>{t('Ordina per')}</label>
          </div>
          <div className=''>
            <DateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
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

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByPaid: () => dispatch(sortByPaid()),
  sortByPublished: () => dispatch(sortByPublished()),
  sortByName: () => dispatch(sortByName()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ListFilters));
