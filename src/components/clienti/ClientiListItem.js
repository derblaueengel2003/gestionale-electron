import React from 'react'
import { Link } from 'react-router-dom'

const ClientiListItem = ({ name, role, id }) => (
        <Link className="list-item" to={`/customerview/${id}`}>
            <div>
                <h3 className="list-item__title">{name}</h3>
            </div>
            <div>
            <h3 className="list-item__title">{role} </h3>
            </div>
        </Link>
)

export default ClientiListItem