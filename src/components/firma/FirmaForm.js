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
      fax: this.props.data.faxFirma,
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
    const { t, renderInput } = this.props;
    return (
      <form className='form' onSubmit={this.onSubmit}>
        <div>
          <button className='btn-floating blue right btn-floating-margin'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderInput('name', t('Nome'))}
        {renderInput('name2', t('Ragione sociale'))}
        {renderInput('adresse', t('Indirizzo'))}
        {renderInput('plz', t('CAP'))}
        {renderInput('stadt', t('Città'))}
        {renderInput('staat', t('Nazione'))}
        {renderInput('telefon', t('Telefono fisso'))}
        {renderInput('faxFirma', 'Fax')}
        {renderInput('emailFirma', t('Email'))}
        {renderInput('websiteFirma', t('Sito web'))}
        {renderInput('steuerNrFirma', t('Codice fiscale tedesco'))}
        {renderInput('ustIdNrFirma', 'Ust.-IdNr.')}
        {renderInput('motto', 'Motto')}
        {renderInput('open', t('Orari di apertura'))}
        {renderInput('kontoInhaber', t('Intestatario conto corrente'))}
        {renderInput('bankFirma', t('Banca'))}
        {renderInput('ibanFirma', 'IBAN')}
        {renderInput('bicFirma', 'BIC/SWIFT')}
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
