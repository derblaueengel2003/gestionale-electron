import React from 'react'
import DealList from './DealList'
import DealListFilters from './DealListFilters'
import DealsSummary from './DealsSummary';

const DealDashboardPage = () => (
    <div>
        <DealsSummary />
        <DealListFilters />
        <DealList />
    </div>
)

export default DealDashboardPage