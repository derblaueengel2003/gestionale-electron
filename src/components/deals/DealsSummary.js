import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import selectDeals from '../../selectors/deals'
import selectDealsTotal from '../../selectors/deals-total'
import selectDealsPayed from '../../selectors/deals-payed'

export const DealsSummary = ({ dealCount, dealsTotal, dealsPayed, uid }) => {
    const dealWord = dealCount === 1 ? 'provvigione' : 'provvigioni'
    const formattedDealsTotal = numeral(dealsTotal / 100).format('0,0[.]00 $')
    const formattedDealsPayed = numeral(dealsPayed / 100).format('0,0[.]00 $')
    const dealsPending = numeral((dealsTotal - dealsPayed) / 100).format('0,0[.]00 $')
    
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Riepilogo: <span>{dealCount}</span> {dealWord} per un totale di <span>{formattedDealsTotal}</span></h1>
                <h1 className="page-header__title">Incassate: <span>{formattedDealsPayed}</span> - Pendenti: <span>{dealsPending}</span></h1>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleDeals = selectDeals(state.deals, state.filters, state.auth)
    return {
        dealCount: visibleDeals.length,
        dealsTotal: selectDealsTotal(visibleDeals, state.auth),
        dealsPayed: selectDealsPayed(visibleDeals, state.auth),
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(DealsSummary)