import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';

export class FirmaForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit({
      name: this.props.data.firma.name,
      name2: this.props.data.firma.name2,
      adresse: this.props.data.firma.adresse,
      plz: this.props.data.firma.plz,
      stadt: this.props.data.firma.stadt,
      staat: this.props.data.firma.staat,
      telefon: this.props.data.firma.telefon,
      fax: this.props.data.firma.fax,
      email: this.props.data.firma.email,
      website: this.props.data.firma.website,
      steuerNr: this.props.data.firma.steuerNr,
      ustIdNr: this.props.data.firma.ustIdNr,
      motto: this.props.data.firma.motto,
      open: this.props.data.firma.open,
      kontoInhaber: this.props.data.firma.kontoInhaber,
      bank: this.props.data.firma.bank,
      iban: this.props.data.firma.iban,
      bic: this.props.data.firma.bic,
    });
  };
  render() {
    const { t, renderInput } = this.props;
    return (
      <form className='form' onSubmit={this.onSubmit}>
        <div className='fixed-action-btn'>
          <button className='btn-floating blue  btn-large'>
            <i className='material-icons'>save</i>
          </button>
        </div>
        {renderInput('firma', 'name', t('Nome'))}
        {renderInput('firma', 'name2', t('Ragione sociale'))}
        {renderInput('firma', 'adresse', t('Indirizzo'))}
        {renderInput('firma', 'plz', t('CAP'))}
        {renderInput('firma', 'stadt', t('Città'))}
        {renderInput('firma', 'staat', t('Nazione'))}
        {renderInput('firma', 'telefon', t('Telefono fisso'))}
        {renderInput('firma', 'fax', 'Fax')}
        {renderInput('firma', 'email', t('Email'))}
        {renderInput('firma', 'website', t('Sito web'))}
        {renderInput('firma', 'steuerNr', t('Codice fiscale tedesco'))}
        {renderInput('firma', 'ustIdNr', 'Ust.-IdNr.')}
        {renderInput('firma', 'motto', 'Motto')}
        {renderInput('firma', 'open', t('Orari di apertura'))}
        {renderInput('firma', 'kontoInhaber', t('Intestatario conto corrente'))}
        {renderInput('firma', 'bank', t('Banca'))}
        {renderInput('firma', 'iban', 'IBAN')}
        {renderInput('firma', 'bic', 'BIC/SWIFT')}
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
