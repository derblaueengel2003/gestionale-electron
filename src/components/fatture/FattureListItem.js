import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FattureListItem = ({
  oggetto,
  cliente,
  cliente2,
  numeroFattura,
  dataFattura,
  payed,
  id
}) => (
  <div>
    <div className='row'>
      <div className='col s12'>
        <div className='card'>
          <div className='card-content'>
            <div className='row'>
              <div className='col s12 m10'>
                <span className='card-title'>
                  {oggetto
                    ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
                    : ''}
                </span>
                <p>
                  {cliente
                    ? `Kunde: ${cliente.nome} ${cliente.cognome} ${cliente.ditta}`
                    : 'nichts'}{' '}
                  {cliente2
                    ? `- ${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}`
                    : ''}
                </p>

                <p className='list-item__title'>
                  {moment(dataFattura).format('DD MMMM, YYYY')}{' '}
                </p>
              </div>
              <div>
                <Link to={`/fatturaview/${id}`}>
                  <span
                    className={`card-title ${payed && 'list-item--paid'}`}
                  >{`${numeroFattura}`}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FattureListItem;
