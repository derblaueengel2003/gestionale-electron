import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { DateRangePicker } from 'react-dates';
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
    const { t, renderSelect, renderInput, changeHandlerValuta } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));

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
          {renderSelect('venditoreId', options, t('Venditore'))}
          {renderSelect('venditoreId2', options, '2. ' + t('Venditore'))}
          {renderSelect('oggettoId', oggettiOptions, t('Oggetto'))}
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
          {renderInput(
            'prezzoDiVendita',
            t('Prezzo di vendita') + ' min.',
            undefined,
            changeHandlerValuta
          )}
          {renderInput(
            'prezzoDiVendita2',
            t('Prezzo di vendita') + ' max.',
            undefined,
            changeHandlerValuta
          )}
          {renderInput('maklerProvision', t('Provvigione'))}
          {renderInput('sonstige', t('Altri accordi'))}
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
