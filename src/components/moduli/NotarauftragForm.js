import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { vollmachtNotarauftrag } from './VollmachtNotarauftrag';

export class NotarauftragForm extends React.Component {
  findContact = (contactId) => {
    return this.props.clienti.filter((cliente) => cliente.id === contactId);
  };
  onSubmit = (e) => {
    e.preventDefault();

    const {
      acquirenteId,
      acquirenteId2,
      venditoreId,
      venditoreId2,
      notaioId,
      oggettoId,
      prezzoDiVendita,
    } = this.props.data.moduli;

    const acquirente = this.findContact(acquirenteId);
    const acquirente2 = this.findContact(acquirenteId2);
    const venditore = this.findContact(venditoreId);
    const venditore2 = this.findContact(venditoreId2);
    const notaio = this.findContact(notaioId);
    const oggetto = this.props.oggetti.find(
      (oggetto) => oggetto.id === oggettoId
    );
    const prezzo = parseFloat(prezzoDiVendita.replace(/,/, '.'), 10) * 100;

    if (!oggettoId) {
      this.props.renderError(this.props.t('Inserisci oggetto'));
    } else {
      this.props.renderError('');
      vollmachtNotarauftrag(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        prezzo,
        this.props.firma
      );
    }
  };

  render() {
    const {
      t,
      renderSelect,
      renderInput,
      changeHandlerValuta,
      clienti,
      oggetti,
      data,
    } = this.props;

    const options = clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- Firma ${cliente.ditta}`
      }`,
    }));

    const oggettiOptions = oggetti.map((oggetto) => ({
      value: oggetto.id,
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`,
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Delega richiesta bozza di contratto')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {data.error && <p className='form__error'>{data.error}</p>}
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
          {renderSelect('moduli', 'notaioId', options, t('Notaio'))}
          {renderSelect('moduli', 'oggettoId', oggettiOptions, t('Oggetto'))}
          {renderInput(
            'moduli',
            'prezzoDiVendita',
            t('Prezzo di vendita'),
            'text',
            changeHandlerValuta
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
  withTranslation()(withForm(NotarauftragForm))
);
