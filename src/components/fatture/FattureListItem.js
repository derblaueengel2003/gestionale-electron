import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const FattureListItem = ({ oggetto, numeroFattura, dataFattura, id }) => (
        <Link className="list-item" to={`/fatturaview/${id}`}>
            <div>
                <h3 className="list-item__title">{`${numeroFattura}`}</h3>
                <span className="list-item__title">{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</span>
            </div>
            <div>
            <h3 className="list-item__title">{moment(dataFattura).format('DD MMMM, YYYY')} </h3>
            </div>
        </Link>
)

export default FattureListItem