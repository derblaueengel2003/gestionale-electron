import React from 'react'
import LeadsList from './LeadsList'
import LeadsListFilters from './LeadsListFilters'


const LeadsDashboardPage = () => (
    <div>
        <LeadsListFilters />
        <LeadsList />
    </div>
)

export default LeadsDashboardPage