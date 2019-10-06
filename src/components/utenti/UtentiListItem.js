import React from 'react'
import { Link } from 'react-router-dom'

const UtentiListItem = ({ name, role, id }) => (
        <Link className="list-item" to={`/userview/${id}`}>
            <div>
                <h3 className="list-item__title">{name}</h3>
            </div>
            <div>
            <h3 className="list-item__title">{role} </h3>
            </div>
        </Link>
)

export default UtentiListItem