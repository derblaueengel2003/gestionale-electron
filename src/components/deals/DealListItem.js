import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// load a locale
numeral.register('locale', 'it', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function(number) {
    return number === 1 ? 'er' : '°';
  },
  currency: {
    symbol: '€'
  }
});
// switch between locales
numeral.locale('it');
moment.locale('it');

const ProgressBar = props => {
  return (
    <div className='progress-bar'>
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = props => {
  return (
    <div className='filler' style={{ width: `${props.percentage}%` }}></div>
  );
};

//destrutturo i props in singole variabili
const DealListItem = ({
  todo1,
  todo2,
  todo3,
  todo4,
  todo5,
  todo6,
  todo7,
  todo8,
  todo9,
  todo10,
  todo11,
  oggetto,
  provvM2square,
  provvStefano,
  createdAt,
  payedStefano,
  //   payed,
  id,
  uid,
  acquirente,
  acquirente2,
  venditore,
  venditore2,
  dealFatture = []
}) => {
  // conto i todo fatti
  let todoCount = 0;
  todo1 && todoCount++;
  todo2 && todoCount++;
  todo3 && todoCount++;
  todo4 && todoCount++;
  todo5 && todoCount++;
  todo6 && todoCount++;
  todo7 && todoCount++;
  todo8 && todoCount++;
  todo9 && todoCount++;
  todo10 && todoCount++;
  todo11 && todoCount++;

  // Determino quante fatture sono state pagate per mostrare i colori adatti. Da dealFature mi arriva un array
  let payed = 0;
  dealFatture.map(fattura => fattura.payed && payed++);
  if (payed > 0) {
    if (payed === dealFatture.length) {
      payed = 2;
    } else {
      payed = 1;
    }
  }
  return (
    <div>
      <Link className='list-item' to={`/view/${id}`}>
        <div>
          <h3 className='list-item__title'>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</h3>
          <span className='list-item__sub-title'>
            {createdAt
              ? `Prenotazione del ${moment(createdAt).format('DD MMMM, YYYY')}`
              : null}
          </span>
          <h4 className='list-item__sub-title'>
            {acquirente
              ? `Acquirente: ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}`
              : ''}{' '}
            {acquirente2
              ? `- ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`
              : ''}
          </h4>
          <h4 className='list-item__sub-title'>
            {venditore
              ? `Venditore: ${venditore.nome} ${venditore.cognome} ${venditore.ditta}`
              : ''}{' '}
            {venditore2
              ? `- ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`
              : ''}
          </h4>
          {`To-dos completati: ${todoCount} di 11`}
          <ProgressBar percentage={(todoCount * 100) / 11} />
        </div>
        <div>
          {uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1' ? (
            <h3
              className={`list-item__data ${payedStefano && 'list-item--paid'}`}
            >
              {numeral(provvStefano / 100).format('0,0[.]00 $')}
            </h3>
          ) : (
            <h3 className={`list-item__data  list-item--paid${payed}`}>
              {numeral(provvM2square / 100).format('0,0[.]00 $')}
            </h3>
          )}
        </div>
      </Link>
    </div>
  );
};

export default DealListItem;
