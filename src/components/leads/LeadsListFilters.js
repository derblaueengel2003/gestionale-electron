import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  setLeadsFilter,
  sortByDate,
  sortByAmount,
  setLeadsStatoFilter,
} from '../../actions/filters';
import M from 'materialize-css';
import numeral from 'numeral';

export class LeadsListFilters extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }
  onLeadChange = (e) => {
    //il valore convertito in euro lo riconverto in semplici numeri prima di passarli al filtro. Se cancello il valore, mi restituisce una stringa vuota per evitare errori
    const value = numeral(e.target.value).value() || '';
    this.props.setLeadsFilter(value);
  };
  onLeadsStatoChange = (e) => {
    this.props.setLeadsStatoFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    } else {
      this.props.sortByPaid();
    }
  };
  render() {
    const { t } = this.props;
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
            <label className='active' htmlFor='budget'>
              Budget
            </label>
          </div>
          <div className='input-field'>
            <select
              value={this.props.filters.leadStato}
              onChange={this.onLeadsStatoChange}
            >
              <option value=''>{t('Tutti')}</option>
              <option value='libero'>{t('Appartamento libero')}</option>
              <option value='affittato'>{t('Appartamento affittato')}</option>
              <option value='libero o affittato'>
                {t('Appartamento libero o affittato')}
              </option>
              <option value='commerciale'>{t('Locale commerciale')}</option>
              <option value='aph'>{t('Casa di cura')}</option>
            </select>
            <label>{t('Tipologia di immobile')}</label>
          </div>
          <div className='input-field'>
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'> {t('Data')}</option>
              <option value='amount'>Budget</option>
            </select>
            <label>{t('Ordina per')}</label>
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
  setLeadsFilter: (lead) => dispatch(setLeadsFilter(lead)),
  setLeadsStatoFilter: (leadStato) => dispatch(setLeadsStatoFilter(leadStato)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LeadsListFilters));
