import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import Card from '../Card';

export const FirmaList = ({ t, firma }) => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>{t('Dati aziendali')}</h1>
      </div>
    </div>
    <div className='container'>
      <div>
        {firma.length < 1 && (
          <div>
            <Link className='btn-floating' to='/firmacreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        )}
      </div>
      <div>
        {firma &&
          firma.map(firma => {
            return (
              <Card
                key={firma.id}
                titolo={`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`}
                sottotitolo={`${firma.adresse}, ${firma.plz} ${firma.stadt}, ${firma.staat}`}
                titoloDestra={`${firma.email}`}
                visible={true}
                link={`/firmaedit/${firma.id}`}
                linea1={`${t('Telefono fisso')}: ${firma.telefon} - Fax: ${
                  firma.fax
                }`}
                linea2={`${firma.website}`}
                linea3={`${t('Codice fiscale tedesco')} ${
                  firma.steuerNr
                } - Ust.-IdNr. ${firma.ustIdNr}`}
                linea3={`${firma.motto}`}
                linea4={`${t('Orari di apertura')} ${firma.open}`}
                linea5={`${t('Dati conto corrente')}: ${t('Intestatario')} ${
                  firma.kontoInhaber
                } - ${t('Banca')} ${firma.bank}`}
                linea6={`IBAN ${firma.iban} - BIC ${firma.bic}`}
              />
            );
          })}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    firma: state.firma
  };
};

export default connect(mapStateToProps)(withTranslation()(FirmaList));
