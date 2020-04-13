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

    const { deals } = this.props.data;

    const prezzoDiVendita =
      parseFloat(deals.prezzoDiVendita.replace(/,/, '.'), 10) * 100;
    const amount = parseFloat(deals.amount.replace(/,/, '.'), 10) * 100;
    const provvM2square =
      parseFloat(deals.provvM2square.replace(/,/, '.'), 10) * 100;
    const provvStefano =
      parseFloat(deals.provvStefano.replace(/,/, '.'), 10) * 100;
    const provvAgenziaPartner =
      parseFloat(deals.provvAgenziaPartner.replace(/,/, '.'), 10) * 100;
    const provvSum = provvM2square + provvStefano + provvAgenziaPartner;

    if (!deals.oggettoId || !deals.amount || !deals.acquirenteId) {
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
        oggettoId: deals.oggettoId,
        prezzoDiVendita,
        amount,
        consulenteVendita: deals.consulenteVendita,
        provvM2square,
        dealType: deals.dealType,
        provvStefano,
        payedStefano: deals.payedStefano,
        payedAtStefano: deals.payedAtStefano
          ? deals.payedAtStefano.valueOf()
          : null,
        agenziaPartnerId: deals.agenziaPartnerId,
        provvAgenziaPartner,
        payedAgenziaPartner: deals.payedAgenziaPartner,
        createdAt: deals.createdAt ? deals.createdAt.valueOf() : null,
        venditoreId: deals.venditoreId,
        venditoreId2: deals.venditoreId2,
        acquirenteId: deals.acquirenteId,
        acquirenteId2: deals.acquirenteId2,
        notaioId: deals.notaioId,
        dataRogito: deals.dataRogito ? deals.dataRogito.valueOf() : null,
        dataConsegna: deals.dataConsegna ? deals.dataConsegna.valueOf() : null,
        linguaRogito: deals.linguaRogito,
        belastungsVollmacht: deals.belastungsVollmacht,
        calendarDataFatturaFocused: false,
        note: deals.note,
      });
    }
  };

  render() {
    const { deals } = this.props.data;

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
        {deals.error && <p className='form__error'>{deals.error}</p>}
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
            parseFloat(deals.prezzoDiVendita.replace(/,/, '.'), 10) * 0.06
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
              deals.amount.replace(/,/, '.') -
                deals.provvAgenziaPartner.replace(/,/, '.'),
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
              deals.amount.replace(/,/, '.') -
                deals.provvAgenziaPartner.replace(/,/, '.'),
              10
            ) * 0.2
          }`
        )}
        {renderCheckbox('deals', 'payedStefano', t('Pagato'))}
        <div className={`visible-${deals.payedStefano} form`}>
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
