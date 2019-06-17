import React from 'react'
import { connect } from 'react-redux'
import DealListItem from './DealListItem';
import selectDeals from '../../selectors/deals'

export const DealList = (props) => (
    <div className="content-container">
     <div className="list-header">
        <div className="show-for-mobile">Provvigione</div>
        <div className="show-for-desktop">Provvigione</div>
        <div className="show-for-desktop">Importo</div>
     </div>
       <div className="list-body">
       {
        props.deals.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessuna provvigione in base ai filtri inseriti</span>
            </div>
        ) : (
            
            props.deals.map((deal) => {
            return <DealListItem key={deal.id} {...deal } uid={props.uid} />
            })
        )
       
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        deals: selectDeals(state.deals, state.filters, state.auth),
        uid: state.auth.uid
    }
} 

export default connect(mapStateToProps)(DealList)