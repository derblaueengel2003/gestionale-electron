import React from 'react'
import { connect } from 'react-redux'
import DealListItem from './DealListItem';
import selectDeals from '../../selectors/deals'
import { Link } from 'react-router-dom'

export const DealList = (props) => (
    <div className="content-container">
    <Link className="button" to="/create">+</Link>
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
                const oggetto = props.oggetti.find((ogg) => ogg.id === deal.description)
                const fattura = props.fatture.find((fattura) => fattura.dealId === deal.id)
                return <DealListItem key={deal.id} {...deal} oggetto={oggetto} fattura={fattura} uid={props.uid} />
            })
        )
       
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        deals: selectDeals(state.deals, state.filters, state.auth),
        oggetti: state.oggetti,
        fatture: state.fatture,
        uid: state.auth.uid
    }
} 

export default connect(mapStateToProps)(DealList)