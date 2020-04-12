import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class FatturaForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const importoNetto =
      parseFloat(this.props.data.fatture.importoNetto.replace(/,/, '.'), 10) *
      100;
    const mahngebuehren =
      parseFloat(this.props.data.fatture.mahngebuehren.replace(/,/, '.'), 10) *
      100;
    const mahngebuehren2 =
      parseFloat(this.props.data.fatture.mahngebuehren2.replace(/,/, '.'), 10) *
      100;

    if (
      !this.props.data.fatture.numeroFattura ||
      !this.props.data.fatture.dataFattura
    ) {
      this.setState(() => ({
        error: 'Datum und Rechnungsnummer bitte eingeben',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        dealId: this.props.data.fatture.dealId,
        clienteId: this.props.data.fatture.clienteId,
        clienteId2: this.props.data.fatture.clienteId2,
        numeroFattura: this.props.data.fatture.numeroFattura,
        dataFattura: this.props.data.fatture.dataFattura
          ? this.props.data.fatture.dataFattura.valueOf()
          : null,
        dataZahlungserinnerung: this.props.data.fatture.dataZahlungserinnerung
          ? this.props.data.fatture.dataZahlungserinnerung.valueOf()
          : null,
        dataMahnung: this.props.data.fatture.dataMahnung
          ? this.props.data.fatture.dataMahnung.valueOf()
          : null,
        dataMahnung2: this.props.data.fatture.dataMahnung2
          ? this.props.data.fatture.dataMahnung2.valueOf()
          : null,
        mahngebuehren,
        mahngebuehren2,
        payed: this.props.data.fatture.payed,
        payedAt: this.props.data.fatture.payedAt
          ? this.props.data.fatture.payedAt.valueOf()
          : null,
        descrizioneProdotto: this.props.data.fatture.descrizioneProdotto,
        importoNetto,
        dataPrestazione: this.props.data.fatture.dataPrestazione
          ? this.props.data.fatture.dataPrestazione.valueOf()
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
    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- Firma ${cliente.ditta}`
      }`,
    }));

    const dealIdOptions = this.props.deals.map((deal) => ({
      value: deal.id,
      label: `${
        this.props.oggetti.find((ogg) => ogg.id === deal.oggettoId).rifId
      } - 
                        ${
                          this.props.oggetti.find(
                            (ogg) => ogg.id === deal.oggettoId
                          ).via
                        } 
                        ${
                          this.props.oggetti.find(
                            (ogg) => ogg.id === deal.oggettoId
                          ).numeroCivico
                        },
                        WE ${
                          this.props.oggetti.find(
                            (ogg) => ogg.id === deal.oggettoId
                          ).numeroAppartamento
                        }`,
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.fatture.error && (
          <p className='form__error'>{this.props.data.fatture.error}</p>
        )}
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSelect('fatture', 'dealId', dealIdOptions, t('Vendita'))}
        {renderSelect('fatture', 'clienteId', options, t('Cliente'))}
        {renderSelect('fatture', 'clienteId2', options, '2. ' + t('Cliente'))}
        {renderInput('fatture', 'numeroFattura', t('Numero fattura'))}
        {renderSingleDate(
          'fatture',
          'dataFattura',
          'calendarDataFatturaFocused',
          t('Data fattura')
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

        <div className={`visible-${this.props.data.fatture.payed} form`}>
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
          {renderInput(
            'fatture',
            'importoNetto',
            t('Importo netto'),
            undefined,
            changeHandlerValuta
          )}
          {renderSingleDate(
            'fatture',
            'dataPrestazione',
            'calendarDataPrestazioneFocused',
            t('Data prestazione')
          )}
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

const mapStateToProps = (state) => ({
  deals: state.deals,
  clienti: state.clienti,
  oggetti: state.oggetti,
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(FatturaForm))
);
