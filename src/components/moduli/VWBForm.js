import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { widerrufsBelehrung } from './WiderrufsBelehrung';

export class VWBForm extends React.Component {
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
    const createdAt = moment(this.props.data.moduli.createdAt).format(
      'DD.MM.YYYY'
    );

    if (
      !this.props.data.moduli.oggettoId ||
      !this.props.data.moduli.venditoreId
    ) {
      this.props.renderError(this.props.t('Inserisci venditore e oggetto'));
    } else {
      this.props.renderError('');
      widerrufsBelehrung(
        venditore,
        venditore2,
        createdAt,
        oggetto,
        this.props.firma
      );
    }
  };

  render() {
    const { t, renderSelect, renderSingleDate } = this.props;
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
            <h1>{t('Informativa sul diritto di recesso')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.moduli.error && (
            <p className='form__error'>{this.props.data.moduli.error}</p>
          )}
          {renderSelect('moduli', 'venditoreId', options, t('Cliente'))}
          {renderSelect(
            'moduli',
            'venditoreId2',
            options,
            '2. ' + t('Cliente')
          )}
          {renderSelect('moduli', 'oggettoId', oggettiOptions, t('Oggetto'))}
          {renderSingleDate(
            'moduli',
            'createdAt',
            'calendarFocused',
            t('Data del contratto')
          )}
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

export default connect(mapStateToProps)(withTranslation()(withForm(VWBForm)));
