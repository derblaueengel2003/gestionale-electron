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

export class FatturaForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = e => {
    e.preventDefault();
    const importoNetto =
      parseFloat(this.props.data.importoNetto.replace(/,/, '.'), 10) * 100;
    const mahngebuehren =
      parseFloat(this.props.data.mahngebuehren.replace(/,/, '.'), 10) * 100;
    const mahngebuehren2 =
      parseFloat(this.props.data.mahngebuehren2.replace(/,/, '.'), 10) * 100;

    if (!this.props.data.numeroFattura || !this.props.data.dataFattura) {
      this.setState(() => ({
        error: 'Datum und Rechnungsnummer bitte eingeben'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        dealId: this.props.data.dealId,
        clienteId: this.props.data.clienteId,
        clienteId2: this.props.data.clienteId2,
        numeroFattura: this.props.data.numeroFattura,
        dataFattura: this.props.data.dataFattura
          ? this.props.data.dataFattura.valueOf()
          : null,
        dataZahlungserinnerung: this.props.data.dataZahlungserinnerung
          ? this.props.data.dataZahlungserinnerung.valueOf()
          : null,
        dataMahnung: this.props.data.dataMahnung
          ? this.props.data.dataMahnung.valueOf()
          : null,
        dataMahnung2: this.props.data.dataMahnung2
          ? this.props.data.dataMahnung2.valueOf()
          : null,
        mahngebuehren,
        mahngebuehren2,
        payed: this.props.data.payed,
        payedAt: this.props.data.payedAt
          ? this.props.data.payedAt.valueOf()
          : null,
        descrizioneProdotto: this.props.data.descrizioneProdotto,
        importoNetto,
        dataPrestazione: this.props.data.dataPrestazione
          ? this.props.data.dataPrestazione.valueOf()
          : null
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

    const dealIdOptions = this.props.deals.map(deal => ({
      value: deal.id,
      label: `${
        this.props.oggetti.find(ogg => ogg.id === deal.oggettoId).rifId
      } - 
                        ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).via
                        } 
                        ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).numeroCivico
                        },
                        WE ${
                          this.props.oggetti.find(
                            ogg => ogg.id === deal.oggettoId
                          ).numeroAppartamento
                        }`
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {t('Vendita')}:
        <Select
          name='dealId'
          value={this.props.data.dealId}
          options={dealIdOptions}
          onChange={e => this.props.changeHandlerSelect('dealId', e && e.value)}
        />
        {t('Cliente')}:
        <Select
          name='clienteId'
          value={this.props.data.clienteId}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('clienteId', e && e.value)
          }
        />
        2. {t('Cliente')}:
        <Select
          name='clienteId2'
          value={this.props.data.clienteId2}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('clienteId2', e && e.value)
          }
        />
        {t('Numero fattura')}:
        <input
          name='numeroFattura'
          className={`text-input`}
          type='text'
          placeholder='Rechnungsnummer'
          value={this.props.data.numeroFattura}
          onChange={this.props.changeHandler}
        />
        {t('Data fattura')}:
        <SingleDatePicker
          date={this.props.data.dataFattura}
          onDateChange={e => this.props.onDataChange('dataFattura', e)}
          focused={this.props.data.calendarDataFatturaFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataFatturaFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Data sollecito')}:
        <SingleDatePicker
          date={this.props.data.dataZahlungserinnerung}
          onDateChange={e =>
            this.props.onDataChange('dataZahlungserinnerung', e)
          }
          focused={this.props.data.calendarDataZahlungserinnerungFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataZahlungserinnerungFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        1. {t('Sollecito con penale')}:
        <SingleDatePicker
          date={this.props.data.dataMahnung}
          onDateChange={e => this.props.onDataChange('dataMahnung', e)}
          focused={this.props.data.calendarDataMahnungFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataMahnungFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        1. {t('Penale')}:
        <input
          name='mahngebuehren'
          className={`text-input `}
          type='text'
          placeholder={`7,50`}
          value={this.props.data.mahngebuehren}
          onChange={this.props.changeHandlerValuta}
        />
        2. {t('Sollecito con penale')}:
        <SingleDatePicker
          date={this.props.data.dataMahnung2}
          onDateChange={e => this.props.onDataChange('dataMahnung2', e)}
          focused={this.props.data.calendarDataMahnung2Focused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataMahnung2Focused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        2. {t('Penale')}:
        <input
          name='mahngebuehren2'
          className={`text-input `}
          type='text'
          placeholder={`15`}
          value={this.props.data.mahngebuehren2}
          onChange={this.props.changeHandlerValuta}
        />
        <label>
          <input
            type='checkbox'
            name='payed'
            checked={this.props.data.payed}
            onChange={this.props.changeCheckbox}
          />
          <span>{t('Pagato')}</span>
        </label>
        <div className={`visible-${this.props.data.payed} form`}>
          {t('Pagato il')}:
          <SingleDatePicker
            date={this.props.data.payedAt}
            onDateChange={e => this.props.onDataChange('payedAt', e)}
            focused={this.props.data.calendarPayedAtFocused}
            onFocusChange={e =>
              this.props.onFocusChange('calendarPayedAtFocused', e)
            }
            showClearDate={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDate={true}
          />
        </div>
        <blockquote>
          {t('Usare questi campi solo se non si è associata una vendita!')}{' '}
          {t('Descrizione prodotto')}:
          <input
            name='descrizioneProdotto'
            className={`text-input `}
            type='text'
            value={this.props.data.descrizioneProdotto}
            onChange={this.props.changeHandler}
          />
          {t('Importo netto')}:
          <input
            name='importoNetto'
            className={`text-input `}
            type='text'
            value={this.props.data.importoNetto}
            onChange={this.props.changeHandlerValuta}
          />
          {t('Data prestazione')}:
          <SingleDatePicker
            date={this.props.data.dataPrestazione}
            onDateChange={e => this.props.onDataChange('dataPrestazione', e)}
            focused={this.props.data.calendarDataPrestazioneFocused}
            onFocusChange={e =>
              this.props.onFocusChange('calendarDataPrestazioneFocused', e)
            }
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDate={true}
          />
        </blockquote>
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
  deals: state.deals,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(FatturaForm))
);
