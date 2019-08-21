import React from 'react'
import { connect } from 'react-redux'
import DealListItem from './DealListItem';
import selectDeals from '../../selectors/deals'
import { Link } from 'react-router-dom'

export const DealList = (props) => {
    //controllo se i dati vengono dal clienti page o sono passati via props
    if (props.clienteDeals) {
        return (
            props.clienteDeals.length > 0 &&
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile">Provvigione</div>
                    <div className="show-for-desktop">Provvigione</div>
                    <div className="show-for-desktop">Importo</div>                </div>
                <div className="list-body">
                    {props.clienteDeals.map((deal) => { 
                        const oggetto = props.oggetti.find((ogg) => ogg.id === deal.oggettoId)
                        const acquirente = props.clienti.find((cliente) => cliente.id === deal.acquirenteId)
                        const acquirente2 = props.clienti.find((cliente) => cliente.id === deal.acquirenteId2)
                        const venditore = props.clienti.find((cliente) => cliente.id === deal.venditoreId)
                        const venditore2 = props.clienti.find((cliente) => cliente.id === deal.venditoreId2)
                        return <DealListItem key={deal.id} {...deal} oggetto={oggetto} uid={props.uid} acquirente={acquirente} acquirente2={acquirente2} venditore={venditore} venditore2={venditore2} />

                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="content-container">
                {props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <Link className="button" to="/create">+</Link>}
                <div className="list-header">
                    <div className="show-for-mobile">Provvigione</div>
                    <div className="show-for-desktop">Provvigione</div>
                    <div className="show-for-desktop">Importo</div>
                </div>
                <div className="list-body">
                    {
                        props.deals.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>Nessuna provvigione in base ai filtri inseriti</span>
                            </div>
                        ) : (
                                props.deals.map((deal) => {
                                    const oggetto = props.oggetti.find((ogg) => ogg.id === deal.oggettoId)
                                    const acquirente = props.clienti.find((cliente) => cliente.id === deal.acquirenteId)
                                    const acquirente2 = props.clienti.find((cliente) => cliente.id === deal.acquirenteId2)
                                    const venditore = props.clienti.find((cliente) => cliente.id === deal.venditoreId)
                                    const venditore2 = props.clienti.find((cliente) => cliente.id === deal.venditoreId2)
                                    return <DealListItem key={deal.id} {...deal} oggetto={oggetto} uid={props.uid} acquirente={acquirente} acquirente2={acquirente2} venditore={venditore} venditore2={venditore2} />
                                })
                            )

                    }
                </div>
            </div>
        )
    }
}





const mapStateToProps = (state) => {
    //lo chiami anche da dealsSummary
    return {
        deals: selectDeals(state.deals, state.filters, state.auth, state.oggetti, state.clienti),
        oggetti: state.oggetti,
        clienti: state.clienti,
        uid: state.auth.uid
    }
} 

export default connect(mapStateToProps)(DealList)