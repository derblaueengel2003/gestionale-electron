import React from 'react'
import { Link } from 'react-router-dom'

const ClientiListItem = ({ nome, cognome, ditta, email, telefono1, id }) => (
        <Link className="list-item" to={`/customerview/${id}`}>
            <div>
                <h3 className="list-item__title">{nome} {cognome} </h3>
            <h4 className="list-item__sub-title">{email}</h4>
            <h4 className="list-item__sub-title">{telefono1}</h4>
            </div>
            <div>
            <h3 className="list-item__title">{ditta} </h3>
            </div>
        </Link>
)

export default ClientiListItem