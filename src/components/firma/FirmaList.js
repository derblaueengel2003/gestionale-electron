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
            const telefono = `${t('Telefono fisso')}: ${firma.telefon} - Fax: ${
              firma.fax
            }`;
            const partitaIVA = `${t('Codice fiscale tedesco')} ${
              firma.steuerNr
            } - Ust.-IdNr. ${firma.ustIdNr}`;
            const orariApertura = `${t('Orari di apertura')} ${firma.open}`;
            const datiBancari = `${t('Dati conto corrente')}: ${t(
              'Intestatario'
            )} ${firma.kontoInhaber} - ${t('Banca')} ${firma.bank}`;
            const ibanBic = `IBAN ${firma.iban} - BIC ${firma.bic}`;
            return (
              <Card
                key={firma.id}
                titolo={`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`}
                sottotitolo={`${firma.adresse}, ${firma.plz} ${firma.stadt}, ${firma.staat}`}
                titoloDestra={`${firma.email}`}
                visible={true}
                link={`/firmaedit/${firma.id}`}
                corpo={[
                  telefono,
                  firma.website,
                  partitaIVA,
                  firma.motto,
                  orariApertura,
                  datiBancari,
                  ibanBic
                ]}
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
