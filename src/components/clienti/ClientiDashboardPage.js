import React from 'react';
import ClientiList from './ClientiList';
import ClientiListFilters from './ClientiListFilters';

const ClientiDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Adressbuch Kontakte</h1>
      </div>
    </div>
    <ClientiListFilters />
    <ClientiList />
  </div>
);

export default ClientiDashboardPage;
