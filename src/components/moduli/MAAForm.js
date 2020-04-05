import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { DateRangePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { maklerAlleinauftrag } from './MaklerAlleinauftrag';

export class MAAForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const venditore = this.props.clienti.find(
      cliente => cliente.id === this.props.data.venditoreId
    );
    const venditore2 = this.props.clienti.find(
      cliente => cliente.id === this.props.data.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.props.data.oggettoId
    );
    const startDate = this.props.data.startDate;
    const endDate = this.props.data.endDate;
    const prezzoDiVendita = this.props.data.prezzoDiVendita;
    const prezzoDiVendita2 = this.props.data.prezzoDiVendita2;
    const maklerProvision = this.props.data.maklerProvision;
    const sonstige = this.props.data.sonstige;

    if (!this.props.data.oggettoId || !this.props.data.venditoreId) {
      this.setState(() => ({
        error: [this.props.t('Inserisci venditore e oggetto')]
      }));
    } else {
      this.setState(() => ({ error: '' }));
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
    const { t } = this.props;
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
          <div className='container'>
            <h1>{t('Mandato alla vendita')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}
          {t('Venditore')}:
          <Select
            name='venditore'
            value={this.props.data.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('venditoreId', e && e.value)
            }
          />
          2. {t('Venditore')}:
          <Select
            name='venditore2'
            value={this.props.data.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('venditoreId2', e && e.value)
            }
          />
          {t('Oggetto')}:
          <Select
            name='oggettoId'
            value={this.props.data.oggettoId}
            options={oggettiOptions}
            onChange={e =>
              this.props.changeHandlerSelect('oggettoId', e && e.value)
            }
          />
          {t('Periodo di esclusiva')}:
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.props.data.startDate}
              endDate={this.props.data.endDate}
              onDatesChange={this.props.onDatesChange}
              focusedInput={this.props.data.calendarFocusedMAA}
              onFocusChange={this.props.onFocusChange2}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
              displayFormat={'DD.MM.YYYY'}
            />
          </div>
          {t('Prezzo di vendita')} min.:
          <input
            name='prezzoDiVendita'
            className={`text-input`}
            type='text'
            value={this.props.data.prezzoDiVendita}
            onChange={this.props.changeHandlerValuta}
          />
          {t('Prezzo di vendita')} max.:
          <input
            name='prezzoDiVendita2'
            className={`text-input`}
            type='text'
            value={this.props.data.prezzoDiVendita2}
            onChange={this.props.changeHandlerValuta}
          />
          {t('Provvigione')} %:
          <input
            name='maklerProvision'
            className={`text-input`}
            type='text'
            placeholder={t('Solo numeri')}
            value={this.props.data.maklerProvision}
            onChange={this.props.changeHandler}
          />
          {t('Altri accordi')}:
          <input
            name='sonstige'
            className={`text-input`}
            type='text'
            value={this.props.data.sonstige}
            onChange={this.props.changeHandler}
          />
          <div>
            <button className='btn-floating right'>
              <i className='material-icons'>picture_as_pdf</i>
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

export default connect(mapStateToProps)(withTranslation()(withForm(MAAForm)));
