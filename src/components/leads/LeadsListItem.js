import React from 'react'
import { Link } from 'react-router-dom'

const LeadsListItem = ({ leadNome, leadCognome, id }) => (
    <Link className={`list-item`} to={`/leadview/${id}`}>
        <div>
            <h3 className="list-item__title">{`Lead: ${leadNome} ${leadCognome}`}</h3>
        </div>
        <div>
            <h3 className="list-item__data">TESTO</h3>
        </div>
    </Link> 
)

export default LeadsListItem