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
  <div className={`list-item `}>
    <div>
      <Link to={`/fatturaview/${id}`}>
        <h3
          className={`list-item__title ${payed && 'list-item--paid'}`}
        >{`${numeroFattura}`}</h3>
      </Link>
      <span className='list-item__title'>
        {oggetto
          ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`
          : ''}
      </span>
      <h4 className='list-item__sub-title'>
        {cliente
          ? `Kunde: ${cliente.nome} ${cliente.cognome} ${cliente.ditta}`
          : 'nichts'}{' '}
        {cliente2
          ? `- ${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}`
          : ''}
      </h4>
    </div>
    <div>
      <h3 className='list-item__title'>
        {moment(dataFattura).format('DD MMMM, YYYY')}{' '}
      </h3>
    </div>
  </div>
);

export default FattureListItem;
