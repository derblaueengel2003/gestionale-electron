import React from 'react';
import { Link } from 'react-router-dom';

const UtentiListItem = ({
  name,
  adresse,
  plz,
  stadt,
  staat,
  telefon,
  fax,
  email,
  website,
  motto,
  id
}) => (
  <Link className='list-item' to={`/firmaedit/${id}`}>
    <div>
      <h3 className='list-item__title'>{name}</h3>
      <div className='list-item__sub-title'> {adresse}</div>
      <div className='list-item__sub-title'>
        {' '}
        {plz} {stadt}, {staat}
      </div>
      <div className='list-item__sub-title'> {telefon}</div>
      <div className='list-item__sub-title'> {fax}</div>
      <div className='list-item__sub-title'> {website}</div>
      <div className='list-item__sub-title'> {motto}</div>
    </div>
    <div>
      <h3 className='list-item__title'>{email} </h3>
    </div>
  </Link>
);

export default UtentiListItem;
