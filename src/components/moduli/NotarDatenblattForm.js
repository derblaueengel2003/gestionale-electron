import React, { Component } from 'react';
import { connect } from 'react-redux';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { withTranslation } from 'react-i18next';
import { notarDatenblatt } from '../moduli/NotarDatenblatt';

class NotarDatenblattForm extends Component {
  findContact = (contactId) => {
    return this.props.clienti.filter((cliente) => cliente.id === contactId);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const acquirente = this.findContact(this.props.data.moduli.acquirenteId);
    const acquirente2 = this.findContact(this.props.data.moduli.acquirenteId2);
    const venditore = this.findContact(this.props.data.moduli.venditoreId);
    const venditore2 = this.findContact(this.props.data.moduli.venditoreId2);
    const notaio = this.findContact(this.props.data.moduli.notaioId);

    const oggetto = this.props.oggetti.find(
      (oggetto) => oggetto.id === this.props.data.moduli.oggettoId
    );
    const prezzoDiVendita =
      parseFloat(this.props.data.moduli.prezzoDiVendita.replace(/,/, '.'), 10) *
      100;
    const verwalter = oggetto && this.findContact(oggetto.verwalter);

    if (!this.props.data.moduli.oggettoId) {
      this.props.renderError(this.props.t('Inserisci oggetto'));
    } else {
      this.props.renderError('');
      notarDatenblatt(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        verwalter[0],
        this.props.data.moduli.belastungsVollmacht,
        this.props.utente,
        this.props.firma,
        this.props.ceo,
        prezzoDiVendita,
        this.props.data.moduli.linguaRogito
      );
    }
  };
  render() {
    const {
      t,
      renderSelect,
      renderCheckbox,
      renderInput,
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
      <div>
        <div>
          <div className='container'>
            <h1>{t('Foglio informativo per il notaio')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}
          {renderSelect('moduli', 'venditoreId', options, t('Venditore'))}
          {renderSelect(
            'moduli',
            'venditoreId2',
            options,
            '2. ' + t('Venditore')
          )}
          {renderSelect('moduli', 'acquirenteId', options, t('Acquirente'))}
          {renderSelect(
            'moduli',
            'acquirenteId2',
            options,
            '2. ' + t('Acquirente')
          )}
          {renderSelect('moduli', 'notaioId', options, t('Notaio'))}
          {renderSelect(
            'moduli',
            'oggettoId',
            oggettiOptions,
            t('Oggetto'),
            '*'
          )}
          {renderInput(
            'moduli',
            'prezzoDiVendita',
            t('Prezzo di vendita'),
            undefined,
            changeHandlerValuta
          )}
          {renderSelect(
            'moduli',
            'linguaRogito',
            linguaRogitoOptions,
            t('Lingua del rogito')
          )}
          {renderCheckbox(
            'moduli',
            'belastungsVollmacht',
            t('Delega per gravami')
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
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
  utenti: state.utenti,
  ceo: state.utenti.filter((utente) => utente.role === 'Geschäftsführer'),
  firma: state.firma[0],
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(NotarDatenblattForm))
);
