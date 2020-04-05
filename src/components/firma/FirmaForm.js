import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';

export class FirmaForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({
      name: this.props.data.name,
      name2: this.props.data.name2,
      adresse: this.props.data.adresse,
      plz: this.props.data.plz,
      stadt: this.props.data.stadt,
      staat: this.props.data.staat,
      telefon: this.props.data.telefon,
      fax: this.props.data.fax,
      email: this.props.data.emailFirma,
      website: this.props.data.websiteFirma,
      steuerNr: this.props.data.steuerNrFirma,
      ustIdNr: this.props.data.ustIdNrFirma,
      motto: this.props.data.motto,
      open: this.props.data.open,
      kontoInhaber: this.props.data.kontoInhaber,
      bank: this.props.data.bankFirma,
      iban: this.props.data.ibanFirma,
      bic: this.props.data.bicFirma
    });
  };
  render() {
    const { t } = this.props;
    return (
      <form className='form' onSubmit={this.onSubmit}>
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {t('Nome')}:
        <input
          name='name'
          className={`text-input`}
          type='text'
          autoFocus
          value={this.props.data.name}
          onChange={this.props.changeHandler}
        />
        {t('Ragione sociale')}:
        <input
          name='name2'
          className={`text-input`}
          type='text'
          autoFocus
          value={this.props.data.name2}
          onChange={this.props.changeHandler}
        />
        {t('Indirizzo')}:
        <input
          name='adresse'
          className={`text-input`}
          type='text'
          value={this.props.data.adresse}
          onChange={this.props.changeHandler}
        />
        {t('CAP')}:
        <input
          name='plz'
          className={`text-input`}
          type='text'
          value={this.props.data.plz}
          onChange={this.props.changeHandler}
        />
        {t('Città')}:
        <input
          name='stadt'
          className={`text-input`}
          type='text'
          value={this.props.data.stadt}
          onChange={this.props.changeHandler}
        />
        {t('Nazione')}:
        <input
          name='staat'
          className={`text-input`}
          type='text'
          value={this.props.data.staat}
          onChange={this.props.changeHandler}
        />
        {t('Telefono fisso')}:
        <input
          name='telefon'
          className={`text-input`}
          type='text'
          value={this.props.data.telefon}
          onChange={this.props.changeHandler}
        />
        Fax:
        <input
          name='fax'
          className={`text-input`}
          type='text'
          value={this.props.data.fax}
          onChange={this.props.changeHandler}
        />
        {t('Email')}:
        <input
          name='emailFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.emailFirma}
          onChange={this.props.changeHandler}
        />
        {t('Sito web')}:
        <input
          name='websiteFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.websiteFirma}
          onChange={this.props.changeHandler}
        />
        {t('Codice fiscale tedesco')}:
        <input
          name='steuerNrFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.steuerNrFirma}
          onChange={this.props.changeHandler}
        />
        Ust.-IdNr.:
        <input
          name='ustIdNrFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.ustIdNrFirma}
          onChange={this.props.changeHandler}
        />
        Motto:
        <input
          name='motto'
          className={`text-input`}
          type='text'
          value={this.props.data.motto}
          onChange={this.props.changeHandler}
        />
        {t('Orari di apertura')}:
        <input
          name='open'
          className={`text-input`}
          type='text'
          value={this.props.data.open}
          onChange={this.props.changeHandler}
        />
        {t('Intestatario conto corrente')}:
        <input
          name='kontoInhaber'
          className={`text-input`}
          type='text'
          value={this.props.data.kontoInhaber}
          onChange={this.props.changeHandler}
        />
        {t('Banca')}:
        <input
          name='bankFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.bankFirma}
          onChange={this.props.changeHandler}
        />
        IBAN:
        <input
          name='ibanFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.ibanFirma}
          onChange={this.props.changeHandler}
        />
        BIC/SWIFT:
        <input
          name='bicFirma'
          className={`text-input`}
          type='text'
          value={this.props.data.bicFirma}
          onChange={this.props.changeHandler}
        />
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
      </form>
    );
  }
}

export default withTranslation()(withForm(FirmaForm));
