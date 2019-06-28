import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

export class ViewFatturePage extends React.Component {
    render() {
        const deal = this.props.deals.find((deal) => deal.id === this.props.fattura.dealId)
        const oggetto = this.props.oggetti.find((ogg) => ogg.id === deal.description)
        console.log(deal)
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Fatture</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.fattura.numeroFattura.length > 0 && <div>Fattura Numero: {this.props.fattura.numeroFattura}</div>}
                    {this.props.fattura.dataFattura > 0 && <div>Data Fattura: {moment(this.props.dataFattura).format('DD MMMM, YYYY')}</div>}
                    <div className="list-item__title">{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>

                    {deal.dataRogito > 0 && <div>Data Rogito: {moment(deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                    <Link className="button" to={`/fatturaedit/${this.props.fattura.id}`}>Modifica Fattura</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    fattura: state.fatture.find((fattura) => fattura.id === props.match.params.id),
    clienti: state.clienti,
    deals: state.deals,
    oggetti: state.oggetti 
})

export default connect(mapStateToProps)(ViewFatturePage)