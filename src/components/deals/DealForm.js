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

export class DealForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const prezzoDiVendita =
      parseFloat(this.props.data.prezzoDiVendita.replace(/,/, '.'), 10) * 100;
    const amount =
      parseFloat(this.props.data.amount.replace(/,/, '.'), 10) * 100;
    const provvM2square =
      parseFloat(this.props.data.provvM2square.replace(/,/, '.'), 10) * 100;
    const provvStefano =
      parseFloat(this.props.data.provvStefano.replace(/,/, '.'), 10) * 100;
    const provvAgenziaPartner =
      parseFloat(this.props.data.provvAgenziaPartner.replace(/,/, '.'), 10) *
      100;
    const provvSum = provvM2square + provvStefano + provvAgenziaPartner;

    if (
      !this.props.data.oggettoId ||
      !this.props.data.amount ||
      !this.props.data.acquirenteId
    ) {
      this.setState(() => ({
        error: 'Objekt, Summe und Käufer bitte ausfüllen.'
      }));
    } else if (amount !== provvSum) {
      const differenza = (provvSum - amount) / 100;
      this.setState(() => ({
        error: `Provisionen-Summe entrspricht nicht die Gesamtprovision. ${differenza} € Unterschied.`
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        oggettoId: this.props.data.oggettoId,
        prezzoDiVendita,
        amount,
        consulenteVendita: this.props.data.consulenteVendita,
        provvM2square,
        dealType: this.props.data.dealType,
        provvStefano,
        payedStefano: this.props.data.payedStefano,
        payedAtStefano: this.props.data.payedAtStefano
          ? this.props.data.payedAtStefano.valueOf()
          : null,
        agenziaPartnerId: this.props.data.agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner: this.props.data.payedAgenziaPartner,
        createdAt: this.props.data.createdAt
          ? this.props.data.createdAt.valueOf()
          : null,
        venditoreId: this.props.data.venditoreId,
        venditoreId2: this.props.data.venditoreId2,
        acquirenteId: this.props.data.acquirenteId,
        acquirenteId2: this.props.data.acquirenteId2,
        notaioId: this.props.data.notaioId,
        dataRogito: this.props.data.dataRogito
          ? this.props.data.dataRogito.valueOf()
          : null,
        dataConsegna: this.props.data.dataConsegna
          ? this.props.data.dataConsegna.valueOf()
          : null,
        linguaRogito: this.props.data.linguaRogito,
        belastungsVollmacht: this.props.data.belastungsVollmacht,
        calendarDataFatturaFocused: false,
        note: this.props.data.noteDeal
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

    const oggettiOptions = this.props.oggetti.map(oggetto => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));
    const dealTypeOptions = [
      'Kauf Eigentumswohnung',
      'Miete Eigentumswohnung',
      'Kauf Gewerbe',
      'Miete Gewerbe',
      'APH',
      'Sonstiges'
    ].map(dealType => ({
      value: dealType,
      label: t(dealType)
    }));
    const consulenteVenditaOptions = this.props.utenti.map(consulente => ({
      value: consulente.id,
      label: consulente.name
    }));
    const linguaRogitoOptions = [
      'Englisch',
      'Italienisch',
      'Spanisch',
      'Französisch',
      'Englisch-Italienisch',
      'Englisch-Französisch',
      'Englisch-Spanisch'
    ].map(linguaRogito => ({
      value: linguaRogito,
      label: t(linguaRogito)
    }));

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
        {t('Tipo di vendita')}:
        <Select
          name={'dealType'}
          value={this.props.data.dealType}
          options={dealTypeOptions}
          onChange={e =>
            this.props.changeHandlerSelect('dealType', e && e.value)
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
        {t('Data prenotazione')}:
        <SingleDatePicker
          date={this.props.data.createdAt}
          onDateChange={e => this.props.onDataChange('createdAt', e)}
          focused={this.props.data.calendarFocused}
          onFocusChange={e => this.props.onFocusChange('calendarFocused', e)}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Prezzo di vendita')}:
        <input
          name='prezzoDiVendita'
          className={`text-input text-input--${this.props.data.modificato.prezzoDiVendita}`}
          type='text'
          placeholder='Prezzo di vendita'
          value={this.props.data.prezzoDiVendita}
          onChange={this.props.changeHandlerValuta}
        />
        {t('Provvigione totale')}:
        <input
          name='amount'
          className={`text-input text-input--${this.props.data.modificato.amount}`}
          type='text'
          placeholder={`6%: ${parseFloat(
            this.props.data.prezzoDiVendita.replace(/,/, '.'),
            10
          ) * 0.06}`}
          value={this.props.data.amount}
          onChange={this.props.changeHandlerValuta}
        />
        {t('Consulente vendita')}:
        <Select
          name='consulentevendita'
          value={this.props.data.consulenteVendita}
          options={consulenteVenditaOptions}
          onChange={e =>
            this.props.changeHandlerSelect('consulenteVendita', e && e.value)
          }
        />
        {t('Provvigione')} m2Square:
        <input
          name='provvM2square'
          className={`text-input text-input--${this.props.data.modificato.provvM2square}`}
          type='text'
          placeholder={`80%: ${parseFloat(
            this.props.data.amount.replace(/,/, '.') -
              this.props.data.provvAgenziaPartner.replace(/,/, '.'),
            10
          ) * 0.8}`}
          value={this.props.data.provvM2square}
          onChange={this.props.changeHandlerValuta}
        />
        {t('Provvigione')} {t('Consulente vendita')}:
        <input
          name='provvStefano'
          className={`text-input text-input--${this.props.data.modificato.provvStefano}`}
          type='text'
          placeholder={`20%: ${parseFloat(
            this.props.data.amount.replace(/,/, '.') -
              this.props.data.provvAgenziaPartner.replace(/,/, '.'),
            10
          ) * 0.2}`}
          value={this.props.data.provvStefano}
          onChange={this.props.changeHandlerValuta}
        />
        <label>
          <input
            type='checkbox'
            name='payedStefano'
            checked={this.props.data.payedStefano}
            onChange={this.props.changeCheckbox}
          />
          <span>{t('Pagato')}</span>
        </label>
        <div className={`visible-${this.props.data.payedStefano} form`}>
          {t('Pagato il')}:
          <SingleDatePicker
            date={this.props.data.payedAtStefano}
            onDateChange={e => this.props.onDataChange('payedAtStefano', e)}
            focused={this.props.data.calendarPayedAtStefanoFocused}
            onFocusChange={e =>
              this.props.onFocusChange('calendarPayedAtStefanoFocused', e)
            }
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDate={true}
          />
        </div>
        {t('Partner commerciale')}:
        <Select
          name='agenziapartner'
          value={this.props.data.agenziaPartnerId}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('agenziaPartnerId', e && e.value)
          }
        />
        {t('Provvigione')} {t('Partner commerciale')}
        <input
          name='provvAgenziaPartner'
          className={`text-input text-input--${this.props.data.modificato.provvAgenziaPartner}`}
          type='text'
          placeholder='Provvigione Agenzia Partner'
          value={this.props.data.provvAgenziaPartner}
          onChange={this.props.changeHandlerValuta}
        />
        <label>
          <input
            type='checkbox'
            name='payedAgenziaPartner'
            checked={this.props.data.payedAgenziaPartner}
            onChange={this.props.changeCheckbox}
          />
          <span>{t('Pagato')}</span>
        </label>
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
        {t('Acquirente')}:
        <Select
          name='acquirente'
          value={this.props.data.acquirenteId}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('acquirenteId', e && e.value)
          }
        />
        2. {t('Acquirente')}:
        <Select
          name='acquirente2'
          value={this.props.data.acquirenteId2}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('acquirenteId2', e && e.value)
          }
        />
        {t('Notaio')}:
        <Select
          name='notaio'
          value={this.props.data.notaioId}
          options={options}
          filterOptions={filterOptions}
          onChange={e =>
            this.props.changeHandlerSelect('notaioId', e && e.value)
          }
        />
        {t('Data del rogito')}:
        <SingleDatePicker
          date={this.props.data.dataRogito}
          onDateChange={e => this.props.onDataChange('dataRogito', e)}
          focused={this.props.data.calendarDataRogitoFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataRogitoFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Lingua del rogito')}:
        <Select
          name={'linguaRogito'}
          value={this.props.data.linguaRogito}
          options={linguaRogitoOptions}
          onChange={e =>
            this.props.changeHandlerSelect('linguaRogito', e && e.value)
          }
        />
        <label>
          <input
            type='checkbox'
            name='belastungsVollmacht'
            checked={this.props.data.belastungsVollmacht}
            onChange={this.props.changeCheckbox}
          />
          <span>{t('Delega per gravami')}</span>
        </label>
        {t('Data consegna immobile')}:
        <SingleDatePicker
          date={this.props.data.dataConsegna}
          onDateChange={e => this.props.onDataChange('dataConsegna', e)}
          focused={this.props.data.calendarDataConsegnaFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataConsegnaFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        <textarea
          name='noteDeal'
          className={`textarea text-input--${this.props.data.modificato.note}`}
          placeholder={t('Note (opzionale)')}
          value={this.props.data.noteDeal}
          onChange={this.props.changeHandler}
        ></textarea>
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>{' '}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  utenti: state.utenti,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(withTranslation()(withForm(DealForm)));
