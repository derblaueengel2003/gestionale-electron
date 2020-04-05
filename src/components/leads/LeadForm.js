import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class LeadForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = e => {
    e.preventDefault();
    const leadBudget = parseFloat(this.props.data.leadBudget, 10) * 100;

    if (!this.props.data.leadId || this.props.data.leadBudget < 1) {
      this.setState(() => ({ error: 'Budget bitte eingeben' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        leadCreatedAt: this.props.data.leadCreatedAt
          ? this.props.data.leadCreatedAt.valueOf()
          : null,
        leadId: this.props.data.leadId,
        leadBudget,
        leadOggettoStato: this.props.data.leadOggettoStato,
        leadNote: this.props.data.leadNote
      });
    }
  };
  render() {
    const { t } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));
    const filterOptions = createFilterOptions({ options });

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {t('Data richiesta')}:
        <SingleDatePicker
          date={this.props.data.leadCreatedAt}
          onDateChange={e => this.props.onDataChange('leadCreatedAt', e)}
          focused={this.props.data.calendarFocused}
          onFocusChange={e => this.props.onFocusChange('calendarFocused', e)}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        {t('Cliente')}:
        <Select
          name='leadId'
          value={this.props.data.leadId}
          options={options}
          filterOptions={filterOptions}
          onChange={e => this.props.changeHandlerSelect('leadId', e && e.value)}
        />
        Budget:
        <input
          name='leadBudget'
          className={`text-input`}
          type='text'
          placeholder='Kudenbudget'
          value={this.props.data.leadBudget}
          onChange={this.props.changeHandlerValuta}
        />
        {t('Tipologia immobile e stato')}:
        <select
          name='leadOggettoStato'
          value={this.props.data.leadOggettoStato}
          onChange={this.props.changeHandler}
        >
          <option value='libero'>{t('Appartamento libero')}</option>
          <option value='affittato'>{t('Appartamento affittato')}</option>
          <option value='libero o affittato'>
            {t('Appartamento libero o affittato')}
          </option>
          <option value='commerciale'>{t('Locale commerciale')}</option>
          <option value='aph'>{t('Casa di cura')}</option>
          <option value=''>{t('Indifferente')}</option>
        </select>
        <textarea
          name='leadNote'
          className={`textarea`}
          placeholder='Weitere Merkmale'
          value={this.props.data.leadNote}
          onChange={this.props.changeHandler}
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

export default connect(mapStateToProps)(withTranslation()(withForm(LeadForm)));
