import React from 'react';
import { Link } from 'react-router-dom';

const UtentiListItem = ({ name, role, email, telefon, qualifica, id }) => (
  <div className='row'>
    <div className='col s12'>
      <div className='card'>
        <div className='card-content'>
          <div className='row'>
            <div className='col s12 m10'>
              <Link to={`/useredit/${id}`}>
                <span className='card-title'>{name}</span>
              </Link>
              <p>{email}</p>
              <p>{telefon}</p>
              <p>{qualifica}</p>
            </div>
            <div>
              <span className='card-title'>{role} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UtentiListItem;
