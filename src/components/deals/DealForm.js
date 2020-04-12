import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

export class DealForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const prezzoDiVendita =
      parseFloat(this.props.data.deals.prezzoDiVendita.replace(/,/, '.'), 10) *
      100;
    const amount =
      parseFloat(this.props.data.deals.amount.replace(/,/, '.'), 10) * 100;
    const provvM2square =
      parseFloat(this.props.data.deals.provvM2square.replace(/,/, '.'), 10) *
      100;
    const provvStefano =
      parseFloat(this.props.data.deals.provvStefano.replace(/,/, '.'), 10) *
      100;
    const provvAgenziaPartner =
      parseFloat(
        this.props.data.deals.provvAgenziaPartner.replace(/,/, '.'),
        10
      ) * 100;
    const provvSum = provvM2square + provvStefano + provvAgenziaPartner;

    if (
      !this.props.data.deals.oggettoId ||
      !this.props.data.deals.amount ||
      !this.props.data.deals.acquirenteId
    ) {
      this.setState(() => ({
        error: 'Objekt, Summe und Käufer bitte ausfüllen.',
      }));
    } else if (amount !== provvSum) {
      const differenza = (provvSum - amount) / 100;
      this.setState(() => ({
        error: `Provisionen-Summe entrspricht nicht die Gesamtprovision. ${differenza} € Unterschied.`,
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        oggettoId: this.props.data.deals.oggettoId,
        prezzoDiVendita,
        amount,
        consulenteVendita: this.props.data.deals.consulenteVendita,
        provvM2square,
        dealType: this.props.data.deals.dealType,
        provvStefano,
        payedStefano: this.props.data.deals.payedStefano,
        payedAtStefano: this.props.data.deals.payedAtStefano
          ? this.props.data.deals.payedAtStefano.valueOf()
          : null,
        agenziaPartnerId: this.props.data.deals.agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner: this.props.data.deals.payedAgenziaPartner,
        createdAt: this.props.data.deals.createdAt
          ? this.props.data.deals.createdAt.valueOf()
          : null,
        venditoreId: this.props.data.deals.venditoreId,
        venditoreId2: this.props.data.deals.venditoreId2,
        acquirenteId: this.props.data.deals.acquirenteId,
        acquirenteId2: this.props.data.deals.acquirenteId2,
        notaioId: this.props.data.deals.notaioId,
        dataRogito: this.props.data.deals.dataRogito
          ? this.props.data.deals.dataRogito.valueOf()
          : null,
        dataConsegna: this.props.data.deals.dataConsegna
          ? this.props.data.deals.dataConsegna.valueOf()
          : null,
        linguaRogito: this.props.data.deals.linguaRogito,
        belastungsVollmacht: this.props.data.deals.belastungsVollmacht,
        calendarDataFatturaFocused: false,
        note: this.props.data.deals.note,
      });
    }
  };

  render() {
    const {
      t,
      renderSelect,
      renderCheckbox,
      renderInput,
      renderSingleDate,
      renderTextArea,
      changeHandlerValuta,
    } = this.props;
    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- Firma ${cliente.ditta}`
      }`,
    }));

    const oggettiOptions = this.props.oggetti.map((oggetto) => ({
      value: oggetto.id,
      label: `Rif.Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));
    const dealTypeOptions = [
      'Kauf Eigentumswohnung',
      'Miete Eigentumswohnung',
      'Kauf Gewerbe',
      'Miete Gewerbe',
      'APH',
      'Sonstiges',
    ].map((dealType) => ({
      value: dealType,
      label: t(dealType),
    }));
    const consulenteVenditaOptions = this.props.utenti.map((consulente) => ({
      value: consulente.id,
      label: consulente.name,
    }));
    const linguaRogitoOptions = [
      'Englisch',
      'Italienisch',
      'Spanisch',
      'Französisch',
      'Englisch-Italienisch',
      'Englisch-Französisch',
      'Englisch-Spanisch',
    ].map((linguaRogito) => ({
      value: linguaRogito,
      label: t(linguaRogito),
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.deals.error && (
          <p className='form__error'>{this.props.data.deals.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSelect(
          'deals',
          'dealType',
          dealTypeOptions,
          t('Tipo di vendita')
        )}
        {renderSelect('deals', 'oggettoId', oggettiOptions, t('Oggetto'))}
        {renderSingleDate(
          'deals',
          'createdAt',
          'calendarFocused',
          t('Data prenotazione')
        )}
        {renderInput(
          'deals',
          'prezzoDiVendita',
          t('Prezzo di vendita'),
          undefined,
          changeHandlerValuta
        )}
        {renderInput(
          'deals',
          'amount',
          t('Provvigione totale'),
          undefined,
          changeHandlerValuta,
          undefined,
          `6%: ${
            parseFloat(
              this.props.data.deals.prezzoDiVendita.replace(/,/, '.'),
              10
            ) * 0.06
          }`
        )}
        {renderSelect(
          'deals',
          'consulenteVendita',
          consulenteVenditaOptions,
          t('Consulente vendita')
        )}
        {renderInput(
          'deals',
          'provvM2square',
          t('Provvigione') + ' m2Square',
          undefined,
          changeHandlerValuta,
          undefined,
          `80%: ${
            parseFloat(
              this.props.data.deals.amount.replace(/,/, '.') -
                this.props.data.deals.provvAgenziaPartner.replace(/,/, '.'),
              10
            ) * 0.8
          }`
        )}
        {renderInput(
          'deals',
          'provvStefano',
          `${t('Provvigione')} ${t('Consulente vendita')}`,
          undefined,
          changeHandlerValuta,
          undefined,
          `20%: ${
            parseFloat(
              this.props.data.deals.amount.replace(/,/, '.') -
                this.props.data.deals.provvAgenziaPartner.replace(/,/, '.'),
              10
            ) * 0.2
          }`
        )}
        {renderCheckbox('deals', 'payedStefano', t('Pagato'))}
        <div className={`visible-${this.props.data.deals.payedStefano} form`}>
          {renderSingleDate(
            'deals',
            'payedAtStefano',
            'calendarPayedAtStefanoFocused',
            t('Pagato il')
          )}
        </div>
        {renderSelect(
          'deals',
          'agenziaPartnerId',
          options,
          t('Partner commerciale')
        )}
        {renderInput(
          'deals',
          'provvAgenziaPartner',
          `${t('Provvigione')} ${t('Partner commerciale')}`,
          undefined,
          changeHandlerValuta
        )}
        {renderCheckbox('deals', 'payedAgenziaPartner', t('Pagato'))}
        {renderSelect('deals', 'venditoreId', options, t('Venditore'))}
        {renderSelect('deals', 'venditoreId2', options, '2. ' + t('Venditore'))}
        {renderSelect('deals', 'acquirenteId', options, t('Acquirente'))}
        {renderSelect(
          'deals',
          'acquirenteId2',
          options,
          '2. ' + t('Acquirente')
        )}
        {renderSelect('deals', 'notaioId', options, t('Notaio'))}
        {renderSingleDate(
          'deals',
          'dataRogito',
          'calendarDataRogitoFocused',
          t('Data del rogito')
        )}
        {renderSelect(
          'deals',
          'linguaRogito',
          linguaRogitoOptions,
          t('Lingua del rogito')
        )}
        {renderCheckbox(
          'deals',
          'belastungsVollmacht',
          t('Delega per gravami')
        )}
        {renderSingleDate(
          'deals',
          'dataConsegna',
          'calendarDataConsegnaFocused',
          t('Data consegna immobile')
        )}
        {renderTextArea('deals', 'note', t('Note (opzionale)'))}

        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>{' '}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  utenti: state.utenti,
  clienti: state.clienti,
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(withTranslation()(withForm(DealForm)));
