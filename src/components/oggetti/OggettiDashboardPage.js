import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import OggettiList from './OggettiList';
import OggettiListFilters from './OggettiListFilters';

const OggettiDashboardPage = ({ t }) => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>{t('Oggetti')}</h1>
      </div>
    </div>
    <OggettiListFilters />
    <div className='container'>
      <Link className='btn-floating green right' to='/oggettocreate'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
    <OggettiList />
  </div>
);

export default withTranslation()(OggettiDashboardPage);
