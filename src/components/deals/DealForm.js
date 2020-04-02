import React from 'react';
import Form from '../common/form';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export class DealForm extends Form {
  state = {
    data: {
      oggettoId: this.props.deal ? this.props.deal.oggettoId : '',
      prezzoDiVendita: this.props.deal
        ? (this.props.deal.prezzoDiVendita / 100).toString().replace(/\./, ',')
        : '0',
      amount: this.props.deal
        ? (this.props.deal.amount / 100).toString().replace(/\./, ',')
        : '',
      consulenteVendita: this.props.deal
        ? this.props.deal.consulenteVendita
        : '',
      provvM2square: this.props.deal
        ? (this.props.deal.provvM2square / 100).toString().replace(/\./, ',')
        : '',
      dealType: this.props.deal ? this.props.deal.dealType : '',
      provvStefano: this.props.deal
        ? (this.props.deal.provvStefano / 100).toString().replace(/\./, ',')
        : '',
      payedStefano: this.props.deal ? this.props.deal.payedStefano : false,
      payedAtStefano: this.props.deal
        ? this.props.deal.payedAtStefano &&
          moment(this.props.deal.payedAtStefano)
        : null,
      calendarPayedAtStefanoFocused: false,
      agenziaPartnerId: this.props.deal ? this.props.deal.agenziaPartnerId : '',
      provvAgenziaPartner: this.props.deal
        ? (this.props.deal.provvAgenziaPartner / 100)
            .toString()
            .replace(/\./, ',')
        : '0',
      payedAgenziaPartner: this.props.deal
        ? this.props.deal.payedAgenziaPartner
        : false,
      createdAt: this.props.deal
        ? this.props.deal.createdAt && moment(this.props.deal.createdAt)
        : null,
      calendarFocused: false,
      venditoreId: this.props.deal ? this.props.deal.venditoreId : '',
      venditoreId2: this.props.deal ? this.props.deal.venditoreId2 : '',
      acquirenteId: this.props.deal ? this.props.deal.acquirenteId : '',
      acquirenteId2: this.props.deal ? this.props.deal.acquirenteId2 : '',
      notaioId: this.props.deal ? this.props.deal.notaioId : '',
      dataRogito: this.props.deal
        ? this.props.deal.dataRogito && moment(this.props.deal.dataRogito)
        : null,
      calendarDataRogitoFocused: false,
      dataConsegna: this.props.deal
        ? this.props.deal.dataConsegna && moment(this.props.deal.dataConsegna)
        : null,
      calendarDataConsegnaFocused: false,
      linguaRogito: this.props.deal ? this.props.deal.linguaRogito : '',
      belastungsVollmacht: this.props.deal
        ? this.props.deal.belastungsVollmacht
        : false,
      note: this.props.deal ? this.props.deal.note : '',
      error: '',
      modificato: '',
      provvSum: 0
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const prezzoDiVendita =
      parseFloat(this.state.data.prezzoDiVendita.replace(/,/, '.'), 10) * 100;
    const amount =
      parseFloat(this.state.data.amount.replace(/,/, '.'), 10) * 100;
    const provvM2square =
      parseFloat(this.state.data.provvM2square.replace(/,/, '.'), 10) * 100;
    const provvStefano =
      parseFloat(this.state.data.provvStefano.replace(/,/, '.'), 10) * 100;
    const provvAgenziaPartner =
      parseFloat(this.state.data.provvAgenziaPartner.replace(/,/, '.'), 10) *
      100;
    const provvSum = provvM2square + provvStefano + provvAgenziaPartner;

    if (
      !this.state.data.oggettoId ||
      !this.state.data.amount ||
      !this.state.data.acquirenteId
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
        oggettoId: this.state.data.oggettoId,
        prezzoDiVendita,
        amount,
        consulenteVendita: this.state.data.consulenteVendita,
        provvM2square,
        dealType: this.state.data.dealType,
        provvStefano,
        payedStefano: this.state.data.payedStefano,
        payedAtStefano: this.state.data.payedAtStefano
          ? this.state.data.payedAtStefano.valueOf()
          : null,
        agenziaPartnerId: this.state.data.agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner: this.state.data.payedAgenziaPartner,
        createdAt: this.state.data.createdAt
          ? this.state.data.createdAt.valueOf()
          : null,
        venditoreId: this.state.data.venditoreId,
        venditoreId2: this.state.data.venditoreId2,
        acquirenteId: this.state.data.acquirenteId,
        acquirenteId2: this.state.data.acquirenteId2,
        notaioId: this.state.data.notaioId,
        dataRogito: this.state.data.dataRogito
          ? this.state.data.dataRogito.valueOf()
          : null,
        dataConsegna: this.state.data.dataConsegna
          ? this.state.data.dataConsegna.valueOf()
          : null,
        linguaRogito: this.state.data.linguaRogito,
        belastungsVollmacht: this.state.data.belastungsVollmacht,
        calendarDataFatturaFocused: false,
        note: this.state.data.note
      });
    }
  };

  render() {
    return (
      <Translation>
        {t => {
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
          const consulenteVenditaOptions = this.props.utenti.map(
            consulente => ({
              value: consulente.id,
              label: consulente.name
            })
          );
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
              {this.state.data.error && (
                <p className='form__error'>{this.state.data.error}</p>
              )}
              <div>
                <button className='btn-floating blue right'>
                  <i className='material-icons'>save</i>
                </button>
              </div>
              {t('Tipo di vendita')}:
              <Select
                name={'dealType'}
                value={this.state.data.dealType}
                options={dealTypeOptions}
                onChange={this.onDealTypeChange}
              />
              {t('Oggetto')}:
              <Select
                name='oggettoId'
                value={this.state.data.oggettoId}
                options={oggettiOptions}
                onChange={this.onOggettoChange}
              />
              {t('Data prenotazione')}:
              <SingleDatePicker
                date={this.state.data.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.data.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                showClearDate={true}
              />
              {this.renderInput(
                'prezzoDiVendita',
                t('Prezzo di vendita'),
                'number'
              )}
              {}:
              <input
                name='prezzoDiVendita'
                className={`text-input text-input--${this.state.data.modificato.prezzoDiVendita}`}
                type='text'
                placeholder='Prezzo di vendita'
                value={this.state.data.prezzoDiVendita}
                onChange={this.changeHandlerValuta}
              />
              {t('Provvigione totale')}:
              <input
                name='amount'
                className={`text-input text-input--${this.state.data.modificato.amount}`}
                type='text'
                placeholder={`6%: ${parseFloat(
                  this.state.data.prezzoDiVendita.replace(/,/, '.'),
                  10
                ) * 0.06}`}
                value={this.state.data.amount}
                onChange={this.changeHandlerValuta}
              />
              {t('Consulente vendita')}:
              <Select
                name='consulentevendita'
                value={this.state.data.consulenteVendita}
                options={consulenteVenditaOptions}
                onChange={this.onConsulenteVenditaChange}
              />
              {t('Provvigione')} m2Square:
              <input
                name='provvM2square'
                className={`text-input text-input--${this.state.data.modificato.provvM2square}`}
                type='text'
                placeholder={`80%: ${parseFloat(
                  this.state.data.amount.replace(/,/, '.') -
                    this.state.data.provvAgenziaPartner.replace(/,/, '.'),
                  10
                ) * 0.8}`}
                value={this.state.data.provvM2square}
                onChange={this.changeHandlerValuta}
              />
              {t('Provvigione')} {t('Consulente vendita')}:
              <input
                name='provvStefano'
                className={`text-input text-input--${this.state.data.modificato.provvStefano}`}
                type='text'
                placeholder={`20%: ${parseFloat(
                  this.state.data.amount.replace(/,/, '.') -
                    this.state.data.provvAgenziaPartner.replace(/,/, '.'),
                  10
                ) * 0.2}`}
                value={this.state.data.provvStefano}
                onChange={this.changeHandlerValuta}
              />
              <label>
                <input
                  type='checkbox'
                  name='payedStefano'
                  checked={this.state.data.payedStefano}
                  onChange={() => {
                    this.setState(() => ({
                      payedStefano: !this.state.data.payedStefano,
                      payedAtStefano: null
                    }));
                  }}
                />
                <span>{t('Pagato')}</span>
              </label>
              <div className={`visible-${this.state.data.payedStefano} form`}>
                {t('Pagato il')}:
                <SingleDatePicker
                  date={this.state.data.payedAtStefano}
                  onDateChange={this.onPayedAtDateStefanoChange}
                  focused={this.state.data.calendarPayedAtStefanoFocused}
                  onFocusChange={this.onFocusPayedAtStefanoChange}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                  showClearDate={true}
                />
              </div>
              {t('Partner commerciale')}:
              <Select
                name='agenziapartner'
                value={this.state.data.agenziaPartnerId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAgenziaPartnerChange}
              />
              {t('Provvigione')} {t('Partner commerciale')}
              <input
                name='provvAgenziaPartner'
                className={`text-input text-input--${this.state.data.modificato.provvAgenziaPartner}`}
                type='text'
                placeholder='Provvigione Agenzia Partner'
                value={this.state.data.provvAgenziaPartner}
                onChange={this.changeHandlerValuta}
              />
              <label>
                <input
                  type='checkbox'
                  name='payedAgenziaPartner'
                  checked={this.state.data.payedAgenziaPartner}
                  onChange={() => {
                    this.setState(() => ({
                      payedAgenziaPartner: !this.state.data.payedAgenziaPartner
                    }));
                  }}
                />
                <span>{t('Pagato')}</span>
              </label>
              {t('Venditore')}:
              <Select
                id='venditoreId'
                value={this.state.data.venditoreId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onVenditoreIdChange}
              />
              2. {t('Venditore')}:
              <Select
                name='venditore2'
                value={this.state.data.venditoreId2}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onVenditoreIdChange2}
              />
              {t('Acquirente')}:
              <Select
                name='acquirente'
                value={this.state.data.acquirenteId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAcquirenteIdChange}
              />
              2. {t('Acquirente')}:
              <Select
                name='acquirente2'
                value={this.state.data.acquirenteId2}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onAcquirenteIdChange2}
              />
              {t('Notaio')}:
              <Select
                name='notaio'
                value={this.state.data.notaioId}
                options={options}
                filterOptions={filterOptions}
                onChange={this.onNotaioIdChange}
              />
              {t('Data del rogito')}:
              <SingleDatePicker
                date={this.state.data.dataRogito}
                onDateChange={this.onDataRogitoChange}
                focused={this.state.data.calendarDataRogitoFocused}
                onFocusChange={this.onFocusDataRogitoChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                showClearDate={true}
              />
              {t('Lingua del rogito')}:
              <Select
                name={'linguaRogito'}
                value={this.state.data.linguaRogito}
                options={linguaRogitoOptions}
                onChange={this.onLinguaRogitoChange}
              />
              <label>
                <input
                  type='checkbox'
                  name='belastungsVollmacht'
                  checked={this.state.data.belastungsVollmacht}
                  onChange={() => {
                    this.setState(() => ({
                      belastungsVollmacht: !this.state.data.belastungsVollmacht
                    }));
                  }}
                />
                <span>{t('Delega per gravami')}</span>
              </label>
              {t('Data consegna immobile')}:
              <SingleDatePicker
                date={this.state.data.dataConsegna}
                onDateChange={this.onDataConsegnaChange}
                focused={this.state.data.calendarDataConsegnaFocused}
                onFocusChange={this.onFocusDataConsegnaChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                showClearDate={true}
              />
              <textarea
                name='note'
                className={`textarea text-input--${this.state.data.modificato.note}`}
                placeholder={t('Note (opzionale)')}
                value={this.state.data.note}
                onChange={this.changeHandler}
              ></textarea>
              <div>
                <button className='btn-floating blue right'>
                  <i className='material-icons'>save</i>
                </button>{' '}
              </div>
            </form>
          );
        }}
      </Translation>
    );
  }
}

const mapStateToProps = state => ({
  utenti: state.utenti,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(DealForm);
