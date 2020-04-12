import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { maklerAlleinauftrag } from './MaklerAlleinauftrag';

export class MAAForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const venditore = this.props.clienti.find(
      (cliente) => cliente.id === this.props.data.moduli.venditoreId
    );
    const venditore2 = this.props.clienti.find(
      (cliente) => cliente.id === this.props.data.moduli.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      (oggetto) => oggetto.id === this.props.data.moduli.oggettoId
    );
    const startDate = this.props.data.moduli.startDate;
    const endDate = this.props.data.moduli.endDate;
    const prezzoDiVendita = this.props.data.moduli.prezzoDiVendita;
    const prezzoDiVendita2 = this.props.data.moduli.prezzoDiVendita2;
    const maklerProvision = this.props.data.moduli.maklerProvision;
    const sonstige = this.props.data.moduli.sonstige;

    if (
      !this.props.data.moduli.oggettoId ||
      !this.props.data.moduli.venditoreId
    ) {
      this.setState(() => ({
        error: [this.props.t('Inserisci venditore e oggetto')],
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
    const {
      t,
      renderSelect,
      renderInput,
      renderDateRange,
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
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Mandato alla vendita')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.moduli.error && (
            <p className='form__error'>{this.props.data.moduli.error}</p>
          )}
          {renderSelect('moduli', 'venditoreId', options, t('Venditore'))}
          {renderSelect(
            'moduli',
            'venditoreId2',
            options,
            '2. ' + t('Venditore')
          )}
          {renderSelect('moduli', 'oggettoId', oggettiOptions, t('Oggetto'))}
          {renderDateRange(
            'moduli',
            'calendarFocusedMAA',
            t('Periodo di esclusiva')
          )}

          {renderInput(
            'moduli',
            'prezzoDiVendita',
            t('Prezzo di vendita') + ' min.',
            undefined,
            changeHandlerValuta
          )}
          {renderInput(
            'moduli',
            'prezzoDiVendita2',
            t('Prezzo di vendita') + ' max.',
            undefined,
            changeHandlerValuta
          )}
          {renderInput('moduli', 'maklerProvision', t('Provvigione'))}
          {renderInput('moduli', 'sonstige', t('Altri accordi'))}
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

const mapStateToProps = (state) => ({
  clienti: state.clienti,
  oggetti: state.oggetti,
  firma: state.firma[0],
});

export default connect(mapStateToProps)(withTranslation()(withForm(MAAForm)));
