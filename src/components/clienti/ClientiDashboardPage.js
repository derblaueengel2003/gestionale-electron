import React from 'react'
import ClientiList from './ClientiList'
import ClientiListFilters from './ClientiListFilters'


const ClientiDashboardPage = () => (
    <div>
        <ClientiListFilters />
        <ClientiList />
    </div>
)

export default ClientiDashboardPage