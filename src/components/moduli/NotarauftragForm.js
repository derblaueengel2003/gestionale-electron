import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { vollmachtNotarauftrag } from './VollmachtNotarauftrag';

export class NotarauftragForm extends React.Component {
  findContact = contactId => {
    return this.props.clienti.filter(cliente => cliente.id === contactId);
  };
  onSubmit = e => {
    e.preventDefault();
    const acquirente = this.findContact(this.props.data.acquirenteId);
    const acquirente2 = this.findContact(this.props.data.acquirenteId2);
    const venditore = this.findContact(this.props.data.venditoreId);
    const venditore2 = this.findContact(this.props.data.venditoreId2);
    const notaio = this.findContact(this.props.data.notaioId);
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.props.data.oggettoId
    );
    const prezzoDiVendita = this.props.data.prezzoDiVendita * 100;

    if (!this.props.data.oggettoId) {
      this.setState(() => ({ error: this.props.t('Inserisci oggetto') }));
    } else {
      this.setState(() => ({ error: '' }));
      vollmachtNotarauftrag(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        prezzoDiVendita,
        this.props.firma
      );
    }
  };

  render() {
    const { t, renderSelect, renderInput, changeHandlerValuta } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));

    const oggettiOptions = this.props.oggetti.map(oggetto => ({
      value: oggetto.id,
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));

    return (
      <div>
        <div>
          <div className='container'>
            <h1>{t('Delega richiesta bozza di contratto')}</h1>
          </div>
        </div>
        <form className='form container' onSubmit={this.onSubmit}>
          {this.props.data.error && (
            <p className='form__error'>{this.props.data.error}</p>
          )}
          {renderSelect('acquirenteId', options, t('Acquirente'))}
          {renderSelect('acquirenteId2', options, '2. ' + t('Acquirente'))}
          {renderSelect('venditoreId', options, t('Venditore'))}
          {renderSelect('venditoreId2', options, '2. ' + t('Venditore'))}
          {renderSelect('notaioId', options, t('Notaio'))}
          {renderSelect('oggettoId', oggettiOptions, t('Oggetto'))}
          {renderInput(
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

const mapStateToProps = state => ({
  clienti: state.clienti,
  oggetti: state.oggetti,
  firma: state.firma[0]
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(NotarauftragForm))
);
