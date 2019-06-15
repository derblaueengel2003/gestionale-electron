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

const ExpenseListItem = ({ description, amount, createdAt, payed, id }) => (
        <Link className={`list-item ${payed && 'list-item--paid'}`} to={`/view/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('DD MMMM, YYYY')}</span>
            </div>
            <div>
            <h3 className="list-item__data">{numeral(amount / 100).format('0,0[.]00 $')}</h3>
            </div>
        </Link>
)

export default ExpenseListItem