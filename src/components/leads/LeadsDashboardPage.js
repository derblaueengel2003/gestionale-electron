import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LeadsList from './LeadsList';
import LeadsListFilters from './LeadsListFilters';

const LeadsDashboardPage = ({ t }) => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>{t('Richieste attive')}</h1>
      </div>
    </div>
    <LeadsListFilters />
    <div className='container'>
      <Link className='btn-floating green right' to='/leadscreate'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
    <LeadsList />
  </div>
);

export default withTranslation()(LeadsDashboardPage);
