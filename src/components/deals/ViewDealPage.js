import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

export class ViewDealPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Dettagli Provvigione</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/">Torna al Riepilogo</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.deal.description.length > 0 && <div>Descrizione: {this.props.deal.description}</div>}
                    {this.props.deal.amount > 0 && <div>Importo: {numeral(this.props.deal.amount / 100).format('0,0[.]00 $')}</div>}
                    {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                    {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                    <Link className="button" to={`/edit/${this.props.deal.id}`}>Modifica Provvigione</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewDealPage)