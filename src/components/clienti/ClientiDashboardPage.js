import React from 'react';
import ClientiList from './ClientiList';
import ClientiListFilters from './ClientiListFilters';

const ClientiDashboardPage = () => (
  <div>
    {' '}
    <div className='page-header page-header-clienti'>
      <div className='content-container'>
        <h1 className='page-header__title'>Adressbuch Kontakte</h1>
      </div>
    </div>
    <ClientiListFilters />
    <ClientiList />
  </div>
);

export default ClientiDashboardPage;
