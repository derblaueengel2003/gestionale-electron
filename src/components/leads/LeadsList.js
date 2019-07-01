import React from 'react'
import { connect } from 'react-redux'
import LeadsListItem from './LeadsListItem';
import selectLeads from '../../selectors/leads'
import { Link } from 'react-router-dom'

export const LeadsList = (props) => (
    <div className="content-container">
        <Link className="button" to="/leadscreate">+</Link>
     <div className="list-header">
        <div className="show-for-mobile">Richiesta</div>
        <div className="show-for-desktop">Richiesta</div>
     </div>
       <div className="list-body">
       {
        props.leads.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessuna richiesta in base ai filtri inseriti</span>
            </div>
        ) : (
            props.leads.map((lead) => {
                return <LeadsListItem key={lead.id} {...lead}/>
            })
        )
       
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        leads: selectLeads(state.leads, state.filters)
    }
} 

export default connect(mapStateToProps)(LeadsList)