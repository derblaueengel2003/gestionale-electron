import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import UtentiListItem from './UtentiListItem';
import { startSetUsers } from '../actions/utenti';

export const UtentiList = (props) => (
    <div className="content-container">
    <div className="page-header__actions">
    <Link className="button" to="/usercreate">Aggiungi Utente</Link>
    </div>
     <div className="list-header">
    
        <div className="show-for-mobile">Utente</div>
        <div className="show-for-desktop">Utente</div>
        <div className="show-for-desktop">Ruolo</div>
     </div>
       <div className="list-body">
       {
        props.utenti.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessun utente in base ai filtri inseriti</span>
            </div>
        ) : (
            props.utenti.map((utente) => {
            return <UtentiListItem key={utente.id} {...utente} />
            })
        )
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        utenti: state.utenti
    }
} 
const mapDispatchToProps = (dispatch) => ({
    startSetUsers: () => dispatch(startSetUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UtentiList)