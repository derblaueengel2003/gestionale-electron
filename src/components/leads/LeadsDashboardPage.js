import React from 'react';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';

const LeadsDashboardPage = () => (
  <div>
    <div className='page-header page-header-leads'>
      <div className='content-container'>
        <h1 className='page-header__title'>Aktive Anfrage</h1>
      </div>
    </div>
    <LeadsListFilters />
    <LeadsList />
  </div>
);

export default LeadsDashboardPage;
