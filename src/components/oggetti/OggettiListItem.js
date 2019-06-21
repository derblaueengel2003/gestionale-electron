import React from 'react'
import { Link } from 'react-router-dom'

const OggettiListItem = ({ via, numeroCivico, cap, citta, rifId, id, numeroAppartamento, nazione }) => (
        <Link className="list-item" to={`/oggettoview/${id}`}>
            <div>
                <h3 className="list-item__title">{`${via} ${numeroCivico}, WE ${numeroAppartamento}`}</h3>
                <span className="list-item__sub-title">{`${cap} ${citta}, ${nazione}`}</span>
            </div>
            <div>
            <h3 className="list-item__title">{rifId} </h3>
            </div>
        </Link>
)

export default OggettiListItem