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
        note: this.props.data.note,
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
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSelect('dealType', dealTypeOptions, t('Tipo di vendita'))}
        {renderSelect('oggettoId', oggettiOptions, t('Oggetto'))}
        {renderSingleDate(
          'createdAt',
          'calendarFocused',
          t('Data prenotazione')
        )}
        {renderInput(
          'prezzoDiVendita',
          t('Prezzo di vendita'),
          undefined,
          changeHandlerValuta
        )}
        {renderInput(
          'amount',
          t('Provvigione totale'),
          undefined,
          changeHandlerValuta,
          undefined,
          `6%: ${
            parseFloat(this.props.data.prezzoDiVendita.replace(/,/, '.'), 10) *
            0.06
          }`
        )}
        {renderSelect(
          'consulenteVendita',
          consulenteVenditaOptions,
          t('Consulente vendita')
        )}
        {renderInput(
          'provvM2square',
          t('Provvigione') + ' m2Square',
          undefined,
          changeHandlerValuta,
          undefined,
          `80%: ${
            parseFloat(
              this.props.data.amount.replace(/,/, '.') -
                this.props.data.provvAgenziaPartner.replace(/,/, '.'),
              10
            ) * 0.8
          }`
        )}
        {renderInput(
          'provvStefano',
          `${t('Provvigione')} ${t('Consulente vendita')}`,
          undefined,
          changeHandlerValuta,
          undefined,
          `20%: ${
            parseFloat(
              this.props.data.amount.replace(/,/, '.') -
                this.props.data.provvAgenziaPartner.replace(/,/, '.'),
              10
            ) * 0.2
          }`
        )}
        {renderCheckbox('payedStefano', t('Pagato'))}
        <div className={`visible-${this.props.data.payedStefano} form`}>
          {renderSingleDate(
            'payedAtStefano',
            'calendarPayedAtStefanoFocused',
            t('Pagato il')
          )}
        </div>
        {renderSelect('agenziaPartnerId', options, t('Partner commerciale'))}
        {renderInput(
          'provvAgenziaPartner',
          `${t('Provvigione')} ${t('Partner commerciale')}`,
          undefined,
          changeHandlerValuta
        )}
        {renderCheckbox('payedAgenziaPartner', t('Pagato'))}
        {renderSelect('venditoreId', options, t('Venditore'))}
        {renderSelect('venditoreId2', options, '2. ' + t('Venditore'))}
        {renderSelect('acquirenteId', options, t('Acquirente'))}
        {renderSelect('acquirenteId2', options, '2. ' + t('Acquirente'))}
        {renderSelect('notaioId', options, t('Notaio'))}
        {renderSingleDate(
          'dataRogito',
          'calendarDataRogitoFocused',
          t('Data del rogito')
        )}
        {renderSelect(
          'linguaRogito',
          linguaRogitoOptions,
          t('Lingua del rogito')
        )}
        {renderCheckbox('belastungsVollmacht', t('Delega per gravami'))}
        {renderSingleDate(
          'dataConsegna',
          'calendarDataConsegnaFocused',
          t('Data consegna immobile')
        )}
        {renderTextArea('note', t('Note (opzionale)'))}

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
