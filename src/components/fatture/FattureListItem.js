import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const FattureListItem = ({ oggetto, cliente, cliente2, numeroFattura, dataFattura, payed, id }) => (
    <Link className={`list-item ${payed && 'list-item--paid'}`} to={`/fatturaview/${id}`}>
            <div>
                <h3 className="list-item__title">{`${numeroFattura}`}</h3>
                <span className="list-item__title">{oggetto ? `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}` : ''}</span>
                <h4 className="list-item__sub-title">{cliente ? `Cliente: ${cliente.nome} ${cliente.cognome} ${cliente.ditta}` : 'niente'} {cliente2 ? `- ${cliente2.nome} ${cliente2.cognome} ${cliente2.ditta}` : ''}</h4>
            </div>
            <div>
            <h3 className="list-item__title">{moment(dataFattura).format('DD MMMM, YYYY')} </h3>
            </div>
        </Link>
)

export default FattureListItem