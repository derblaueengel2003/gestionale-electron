import React from 'react';
import FattureList from './FattureList';
import FattureListFilters from './FattureListFilters';

const FattureDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Rechnungen</h1>
      </div>
    </div>
    <FattureListFilters />
    <FattureList />
  </div>
);

export default FattureDashboardPage;
