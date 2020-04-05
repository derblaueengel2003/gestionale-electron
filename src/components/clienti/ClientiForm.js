import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';
import { Link } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-virtualized-select';
import moment from 'moment';

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
    const { t } = this.props;
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
            <Link to={`customer/`} target='_blank' className='btn'>
              {t('Verificare')}
            </Link>
          </div>
        )}
        {t('Data registrazione dati del cliente')}:
        <SingleDatePicker
          date={
            this.props.data.dataRegistrazione
              ? this.props.data.dataRegistrazione
              : moment()
          }
          onDateChange={e => this.props.onDataChange('dataRegistrazione', e)}
          focused={this.props.data.calendarDataRegistrazioneFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataRegistrazioneFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Consulente vendita')}:
        <Select
          name='consulentevendita'
          value={this.props.data.consulenteVenditaId}
          options={consulenteVenditaOptions}
          onChange={e =>
            this.props.changeHandlerSelect('consulenteVenditaId', e && e.value)
          }
        />
        {t('Titolo')}:
        <input
          name='titolo'
          className={`text-input`}
          type='text'
          autoFocus
          placeholder='Herr, Frau'
          value={this.props.data.titolo}
          onChange={this.props.changeHandler}
        />
        {t('Nome')}:
        <input
          name='nome'
          className={`text-input`}
          type='text'
          value={this.props.data.nome}
          onChange={this.props.changeHandler}
        />
        {t('Cognome')}:
        <input
          name='cognome'
          className={`text-input ${this.props.data.error && 'form__error'}`}
          type='text'
          value={this.props.data.cognome}
          onChange={e =>
            this.props.changeHandlerValidate(this.props.clienti, e)
          }
        />
        {t('Email')}:
        <input
          name='email'
          className={`text-input ${this.props.data.error && 'form__error'}`}
          type='text'
          placeholder='info@esempio.it'
          value={this.props.data.email}
          onChange={e =>
            this.props.changeHandlerValidate(this.props.clienti, e)
          }
        />
        {t('Telefono fisso')}:
        <input
          name='telefono1'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.props.data.telefono1}
          onChange={this.props.changeHandler}
        />
        Fax:
        <input
          name='fax'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.props.data.fax}
          onChange={this.props.changeHandler}
        />
        {t('Cellulare')}:
        <input
          name='cellulare'
          className={`text-input`}
          type='text'
          placeholder='z.B. +49123456789'
          value={this.props.data.cellulare}
          onChange={this.props.changeHandler}
        />
        {t('Sito web')}:
        <input
          name='www'
          className={`text-input`}
          type='text'
          value={this.props.data.www}
          onChange={this.props.changeHandler}
        />
        {t('Data di nascita')}:
        <SingleDatePicker
          date={this.props.data.dataDiNascita}
          onDateChange={e => this.props.onDataChange('dataDiNascita', e)}
          focused={this.props.data.calendarFocused}
          onFocusChange={e => this.props.onFocusChange('calendarFocused', e)}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
        {t('Codice fiscale tedesco')}:
        <input
          name='codiceFiscale'
          className={`text-input`}
          type='text'
          placeholder='wenn Wohnsitz in Deutschland'
          value={this.props.data.codiceFiscale}
          onChange={this.props.changeHandler}
        />
        {t('Ditta')}:
        <input
          name='ditta'
          className={`text-input ${this.props.data.error && 'form__error'}`}
          type='text'
          placeholder='Firma'
          value={this.props.data.ditta}
          onChange={e =>
            this.props.changeHandlerValidate(this.props.clienti, e)
          }
        />
        {t('Numero iscrizione registro delle imprese')}:
        <input
          name='handelsRegisterNummer'
          className={`text-input`}
          type='text'
          placeholder='HRA HRB '
          value={this.props.data.handelsRegisterNummer}
          onChange={this.props.changeHandler}
        />
        {t('Indirizzo')}:
        <input
          name='indirizzo'
          className={`text-input`}
          type='text'
          placeholder='Straße und Nr.'
          value={this.props.data.indirizzo}
          onChange={this.props.changeHandler}
        />
        {t('Estensione indirizzo')}:
        <input
          name='indirizzo2'
          className={`text-input`}
          type='text'
          placeholder='c/o'
          value={this.props.data.indirizzo2}
          onChange={this.props.changeHandler}
        />
        {t('CAP')}:
        <input
          name='cap'
          className={`text-input`}
          type='text'
          placeholder='Postleitzahl'
          value={this.props.data.cap}
          onChange={this.props.changeHandler}
        />
        {t('Città')}:
        <input
          name='comune'
          className={`text-input`}
          type='text'
          placeholder='Stadt'
          value={this.props.data.comune}
          onChange={this.props.changeHandler}
        />
        {t('Nazione')}:
        <input
          name='nazione'
          className={`text-input`}
          type='text'
          placeholder='Staat'
          value={this.props.data.nazione}
          onChange={this.props.changeHandler}
        />
        {t('Lingua')}:
        <input
          name='lingua'
          className={`text-input`}
          type='text'
          placeholder='Sprache'
          value={this.props.data.lingua}
          onChange={this.props.changeHandler}
        />
        {t('Banca')}:
        <input
          name='bank'
          className={`text-input`}
          type='text'
          placeholder='Bankdaten'
          value={this.props.data.bank}
          onChange={this.props.changeHandler}
        />
        IBAN:
        <input
          name='iban'
          className={`text-input`}
          type='text'
          placeholder='IBAN'
          value={this.props.data.iban}
          onChange={this.props.changeHandler}
        />
        BIC/SWIFT:
        <input
          name='bic'
          className={`text-input`}
          type='text'
          placeholder='BIC/SWIFT'
          value={this.props.data.bic}
          onChange={this.props.changeHandler}
        />
        <textarea
          name='note'
          className={`textarea text-input`}
          placeholder='Note'
          value={this.props.data.note}
          onChange={this.props.changeHandler}
        ></textarea>
        {this.props.utente.role === 'Admin' ? (
          <label>
            <input
              type='checkbox'
              name='visible'
              checked={this.props.data.visible}
              onChange={this.props.changeCheckbox}
            />
            <span>{t('Visibile')}</span>
          </label>
        ) : (
          ''
        )}
        {this.props.data.error && (
          <p className='form__error'>{this.props.data.error}</p>
        )}
        <label>
          <input
            type='checkbox'
            name='consensoDSGVO'
            checked={this.props.data.consensoDSGVO}
            onChange={this.props.changeCheckbox}
          />
          <span>{t('Consenso al trattamento dei dati personali')}</span>
        </label>
        {t('Data consenso')}:
        <SingleDatePicker
          date={this.props.data.dataConsensoDSGVO}
          onDateChange={e => this.props.onDataChange('dataConsensoDSGVO', e)}
          focused={this.props.data.calendarDataConsensoDSGVOFocused}
          onFocusChange={e =>
            this.props.onFocusChange('calendarDataConsensoDSGVOFocused', e)
          }
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDate={true}
        />
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
