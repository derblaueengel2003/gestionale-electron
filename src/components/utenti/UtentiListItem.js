import React from 'react';
import { Link } from 'react-router-dom';

const UtentiListItem = ({ name, role, email, telefon, qualifica, id }) => (
  <Link className='list-item' to={`/useredit/${id}`}>
    <div>
      <h3 className='list-item__title'>{name}</h3>
      <div className='list-item__sub-title'>{email}</div>
      <div className='list-item__sub-title'>{telefon}</div>
      <div className='list-item__sub-title'>{qualifica}</div>
    </div>
    <div>
      <h3 className='list-item__title'>{role} </h3>
    </div>
  </Link>
);

export default UtentiListItem;
