import React, { Component } from 'react';
import { connect } from 'react-redux';
import withForm from '../common/withForm';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { withTranslation } from 'react-i18next';
import { notarDatenblatt } from '../moduli/NotarDatenblatt';

class NotarDatenblattForm extends Component {
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
    const verwalter = this.findContact(oggetto.verwalter);

    if (!this.props.data.oggettoId) {
      this.setState(() => ({ error: this.props.t('Inserisci oggetto') }));
    } else {
      this.setState(() => ({ error: '' }));
      notarDatenblatt(
        acquirente[0],
        acquirente2[0],
        venditore[0],
        venditore2[0],
        oggetto,
        notaio[0],
        verwalter[0],
        this.props.data.belastungsVollmacht,
        this.props.utente,
        this.props.firma,
        this.props.ceo,
        prezzoDiVendita,
        this.props.data.linguaRogito
      );
    }
  };
  render() {
    const { t } = this.props;
    const options = this.props.clienti.map(cliente => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${cliente.ditta &&
        `- Firma ${cliente.ditta}`}`
    }));

    const filterOptions = createFilterOptions({ options });

    const oggettiOptions = this.props.oggetti.map(oggetto => ({
      value: oggetto.id,
      label: `${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
    }));

    const linguaRogitoOptions = [
      'Englisch',
      'Italienisch',
      'Spanisch',
      'Französisch',
      'Englisch-Italienisch',
      'Englisch-Französisch',
      'Englisch-Spanisch'
    ].map(linguaRogito => ({
      value: linguaRogito,
      label: t(linguaRogito)
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
          {t('Venditore')}:
          <Select
            name='venditore'
            value={this.props.data.venditoreId}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('venditoreId', e && e.value)
            }
          />
          2. {t('Venditore')}:
          <Select
            name='venditore2'
            value={this.props.data.venditoreId2}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('venditoreId2', e && e.value)
            }
          />
          {t('Acquirente')}:
          <Select
            name='acquirente'
            value={this.props.data.acquirenteId}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('acquirenteId', e && e.value)
            }
          />
          2. {t('Acquirente')}:
          <Select
            name='acquirente2'
            value={this.props.data.acquirenteId2}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('acquirenteId2', e && e.value)
            }
          />
          {t('Notaio')}:
          <Select
            name='notaio'
            value={this.props.data.notaioId}
            options={options}
            filterOptions={filterOptions}
            onChange={e =>
              this.props.changeHandlerSelect('notaioId', e && e.value)
            }
          />
          {t('Oggetto')}:
          <Select
            name='oggettoId'
            value={this.props.data.oggettoId}
            options={oggettiOptions}
            onChange={e =>
              this.props.changeHandlerSelect('oggettoId', e && e.value)
            }
          />
          {t('Prezzo di vendita')}:
          <input
            name='prezzoDiVendita'
            className={`text-input`}
            type='text'
            placeholder='Prezzo di vendita'
            value={this.props.data.prezzoDiVendita}
            onChange={this.props.changeHandlerValuta}
          />
          {t('Lingua del rogito')}:
          <Select
            name={'linguaRogito'}
            value={this.props.data.linguaRogito}
            options={linguaRogitoOptions}
            onChange={e =>
              this.props.changeHandlerSelect('linguaRogito', e && e.value)
            }
          />
          <label>
            <input
              type='checkbox'
              name='belastungsVollmacht'
              checked={this.props.data.belastungsVollmacht}
              onChange={this.props.changeCheckbox}
            />
            <span>{t('Delega per gravami')}</span>
          </label>
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
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid),
  utenti: state.utenti,
  ceo: state.utenti.filter(utente => utente.qualifica === 'Geschäftsführer'),
  firma: state.firma[0]
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(NotarDatenblattForm))
);
