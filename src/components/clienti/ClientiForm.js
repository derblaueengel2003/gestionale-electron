import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { Link } from 'react-router-dom';

export class CustomerForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    const { clienti } = this.props.data;

    if (!clienti.cognome) {
      this.props.renderError(this.props.t('Vorname und Name bitte eingeben.'));
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
    } = this.props;
    const consulenteVenditaOptions = this.props.utenti.map((consulente) => ({
      value: consulente.id,
      label: consulente.name,
    }));

    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {this.props.data.error ===
          'Cliente forse già presente nel gestionale' && (
          <div>
            <Link to={`/customer`} target='_blank' className='btn'>
              {t('Verificare')}
            </Link>
          </div>
        )}
        {renderSingleDate(
          'clienti',
          'dataRegistrazione',
          'calendarDataRegistrazioneFocused',
          t('Data registrazione dati del cliente')
        )}
        {renderSelect(
          'clienti',
          'consulenteVenditaId',
          consulenteVenditaOptions,
          t('Consulente vendita')
        )}
        {renderSelect(
          'clienti',
          'titolo',
          [
            { value: 'Herr', label: 'Herr' },
            { value: 'Frau', label: 'Frau' },
          ],
          t('Titolo')
        )}
        {renderInput('clienti', 'nome', t('Nome'))}
        {/* Quando uso la validazione per vedere se il cliente è già presente
        devo passare, oltre all'handler per la validazione, anche i clienti come argomento */}
        {renderInput(
          'clienti',
          'cognome',
          t('Cognome'),
          'text',
          changeHandlerValidate,
          clienti
        )}
        {renderInput(
          'clienti',
          'email',
          t('Email'),
          'text',
          changeHandlerValidate,
          clienti
        )}
        {renderInput('clienti', 'telefono1', t('Telefono fisso'))}
        {renderInput('clienti', 'fax', 'Fax')}
        {renderInput('clienti', 'cellulare', t('Cellulare'))}
        {renderInput('clienti', 'www', t('Sito web'))}
        {renderSingleDate(
          'clienti',
          'dataDiNascita',
          'calendarFocused',
          t('Data di nascita')
        )}
        {renderInput('clienti', 'codiceFiscale', t('Codice fiscale tedesco'))}
        {renderInput('clienti', 'ditta', t('Ditta'))}
        {renderInput(
          'clienti',
          'handelsRegisterNummer',
          t('Numero iscrizione registro delle imprese')
        )}
        {renderInput('clienti', 'indirizzo', t('Indirizzo'))}
        {renderInput('clienti', 'indirizzo2', t('Estensione indirizzo'))}
        {renderInput('clienti', 'cap', t('CAP'))}
        {renderInput('clienti', 'comune', t('Città'))}
        {renderInput('clienti', 'nazione', t('Nazione'))}
        {renderInput('clienti', 'lingua', t('Lingua'))}
        {renderInput('clienti', 'bank', t('Banca'))}
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
          ? renderCheckbox('clienti', 'visible', t('Visibile'))
          : ''}

        {renderCheckbox(
          'clienti',
          'consensoDSGVO',
          t('Consenso al trattamento dei dati personali')
        )}
        {renderSingleDate(
          'clienti',
          'dataConsensoDSGVO',
          'calendarDataConsensoDSGVOFocused',
          t('Data consenso')
        )}
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
      </form>
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
