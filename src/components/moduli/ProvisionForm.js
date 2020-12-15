import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { creaPrenotazione } from './Provisionsbestaetigung';

export class ProvisionForm extends React.Component {
  findContact = (contactId) => {
    return this.props.clienti.filter((cliente) => cliente.id === contactId);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const acquirente = this.findContact(this.props.data.moduli.acquirenteId);
    const acquirente2 = this.findContact(this.props.data.moduli.acquirenteId2);
    const venditore = this.findContact(this.props.data.moduli.venditoreId);
    const venditore2 = this.findContact(this.props.data.moduli.venditoreId2);
    const oggetto = this.props.oggetti.find(
      (oggetto) => oggetto.id === this.props.data.moduli.oggettoId
    );

    const prezzoDiVendita =
      parseFloat(this.props.data.moduli.prezzoDiVendita.replace(/,/, '.'), 10) *
      100;
    const provvPercentuale = this.props.data.moduli.provvPercentuale;

    if (!this.props.data.moduli.oggettoId) {
      this.props.renderError(this.props.t('Inserisci oggetto'));
    } else {
      this.props.renderError('');
      creaPrenotazione(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        provvPercentuale,
        prezzoDiVendita,
        this.props.firma
      );
    }
  };

  render() {
    const { t, renderSelect, renderInput, changeHandlerValuta } = this.props;
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
            <h1>{t('Conferma provvigione')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}
          {renderSelect('moduli', 'acquirenteId', options, t('Acquirente'))}
          {renderSelect(
            'moduli',
            'acquirenteId2',
            options,
            '2. ' + t('Acquirente')
          )}
          {renderSelect('moduli', 'venditoreId', options, t('Venditore'))}
          {renderSelect(
            'moduli',
            'venditoreId2',
            options,
            '2. ' + t('Venditore')
          )}
          {renderSelect('moduli', 'oggettoId', oggettiOptions, t('Oggetto'))}
          {renderInput(
            'moduli',
            'prezzoDiVendita',
            t('Prezzo di vendita'),
            undefined,
            changeHandlerValuta
          )}
          {renderInput(
            'moduli',
            'provvPercentuale',
            t('Provvigione'),
            undefined,
            changeHandlerValuta,
            undefined,
            `${t('senza')} % ${t('es.')} 7,14`
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

export default connect(mapStateToProps)(
  withTranslation()(withForm(ProvisionForm))
);
