import React from 'react';
import DealList from './DealList';
import DealListFilters from './DealListFilters';
import DealsSummary from './DealsSummary';

const DealDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Deals</h1>
      </div>
    </div>
    <DealListFilters />
    <DealList />
  </div>
);

export default DealDashboardPage;
