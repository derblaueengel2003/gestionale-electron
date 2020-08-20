import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';

export class CustomerForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    const { clienti } = this.props.data;

    if (!clienti.cognome && !clienti.ditta) {
      this.props.renderError(this.props.t('form_alert_missing_name'));
    } else {
      this.props.renderError('');
      this.props.onSubmit({
        cloudURL: clienti.cloudURL,
        nome: clienti.nome,
        cognome: clienti.cognome,
        titolo: clienti.titolo,
        dataDiNascita: clienti.dataDiNascita
          ? clienti.dataDiNascita.valueOf()
          : null,
        ditta: clienti.ditta,
        indirizzo: clienti.indirizzo,
        indirizzo2: clienti.indirizzo2,
        cap: clienti.cap,
        comune: clienti.comune,
        nazione: clienti.nazione,
        lingua: clienti.lingua,
        email: clienti.email,
        consulenteVenditaId: clienti.consulenteVenditaId,
        telefono1: clienti.telefono1,
        fax: clienti.fax,
        cellulare: clienti.cellulare,
        codiceFiscale: clienti.codiceFiscale,
        handelsRegisterNummer: clienti.handelsRegisterNummer,
        bank: clienti.bank,
        iban: clienti.iban,
        bic: clienti.bic,
        visible: clienti.visible,
        www: clienti.www,
        note: clienti.note,
        dataRegistrazione: clienti.dataRegistrazione
          ? clienti.dataRegistrazione.valueOf()
          : null,
        dataConsensoDSGVO: clienti.dataConsensoDSGVO
          ? clienti.dataConsensoDSGVO.valueOf()
          : null,
        consensoDSGVO: clienti.consensoDSGVO,
      });
    }
  };
  render() {
    const {
      t,
      renderCheckbox,
      renderInput,
      renderSelect,
      renderSingleDate,
      renderTextArea,
      changeHandlerValidate,
      clienti,
      renderModal,
    } = this.props;
    const consulenteVenditaOptions = this.props.utenti.map((consulente) => ({
      value: consulente.id,
      label: consulente.name,
    }));

    return (
      <div>
        {this.props.data.error && (
          <div className='form__error'>
            {t(this.props.data.error)}
            {this.props.data.error === 'customer_already_registered' &&
              renderModal(t('btn_label_verify'))}
          </div>
        )}
        <form className='form' onSubmit={this.onSubmit}>
          <div>
            <button className='btn-floating blue right'>
              <i className='material-icons'>save</i>
            </button>
          </div>

          {renderSingleDate(
            'clienti',
            'dataRegistrazione',
            'calendarDataRegistrazioneFocused',
            t('customer_registration_date')
          )}
          {renderSelect(
            'clienti',
            'consulenteVenditaId',
            consulenteVenditaOptions,
            t('sales_rep_name')
          )}
          {renderSelect(
            'clienti',
            'titolo',
            [
              { value: 'Herr', label: 'Herr' },
              { value: 'Frau', label: 'Frau' },
            ],
            t('customer_title')
          )}
          {renderInput('clienti', 'nome', t('firstname'))}
          {/* Quando uso la validazione per vedere se il cliente è già presente
              devo passare, oltre all'handler per la validazione, anche i clienti come argomento */}
          {renderInput(
            'clienti',
            'cognome',
            t('lastname'),
            'text',
            changeHandlerValidate,
            clienti
          )}
          {renderInput(
            'clienti',
            'email',
            t('email'),
            'text',
            changeHandlerValidate,
            clienti
          )}
          {renderInput('clienti', 'telefono1', t('landline'))}
          {renderInput('clienti', 'fax', t('fax'))}
          {renderInput('clienti', 'cellulare', t('mobile'))}
          {renderInput('clienti', 'www', t('website'))}
          {renderSingleDate(
            'clienti',
            'dataDiNascita',
            'calendarFocused',
            t('birthdate')
          )}
          {renderInput('clienti', 'codiceFiscale', t('taxpayer_number'))}
          {renderInput('clienti', 'ditta', t('company'))}
          {renderInput(
            'clienti',
            'handelsRegisterNummer',
            t('company_register_number')
          )}
          {renderInput('clienti', 'indirizzo', t('address'))}
          {renderInput('clienti', 'indirizzo2', t('address_extention'))}
          {renderInput('clienti', 'cap', t('zipcode'))}
          {renderInput('clienti', 'comune', t('city'))}
          {renderInput('clienti', 'nazione', t('nation'))}
          {renderInput('clienti', 'lingua', t('language'))}
          {renderInput('clienti', 'bank', t('bank'))}
          {renderInput('clienti', 'iban', 'IBAN')}
          {renderInput('clienti', 'bic', 'BIC/SWIFT')}
          {renderInput(
            'clienti',
            'cloudURL',
            'Cloud URL',
            undefined,
            undefined,
            undefined,
            'https://www...'
          )}
          {renderTextArea('clienti', 'note', 'Note')}
          {this.props.utente.role === 'Admin'
            ? renderCheckbox('clienti', 'visible', t('visible'))
            : ''}

          {renderCheckbox('clienti', 'consensoDSGVO', t('gdpr_consent'))}
          {renderSingleDate(
            'clienti',
            'dataConsensoDSGVO',
            'calendarDataConsensoDSGVOFocused',
            t('gdpr_consent_date')
          )}
          {this.props.data.error && (
            <p className='form__error'>{t(this.props.data.error)}</p>
          )}
          <div>
            <button className='btn-floating blue right'>
              <i className='material-icons'>save</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  utenti: state.utenti,
  clienti: state.clienti,
  utente: state.utenti.find(
    (utente) => utente.firebaseAuthId === state.auth.uid
  ),
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(CustomerForm))
);
