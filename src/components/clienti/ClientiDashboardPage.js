import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className='container'>
      <Link className='btn-floating green right' to='/customercreate'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
    <ClientiList />
  </div>
);

export default ClientiDashboardPage;
