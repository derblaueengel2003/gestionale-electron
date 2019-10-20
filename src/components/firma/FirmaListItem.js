import React from 'react';
import { Link } from 'react-router-dom';

const FirmaListItem = ({
  name,
  name2,
  adresse,
  plz,
  stadt,
  staat,
  telefon,
  fax,
  email,
  website,
  steuerNr,
  ustIdNr,
  motto,
  open,
  id
}) => (
  <Link className='list-item' to={`/firmaedit/${id}`}>
    <div>
      <h3 className='list-item__title'>
        {name} {name2 && ` - ${name2}`}
      </h3>
      <div className='list-item__sub-title'> {adresse}</div>
      <div className='list-item__sub-title'>
        {' '}
        {plz} {stadt}, {staat}
      </div>
      <div className='list-item__sub-title'> {telefon}</div>
      <div className='list-item__sub-title'> {fax}</div>
      <div className='list-item__sub-title'> {website}</div>
      <div className='list-item__sub-title'>Steuernummer {steuerNr}</div>
      <div className='list-item__sub-title'>Ust.-IdNr. {ustIdNr}</div>
      <div className='list-item__sub-title'> {motto}</div>
      <div className='list-item__sub-title'>Öffnungszeiten {open}</div>
    </div>
    <div>
      <h3 className='list-item__title'>{email} </h3>
    </div>
  </Link>
);

export default FirmaListItem;
