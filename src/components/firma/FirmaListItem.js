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
  kontoInhaber,
  bank,
  iban,
  bic,
  id
}) => (
  <div className='row'>
    <div className='col s12'>
      <div className='card'>
        <div className='card-content'>
          <div className='row'>
            <div className='col s12 m10'>
              <Link to={`/firmaedit/${id}`}>
                <span className='card-title'>
                  {name} {name2 && ` - ${name2}`}
                </span>
              </Link>
              <p> {adresse}</p>
              <p>
                {' '}
                {plz} {stadt}, {staat}
              </p>
              <p> {telefon}</p>
              <p> {fax}</p>
              <p> {website}</p>
              <p>Steuernummer {steuerNr}</p>
              <p>Ust.-IdNr. {ustIdNr}</p>
              <p> {motto}</p>
              <p>Öffnungszeiten {open}</p>
              <p>Kontoinhaber {kontoInhaber}</p>
              <p>Bank {bank}</p>
              <p>IBAN {iban}</p>
              <p>BIC/SWIFT {bic}</p>

              <div>
                <span className='card-title'>{email} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FirmaListItem;
