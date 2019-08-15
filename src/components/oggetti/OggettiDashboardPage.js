import React from 'react'
import OggettiList from './OggettiList'
import OggettiListFilters from './OggettiListFilters'

const OggettiDashboardPage = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Oggetti</h1>
            </div>
        </div>
        <OggettiListFilters />
        <OggettiList />
    </div>
)

export default OggettiDashboardPage