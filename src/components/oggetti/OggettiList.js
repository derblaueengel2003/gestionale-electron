import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import OggettiListItem from './OggettiListItem';

export const OggettiList = (props) => (
    
    <div className="content-container">
    <div className="page-header__actions">
    <Link className="button" to="/oggettocreate">Aggiungi Oggetto</Link>
    </div>
     <div className="list-header">
    
        <div className="show-for-mobile">Oggetto</div>
        <div className="show-for-desktop">Oggetto</div>
        <div className="show-for-desktop">Rif. Id</div>
     </div>
       <div className="list-body">
       {
        props.oggetti.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessun oggetto in base ai filtri inseriti</span>
            </div>
        ) : (
            props.oggetti.map((oggetto) => {
            return <OggettiListItem key={oggetto.id} {...oggetto} />
            })
        )
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        oggetti: state.oggetti
    }
} 

export default connect(mapStateToProps)(OggettiList)