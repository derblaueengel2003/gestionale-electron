import React from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

export const addButton = (destinazione) => {
  return (
    <div className='fixed-action-btn'>
      <Link className='btn-floating green btn-large' to={destinazione}>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  );
};

export const folderButton = (
  item,
  iconInPicture,
  folder,
  folderNamePartial
) => {
  return (
    <button
      className={`btn-floating light-blue accent-3 ${
        iconInPicture ? 'icon-in-picture' : 'btn-floating-margin right'
      }`}
      onClick={() => {
        ipcRenderer.send('folder:open', {
          folder,
          folderNamePartial,
        });
      }}
    >
      <i className='material-icons'>folder</i>
    </button>
  );
};

export const contactDetailsButton = (cliente) => {
  return (
    <div>
      {cliente.email && (
        <a
          href={`mailto:${cliente.email}`}
          className='btn-floating blue right btn-floating-margin'
        >
          <i className='material-icons'>email</i>
        </a>
      )}

      {cliente.telefono1 && (
        <a
          href={`tel:${cliente.telefono1}`}
          className='btn-floating light-green accent-3 right btn-floating-margin'
        >
          <i className='material-icons'>phone</i>
        </a>
      )}
      {cliente.cellulare && (
        <a
          href={`tel:${cliente.cellulare}`}
          className='btn-floating light-green accent-3 right btn-floating-margin'
        >
          <i className='material-icons'>phone_iphone</i>
        </a>
      )}
      {cliente.cognome &&
        folderButton(cliente, false, 'Kunden', cliente.cognome)}
    </div>
  );
};

export const editButton = (path) => {
  return (
    <Link className='btn-floating orange right btn-floating-margin' to={path}>
      <i className='material-icons'>edit</i>
    </Link>
  );
};
