import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { formattaData } from '../common/utils';
import { DSGVO } from './Dsgvo';

export class DsgvoForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const cliente = this.props.clienti.find(
      (cliente) => cliente.id === this.props.data.moduli.venditoreId
    );
    const cliente2 = this.props.clienti.find(
      (cliente) => cliente.id === this.props.data.moduli.venditoreId2
    );
    const oggetto = this.props.oggetti.find(
      (oggetto) => oggetto.id === this.props.data.moduli.oggettoId
    );
    const createdAt = formattaData(this.props.data.moduli.createdAt);

    if (
      !this.props.data.moduli.oggettoId ||
      !this.props.data.moduli.venditoreId
    ) {
      this.props.renderError(this.props.t('Inserisci cliente e oggetto'));
    } else {
      this.props.renderError('');
      DSGVO(
        cliente,
        cliente2,
        createdAt,
        oggetto,
        this.props.firma,
        this.props.data.moduli.seller
      );
    }
  };

  render() {
    const { t, renderSelect, renderSingleDate, renderCheckbox } = this.props;
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
            <h1>{t('Informativa sul trattamento dei dati personali')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}
          {renderSelect('moduli', 'venditoreId', options, t('Cliente'), '*')}
          {renderSelect(
            'moduli',
            'venditoreId2',
            options,
            '2. ' + t('Cliente')
          )}
          {renderSelect(
            'moduli',
            'oggettoId',
            oggettiOptions,
            t('Oggetto'),
            '*'
          )}
          {renderSingleDate(
            'moduli',
            'createdAt',
            'calendarFocused',
            t('Data del contratto')
          )}
          {renderCheckbox('moduli', 'seller', t('Venditore'))}
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

export default connect(mapStateToProps)(withTranslation()(withForm(DsgvoForm)));
