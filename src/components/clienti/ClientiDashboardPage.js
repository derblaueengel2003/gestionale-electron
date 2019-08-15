import React from 'react'
import ClientiList from './ClientiList'
import ClientiListFilters from './ClientiListFilters'


const ClientiDashboardPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Rubrica Contatti</h1>
            </div>
        </div>
        <ClientiListFilters />
        <ClientiList />
    </div>
)

export default ClientiDashboardPage