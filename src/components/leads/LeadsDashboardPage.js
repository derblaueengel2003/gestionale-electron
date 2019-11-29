import React from 'react';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';

const LeadsDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Aktive Anfrage</h1>
      </div>
    </div>
    <LeadsListFilters />
    <LeadsList />
  </div>
);

export default LeadsDashboardPage;
