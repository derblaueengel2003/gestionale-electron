import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';
import { trasformaInNumero } from '../common/utils';

export class FatturaForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fatture } = this.props.data;

    const deal = this.props.deals.find((deal) => deal.id === fatture.dealId);
    console.log(deal);
    const importoNetto =
      trasformaInNumero(fatture.importoNetto) || (deal && deal.amount) || '0';
    const mahngebuehren = trasformaInNumero(fatture.mahngebuehren);
    const mahngebuehren2 = trasformaInNumero(fatture.mahngebuehren2);

    if (
      !fatture.numeroFattura ||
      !fatture.dataFattura ||
      !fatture.clienteId ||
      (!fatture.dealId && !fatture.descrizioneProdotto)
    ) {
      this.props.renderError(this.props.t('invoice_form_submission_error'));
    } else {
      this.props.renderError('');
      this.props.onSubmit({
        dealId: fatture.dealId,
        clienteId: fatture.clienteId,
        clienteId2: fatture.clienteId2,
        numeroFattura: fatture.numeroFattura,
        dataFattura: fatture.dataFattura ? fatture.dataFattura.valueOf() : null,
        dataZahlungserinnerung: fatture.dataZahlungserinnerung
          ? fatture.dataZahlungserinnerung.valueOf()
          : null,
        dataMahnung: fatture.dataMahnung ? fatture.dataMahnung.valueOf() : null,
        dataMahnung2: fatture.dataMahnung2
          ? fatture.dataMahnung2.valueOf()
          : null,
        mahngebuehren,
        mahngebuehren2,
        payed: fatture.payed,
        payedAt: fatture.payedAt ? fatture.payedAt.valueOf() : null,
        descrizioneProdotto: fatture.descrizioneProdotto,
        importoNetto,
        dataPrestazione: fatture.dataPrestazione
          ? fatture.dataPrestazione.valueOf()
          : null,
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
      changeHandlerValuta,
    } = this.props;

    const { fatture } = this.props.data;

    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- Firma ${cliente.ditta}`
      }`,
    }));

    const dealIdOptions = this.props.deals.map((deal) => {
      const oggetto = this.props.oggetti.find(
        (ogg) => ogg.id === deal.oggettoId
      );
      return {
        value: deal.id,
        label: `${oggetto.rifId} - 
                        ${oggetto.via} 
                        ${oggetto.numeroCivico},
                        WE ${oggetto.numeroAppartamento}`,
      };
    });

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}{' '}
        <div className='fixed-action-btn'>
          <button className='btn-floating blue btn-large'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSelect('fatture', 'dealId', dealIdOptions, t('Vendita'))}
        {renderSelect('fatture', 'clienteId', options, t('Cliente'), '*')}
        {renderSelect('fatture', 'clienteId2', options, '2. ' + t('Cliente'))}
        {renderInput(
          'fatture',
          'numeroFattura',
          t('Numero fattura'),
          undefined,
          undefined,
          undefined,
          undefined,
          '*'
        )}
        {renderInput(
          'fatture',
          'importoNetto',
          t('Importo netto'),
          undefined,
          changeHandlerValuta
        )}
        {renderSingleDate(
          'fatture',
          'dataFattura',
          'calendarDataFatturaFocused',
          t('Data fattura'),
          '*'
        )}
        {renderSingleDate(
          'fatture',
          'dataZahlungserinnerung',
          'calendarDataZahlungserinnerungFocused',
          t('Data sollecito')
        )}
        {renderSingleDate(
          'fatture',
          'dataMahnung',
          'calendarDataMahnungFocused',
          '1. ' + t('Sollecito con penale')
        )}
        {renderInput(
          'fatture',
          'mahngebuehren',
          '1. ' + t('Penale'),
          undefined,
          changeHandlerValuta
        )}
        {renderSingleDate(
          'fatture',
          'dataMahnung2',
          'calendarDataMahnung2Focused',
          '2. ' + t('Sollecito con penale')
        )}
        {renderInput(
          'fatture',
          'mahngebuehren2',
          '2. ' + t('Penale'),
          undefined,
          changeHandlerValuta
        )}
        {renderCheckbox('fatture', 'payed', t('Pagato'))}
        <div className={`visible-${fatture.payed} form`}>
          {renderSingleDate(
            'fatture',
            'payedAt',
            'calendarPayedAtFocused',
            t('Pagato il')
          )}
        </div>
        <blockquote>
          {t('Usare questi campi solo se non si è associata una vendita!')}{' '}
          {renderInput(
            'fatture',
            'descrizioneProdotto',
            t('Descrizione prodotto')
          )}
          {renderSingleDate(
            'fatture',
            'dataPrestazione',
            'calendarDataPrestazioneFocused',
            t('Data prestazione')
          )}
        </blockquote>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  deals: state.deals,
  clienti: state.clienti,
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(FatturaForm))
);
