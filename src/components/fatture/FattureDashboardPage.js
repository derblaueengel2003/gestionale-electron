import React from 'react';
import FattureList from './FattureList';
import FattureListFilters from './FattureListFilters';
import { Link } from 'react-router-dom';

const FattureDashboardPage = () => (
  <div>
    <div className='grey lighten-4'>
      <div className='container'>
        <h1>Rechnungen</h1>
      </div>
    </div>
    <FattureListFilters />
    <div className='container'>
      <Link className='btn-floating green right' to='/fatturacreate'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
    <FattureList />
  </div>
);

export default FattureDashboardPage;
