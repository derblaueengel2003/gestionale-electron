import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

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
  oggetto = {
    rifId: 'n/a',
    via: 'n/a',
    numeroCivico: 'n/a',
    numeroAppartamento: 'n/a',
    cap: 'n/a',
    citta: 'n/a'
  },
  provvM2square,
  provvStefano,
  createdAt,
  payedStefano,
  //   payed,
  id,
  utente,
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
    <div className='row'>
      <div className='col s12'>
        <div className='card'>
          <div className='card-content'>
            <div className='row'>
              <div className='col s12 m10'>
                <Link to={`/view/${id}`}>
                  {' '}
                  <span className='card-title'>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</span>
                </Link>
                <h6>
                  {createdAt
                    ? `Reservierung vom ${moment(createdAt).format(
                        'DD MMMM, YYYY'
                      )}`
                    : null}
                </h6>
                <h6>
                  {acquirente
                    ? `Käufer: ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}`
                    : ''}{' '}
                  {acquirente2
                    ? `- ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}`
                    : ''}
                </h6>
                <h6>
                  {venditore
                    ? `Verkäufer: ${venditore.nome} ${venditore.cognome} ${venditore.ditta}`
                    : ''}{' '}
                  {venditore2
                    ? `- ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}`
                    : ''}
                </h6>
                <blockquote>
                  {`Erledigte To-dos: ${todoCount} von 11`}
                  <ProgressBar percentage={(todoCount * 100) / 11} />
                </blockquote>
              </div>
              <div>
                {utente.role === 'Mitarbeiter' ? (
                  <span
                    className={` card-title list-item__data ${payedStefano &&
                      'list-item--paid'}`}
                  >
                    {numeral(provvStefano / 100).format('0,0[.]00 $')}
                  </span>
                ) : (
                  <span
                    className={` card-title list-item__data  list-item--paid${payed}`}
                  >
                    {numeral(provvM2square / 100).format('0,0[.]00 $')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealListItem;
