import React from 'react';
import OggettiList from './OggettiList';
import OggettiListFilters from './OggettiListFilters';

const OggettiDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Objekte</h1>
      </div>
    </div>
    <OggettiListFilters />
    <OggettiList />
  </div>
);

export default OggettiDashboardPage;
