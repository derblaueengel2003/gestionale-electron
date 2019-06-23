import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FattureListItem from './FattureListItem';

export const FattureList = (props) => (
    
    <div className="content-container">
    <div className="page-header__actions">
    <Link className="button" to="/fatturacreate">+</Link>
    </div>
     <div className="list-header">
    
        <div className="show-for-mobile">Fattura</div>
        <div className="show-for-desktop">Fattura</div>
        <div className="show-for-desktop">Data Fattura</div>
     </div>
       <div className="list-body">
       {
        props.fatture.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessun fattura in base ai filtri inseriti</span>
            </div>
        ) : (
            props.fatture.map((fattura) => {
                const deal = props.deals.find((deal) => deal.id === fattura.dealId)
                const oggetto = props.oggetti.find((ogg) => ogg.id === deal.description)
            return <FattureListItem key={fattura.id} {...fattura} oggetto={oggetto} />
            })
        )
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        fatture: state.fatture,
        deals: state.deals,
        oggetti: state.oggetti
    }
} 

export default connect(mapStateToProps)(FattureList)