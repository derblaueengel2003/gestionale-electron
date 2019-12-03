import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className='container'>
      <Link className='btn-floating green right' to='/oggettocreate'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
    <OggettiList />
  </div>
);

export default OggettiDashboardPage;
