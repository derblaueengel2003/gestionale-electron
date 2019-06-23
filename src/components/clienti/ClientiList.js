import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ClientiListItem from './ClientiListItem';
import { startSetCustomers } from '../../actions/clienti';
import selectClienti from '../../selectors/clienti'

export const ClientiList = (props) => (
    <div className="content-container">
    <div className="page-header__actions">
    <Link className="button" to="/customercreate">+</Link>
    </div>
     <div className="list-header">
    
        <div className="show-for-mobile">Cliente</div>
        <div className="show-for-desktop">Cliente</div>
        <div className="show-for-desktop">Ditta</div>
     </div>
       <div className="list-body">
       {
        props.clienti.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessun cliente in base ai filtri inseriti</span>
            </div>
        ) : (
            props.clienti.map((cliente) => {
            return <ClientiListItem key={cliente.id} {...cliente} />
            })
        )
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        clienti: selectClienti(state.clienti, state.filters)
    }
} 
const mapDispatchToProps = (dispatch) => ({
    startSetCustomers: () => dispatch(startSetCustomers())
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientiList)