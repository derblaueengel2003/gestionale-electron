import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FirmaListItem from './FirmaListItem';
import Card from '../Card';

export const FirmaList = props => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Firmendaten</h1>
      </div>
    </div>
    <div className='container'>
      <div>
        {props.firma.length < 1 && (
          <div>
            <Link className='btn-floating' to='/firmacreate'>
              <i className='material-icons'>add</i>
            </Link>
          </div>
        )}
      </div>
      <div>
        {props.firma &&
          props.firma.map(firma => {
            return (
              <Card
                key={firma.id}
                titolo={`${firma.name} ${firma.name2 && ` - ${firma.name2}`}`}
                sottotitolo={`${firma.adresse}, ${firma.plz} ${firma.stadt}, ${firma.staat}`}
                titoloDestra={`${firma.email}`}
                visible={true}
                link={`/firmaedit/${firma.id}`}
                linea1={`Telefon: ${firma.telefon} - Fax: ${firma.fax}`}
                linea2={`${firma.website}`}
                linea3={`Steuernr. ${firma.steuerNr} - Ust.-IdNr. ${firma.ustIdNr}`}
                linea3={`${firma.motto}`}
                linea4={`Öffnungszeiten ${firma.open}`}
                linea5={`Kontodetails: Inhaber ${firma.kontoInhaber} - Bank ${firma.bank}`}
                linea6={`Bankverbindung: IBAN ${firma.iban} - BIC ${firma.bic}`}
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

export default connect(mapStateToProps)(FirmaList);
