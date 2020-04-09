import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-dates';
import {
  setClienteFilter,
  sortClientiByName,
  sortClientiByRegistration,
  sortClientiByDSGVO,
  setStartDateClienti,
  setEndDateClienti
} from '../../actions/filters';
import moment from 'moment';
import M from 'materialize-css';

export class ClientiListFilters extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDateClienti(startDate);
    this.props.setEndDateClienti(endDate);
  };
  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  onClienteChange = e => {
    this.props.setClienteFilter(e.target.value);
  };
  onSortChange = e => {
    if (e.target.value === 'name') {
      this.props.sortClientiByName();
    } else if (e.target.value === 'registration') {
      this.props.sortClientiByRegistration();
    } else if (e.target.value === 'dsgvo') {
      this.props.sortClientiByDSGVO();
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
                this.onDatesChange({
                  startDate: start,
                  endDate: end
                })
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
    const { t } = this.props;
    return (
      <div className='container'>
        <div className='input-group'>
          <div className='input-field'>
            <input
              id='kundensuche'
              type='text'
              className='input-field'
              value={this.props.filters.cliente}
              onChange={this.onClienteChange}
            />
            <label className='active' htmlFor='kundensuche'>
              {this.props.t('Cerca contatto')}
            </label>
          </div>
          <div className='input-field '>
            <select
              value={this.props.filters.sortClientiBy}
              onChange={this.onSortChange}
            >
              <option value='name'>{t('Cognome')}</option>
              <option value='registration'>{t('Data registrazione')}</option>
              <option value='dsgvo'>{t('Consenso privacy')}</option>
            </select>
            <label>{t('Ordina per')}</label>
          </div>
          <div className=''>
            <DateRangePicker
              startDate={this.props.filters.startDateClienti}
              endDate={this.props.filters.endDateClienti}
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
  setClienteFilter: cliente => dispatch(setClienteFilter(cliente)),
  sortClientiByDSGVO: () => dispatch(sortClientiByDSGVO()),
  sortClientiByName: () => dispatch(sortClientiByName()),
  sortClientiByRegistration: () => dispatch(sortClientiByRegistration()),
  setStartDateClienti: startDateClienti =>
    dispatch(setStartDateClienti(startDateClienti)),
  setEndDateClienti: endDateClienti =>
    dispatch(setEndDateClienti(endDateClienti))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ClientiListFilters));
