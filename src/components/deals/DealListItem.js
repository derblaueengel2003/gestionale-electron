import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

// load a locale
numeral.register('locale', 'it', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : '°';
    },
    currency: {
        symbol: '€'
    }
});
// switch between locales
numeral.locale('it');
moment.locale('it')

const DealListItem = ({ oggetto, provvM2square, provvStefano, createdAt, payedStefano, payed, id, uid, acquirente, acquirente2, venditore, venditore2 }) => {
    if (uid === 'pCu3H2GQfPWQxMNGwIVTc0Ag0fg1') {
        return (
            <Link className={`list-item ${payedStefano && 'list-item--paid'}`} to={`/view/${id}`}>
                <div>
                    <h3 className="list-item__title">{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</h3>
                    <span className="list-item__sub-title">{createdAt ? `Prenotazione del ${moment(createdAt).format('DD MMMM, YYYY')}` : null}</span>
                    <h4 className="list-item__sub-title">{acquirente ? `Acquirente: ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}` : ''} {acquirente2 ? `- ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}` : ''}</h4>
                    <h4 className="list-item__sub-title">{venditore ? `Venditore: ${venditore.nome} ${venditore.cognome} ${venditore.ditta}` : ''} {venditore2 ? `- ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}` : ''}</h4>
                </div>
                <div>
                <h3 className="list-item__data">{numeral(provvStefano / 100).format('0,0[.]00 $')}</h3>
                </div>
            </Link>
        )
    } else {
        return (
            <Link className={`list-item ${payed && 'list-item--paid'}`} to={`/view/${id}`}>
                <div>
                    <h3 className="list-item__title">{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</h3>
                    <span className="list-item__sub-title">{createdAt ? `Prenotazione del ${moment(createdAt).format('DD MMMM, YYYY')}` : null}</span>
                    <h4 className="list-item__sub-title">{acquirente ? `Acquirente: ${acquirente.nome} ${acquirente.cognome} ${acquirente.ditta}` : ''} {acquirente2 ? `- ${acquirente2.nome} ${acquirente2.cognome} ${acquirente2.ditta}` : ''}</h4>
                    <h4 className="list-item__sub-title">{venditore ? `Venditore: ${venditore.nome} ${venditore.cognome} ${venditore.ditta}` : ''} {venditore2 ? `- ${venditore2.nome} ${venditore2.cognome} ${venditore2.ditta}` : ''}</h4>
                </div>
                <div>
                <h3 className="list-item__data">{numeral(provvM2square / 100).format('0,0[.]00 $')}</h3>
                </div>
            </Link>
        )
    }
}

export default DealListItem