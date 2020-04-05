import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import { creaPrenotazione } from './Provisionsbestaetigung';

export class ProvisionForm extends React.Component {
  findContact = contactId => {
    return this.props.clienti.filter(cliente => cliente.id === contactId);
  };
  onSubmit = e => {
    e.preventDefault();
    const acquirente = this.findContact(this.props.data.acquirenteId);
    const acquirente2 = this.findContact(this.props.data.acquirenteId2);
    const venditore = this.findContact(this.props.data.venditoreId);
    const venditore2 = this.findContact(this.props.data.venditoreId2);
    const oggetto = this.props.oggetti.find(
      oggetto => oggetto.id === this.props.data.oggettoId
    );

    const prezzoDiVendita = this.props.data.prezzoDiVendita * 100;
    const provvPercentuale = this.props.data.provvPercentuale;

    if (!this.props.data.oggettoId) {
      this.setState(() => ({ error: this.props.t('Inserisci oggetto') }));
    } else {
      this.setState(() => ({ error: '' }));
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
            placeholder='solo numeri'
            value={this.props.data.prezzoDiVendita}
            onChange={this.props.changeHandlerValuta}
          />
          {t('Provvigione')} %:
          <input
            name='provvPercentuale'
            className={`text-input`}
            type='text'
            placeholder={`${t('senza')} % ${t('es.')} 7,14`}
            value={this.props.data.provvPercentuale}
            onChange={this.props.changeHandler}
          />
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
  withTranslation()(withForm(ProvisionForm))
);
