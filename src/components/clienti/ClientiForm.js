import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { Link } from 'react-router-dom';

export class CustomerForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.props.data.clienti.cognome) {
      this.setState(() => ({
        error: 'Vorname und Name bitte eingeben.',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        nome: this.props.data.clienti.nome,
        cognome: this.props.data.clienti.cognome,
        titolo: this.props.data.clienti.titolo,
        dataDiNascita: this.props.data.clienti.dataDiNascita
          ? this.props.data.clienti.dataDiNascita.valueOf()
          : null,
        ditta: this.props.data.clienti.ditta,
        indirizzo: this.props.data.clienti.indirizzo,
        indirizzo2: this.props.data.clienti.indirizzo2,
        cap: this.props.data.clienti.cap,
        comune: this.props.data.clienti.comune,
        nazione: this.props.data.clienti.nazione,
        lingua: this.props.data.clienti.lingua,
        email: this.props.data.clienti.email,
        consulenteVenditaId: this.props.data.clienti.consulenteVenditaId,
        telefono1: this.props.data.clienti.telefono1,
        fax: this.props.data.clienti.fax,
        cellulare: this.props.data.clienti.cellulare,
        codiceFiscale: this.props.data.clienti.codiceFiscale,
        handelsRegisterNummer: this.props.data.clienti.handelsRegisterNummer,
        bank: this.props.data.clienti.bank,
        iban: this.props.data.clienti.iban,
        bic: this.props.data.clienti.bic,
        visible: this.props.data.clienti.visible,
        www: this.props.data.clienti.www,
        note: this.props.data.clienti.note,
        dataRegistrazione: this.props.data.clienti.dataRegistrazione
          ? this.props.data.clienti.dataRegistrazione.valueOf()
          : null,
        dataConsensoDSGVO: this.props.data.clienti.dataConsensoDSGVO
          ? this.props.data.clienti.dataConsensoDSGVO.valueOf()
          : null,
        consensoDSGVO: this.props.data.clienti.consensoDSGVO,
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
        <div>
          <button className='btn-floating blue right'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {this.props.data.error && (
          <div>
            <p className='form__error'>{this.props.data.error}</p>
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
        {renderInput('clienti', 'titolo', t('Titolo'))}
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
        {renderTextArea('clienti', 'note', 'Note')}
        {this.props.utente.role === 'Admin'
          ? renderCheckbox('clienti', 'visible', t('Visibile'))
          : ''}
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
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
