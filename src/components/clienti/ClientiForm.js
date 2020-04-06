import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { Link } from 'react-router-dom';

export class CustomerForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    if (!this.props.data.cognome) {
      this.setState(() => ({
        error: 'Vorname und Name bitte eingeben.'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        nome: this.props.data.nome,
        cognome: this.props.data.cognome,
        titolo: this.props.data.titolo,
        dataDiNascita: this.props.data.dataDiNascita
          ? this.props.data.dataDiNascita.valueOf()
          : null,
        ditta: this.props.data.ditta,
        indirizzo: this.props.data.indirizzo,
        indirizzo2: this.props.data.indirizzo2,
        cap: this.props.data.cap,
        comune: this.props.data.comune,
        nazione: this.props.data.nazione,
        lingua: this.props.data.lingua,
        email: this.props.data.email,
        consulenteVenditaId: this.props.data.consulenteVenditaId,
        telefono1: this.props.data.telefono1,
        fax: this.props.data.fax,
        cellulare: this.props.data.cellulare,
        codiceFiscale: this.props.data.codiceFiscale,
        handelsRegisterNummer: this.props.data.handelsRegisterNummer,
        bank: this.props.data.bank,
        iban: this.props.data.iban,
        bic: this.props.data.bic,
        visible: this.props.data.visible,
        www: this.props.data.www,
        note: this.props.data.note,
        dataRegistrazione: this.props.data.dataRegistrazione
          ? this.props.data.dataRegistrazione.valueOf()
          : null,
        dataConsensoDSGVO: this.props.data.dataConsensoDSGVO
          ? this.props.data.dataConsensoDSGVO.valueOf()
          : null,
        consensoDSGVO: this.props.data.consensoDSGVO
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
      clienti
    } = this.props;
    const consulenteVenditaOptions = this.props.utenti.map(consulente => ({
      value: consulente.id,
      label: consulente.name
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
          'dataRegistrazione',
          'calendarDataRegistrazioneFocused',
          t('Data registrazione dati del cliente')
        )}
        {renderSelect(
          'consulenteVenditaId',
          consulenteVenditaOptions,
          t('Consulente vendita')
        )}
        {renderInput('titolo', t('Titolo'))}
        {renderInput('nome', t('Nome'))}
        {/* Quando uso la validazione per vedere se il cliente è già presente
        devo passare, oltre all'handler per la validazione, anche i clienti come argomento */}
        {renderInput(
          'cognome',
          t('Cognome'),
          'text',
          changeHandlerValidate,
          clienti
        )}
        {renderInput(
          'email',
          t('Email'),
          'text',
          changeHandlerValidate,
          clienti
        )}
        {renderInput('telefono1', t('Telefono fisso'))}
        {renderInput('fax', 'Fax')}
        {renderInput('cellulare', t('Cellulare'))}
        {renderInput('www', t('Sito web'))}
        {renderSingleDate(
          'dataDiNascita',
          'calendarFocused',
          t('Data di nascita')
        )}
        {renderInput('codiceFiscale', t('Codice fiscale tedesco'))}
        {renderInput('ditta', t('Ditta'))}
        {renderInput(
          'handelsRegisterNummer',
          t('Numero iscrizione registro delle imprese')
        )}
        {renderInput('indirizzo', t('Indirizzo'))}
        {renderInput('indirizzo2', t('Estensione indirizzo'))}
        {renderInput('cap', t('CAP'))}
        {renderInput('comune', t('Città'))}
        {renderInput('nazione', t('Nazione'))}
        {renderInput('lingua', t('Lingua'))}
        {renderInput('bank', t('Banca'))}
        {renderInput('iban', 'IBAN')}
        {renderInput('bic', 'BIC/SWIFT')}
        {renderTextArea('note', 'Note')}
        {this.props.utente.role === 'Admin'
          ? renderCheckbox('visible', t('Visibile'))
          : ''}
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        {renderCheckbox(
          'consensoDSGVO',
          t('Consenso al trattamento dei dati personali')
        )}
        {renderSingleDate(
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

const mapStateToProps = state => ({
  utenti: state.utenti,
  clienti: state.clienti,
  utente: state.utenti.find(utente => utente.firebaseAuthId === state.auth.uid)
});

export default connect(mapStateToProps)(
  withTranslation()(withForm(CustomerForm))
);
