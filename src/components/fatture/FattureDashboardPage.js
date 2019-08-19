import React from 'react'
import FattureList from './FattureList'
import FattureListFilters from './FattureListFilters';

const FattureDashboardPage = () => (
    <div>
        <FattureListFilters />
        <FattureList />
    </div>
)

export default FattureDashboardPage