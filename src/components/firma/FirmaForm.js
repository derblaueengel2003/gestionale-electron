import React from 'react';
import { withTranslation } from 'react-i18next';
import withForm from '../common/withForm';

export class FirmaForm extends React.Component {
  onSubmit = (e) => {
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
      email: this.props.data.email,
      website: this.props.data.website,
      steuerNr: this.props.data.steuerNr,
      ustIdNr: this.props.data.ustIdNr,
      motto: this.props.data.motto,
      open: this.props.data.open,
      kontoInhaber: this.props.data.kontoInhaber,
      bank: this.props.data.bank,
      iban: this.props.data.iban,
      bic: this.props.data.bic,
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
        {renderInput('fax', 'Fax')}
        {renderInput('email', t('Email'))}
        {renderInput('website', t('Sito web'))}
        {renderInput('steuerNr', t('Codice fiscale tedesco'))}
        {renderInput('ustIdNr', 'Ust.-IdNr.')}
        {renderInput('motto', 'Motto')}
        {renderInput('open', t('Orari di apertura'))}
        {renderInput('kontoInhaber', t('Intestatario conto corrente'))}
        {renderInput('bank', t('Banca'))}
        {renderInput('iban', 'IBAN')}
        {renderInput('bic', 'BIC/SWIFT')}
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
