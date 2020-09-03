import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';
import M from 'materialize-css';

export class LeadForm extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { leads } = this.props.data;
    const leadBudget = parseFloat(leads.leadBudget, 10) * 100;

    if (!leads.leadId || leads.leadBudget < 1) {
      this.props.renderError(this.props.t('Inserisci il budget'));
    } else {
      this.props.renderError('');
      this.props.onSubmit({
        leadCreatedAt: leads.leadCreatedAt
          ? leads.leadCreatedAt.valueOf()
          : null,
        leadId: leads.leadId,
        leadBudget,
        leadCity: leads.leadCity,
        leadOggettoStato: leads.leadOggettoStato,
        leadNote: leads.leadNote,
      });
    }
  };
  render() {
    const {
      t,
      renderSelect,
      renderInput,
      renderSingleDate,
      renderTextArea,
      changeHandlerValuta,
    } = this.props;
    const options = this.props.clienti.map((cliente) => ({
      value: cliente.id,
      label: `${cliente.nome} ${cliente.cognome} ${
        cliente.ditta && `- Firma ${cliente.ditta}`
      }`,
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div className='fixed-action-btn'>
          <button className='btn-floating blue btn-large'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderSingleDate(
          'leads',
          'leadCreatedAt',
          'calendarFocused',
          t('Data richiesta')
        )}
        {renderSelect('leads', 'leadId', options, t('Cliente'), '*')}
        {renderInput(
          'leads',
          'leadBudget',
          'Budget',
          'text',
          changeHandlerValuta,
          undefined,
          undefined,
          '*'
        )}
        {renderSelect(
          'leads',
          'leadOggettoStato',
          [
            { value: 'libero', label: t('Appartamento libero') },
            { value: 'affittato', label: t('Appartamento affittato') },
            {
              value: 'libero o affittato',
              label: t('Appartamento libero o affittato'),
            },
            { value: 'commerciale', label: t('Locale commerciale') },
            { value: 'aph', label: t('Casa di cura') },
            { value: '', label: t('Indifferente') },
          ],
          t('Tipologia immobile e stato')
        )}
        {renderSelect(
          'leads',
          'leadCity',
          [
            { value: 'Berlin', label: 'Berlin' },
            { value: 'Leipzig', label: 'Leipzig' },
          ],
          t('city')
        )}
        {renderTextArea('leads', 'leadNote')}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  utenti: state.utenti,
  clienti: state.clienti,
});

export default connect(mapStateToProps)(withTranslation()(withForm(LeadForm)));
