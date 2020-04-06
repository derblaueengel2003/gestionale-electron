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
    const {
      t,
      renderSelect,
      renderCheckbox,
      renderInput,
      renderSingleDate,
      changeHandlerValuta
    } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));

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
        {renderSelect('dealId', dealIdOptions, t('Vendita'))}
        {renderSelect('clienteId', options, t('Cliente'))}
        {renderSelect('clienteId2', options, '2. ' + t('Cliente'))}
        {renderInput('numeroFattura', t('Numero fattura'))}
        {renderSingleDate(
          'dataFattura',
          'calendarDataFatturaFocused',
          t('Data fattura')
        )}
        {renderSingleDate(
          'dataZahlungserinnerung',
          'calendarDataZahlungserinnerungFocused',
          t('Data sollecito')
        )}
        {renderSingleDate(
          'dataMahnung',
          'calendarDataMahnungFocused',
          '1. ' + t('Sollecito con penale')
        )}
        {renderInput(
          'mahngebuehren',
          '1. ' + t('Penale'),
          undefined,
          changeHandlerValuta
        )}

        {renderSingleDate(
          'dataMahnung2',
          'calendarDataMahnung2Focused',
          '2. ' + t('Sollecito con penale')
        )}
        {renderInput(
          'mahngebuehren2',
          '2. ' + t('Penale'),
          undefined,
          changeHandlerValuta
        )}
        {renderCheckbox('payed', t('Pagato'))}

        <div className={`visible-${this.props.data.payed} form`}>
          {renderSingleDate(
            'payedAt',
            'calendarPayedAtFocused',
            t('Pagato il')
          )}
        </div>
        <blockquote>
          {t('Usare questi campi solo se non si è associata una vendita!')}{' '}
          {renderInput('descrizioneProdotto', t('Descrizione prodotto'))}
          {renderInput(
            'importoNetto',
            t('Importo netto'),
            undefined,
            changeHandlerValuta
          )}
          {renderSingleDate(
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

const mapStateToProps = state => ({
  deals: state.deals,
  clienti: state.clienti,
  oggetti: state.oggetti
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(FatturaForm))
);
