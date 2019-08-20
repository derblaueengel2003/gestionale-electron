import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { fattura } from '../moduli/Fattura'

export class ViewFatturePage extends React.Component {
    render() {
        let deal = this.props.deals.find((deal) => deal.id === this.props.fattura.dealId)
        !deal ? deal = ({ prezzoDiVendita: 0, dataFattura: null, dataRogito: null, amount: 0, createdAt: null, dealType: '' }) : deal
        const oggetto = deal ? this.props.oggetti.find((ogg) => ogg.id === deal.description) : ''
        const acquirente = deal ? this.props.clienti.find((ilcliente) => ilcliente.id === deal.acquirenteId) : ''
        const acquirente2 = deal ? this.props.clienti.find((ilcliente) => ilcliente.id === deal.acquirenteId2) : ''
        const cliente = this.props.clienti.find((cliente) => cliente.id === this.props.fattura.clienteId)
        const cliente2 = this.props.clienti.find((cliente) => cliente.id === this.props.fattura.clienteId2)
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Fatture</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.fattura.numeroFattura.length > 0 && <div className={`${this.props.fattura.payed && 'list-item--paid'}`} >Fattura Numero: {this.props.fattura.numeroFattura}</div>}
                    {this.props.fattura.dataFattura > 0 && <div>Data Fattura: {moment(this.props.dataFattura).format('DD MMMM, YYYY')}</div>}
                    {deal && deal.dealType}
                    {this.props.fattura.note}
                    <div className="list-item__title">{oggetto && `Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>
                   
                    {cliente && <div>Cliente: {cliente.nome} {cliente.cognome} {cliente.ditta && ` - Firma: ${cliente.ditta}`}</div>}
                    {cliente2 && <div>Secondo Cliente: {cliente2.nome} {cliente2.cognome} {cliente2.ditta && ` - Firma: ${cliente2.ditta}`}</div>}

                    {deal && deal.dataRogito > 0 && <div>Data Rogito: {moment(deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                    
                    <Link className="print button button--secondary" to={`/fatturaedit/${this.props.fattura.id}`}>Modifica Fattura</Link>
                    <button className="print button button--secondary"
                        onClick={() => { fattura(cliente, cliente2, this.props.fattura.numeroFattura, this.props.fattura.dataFattura, this.props.fattura.note, oggetto, deal.prezzoDiVendita, deal.dataRogito, deal.amount, deal.createdAt, deal.dealType, acquirente, acquirente2) }}>
                        Stampa Fattura
                        </button>
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