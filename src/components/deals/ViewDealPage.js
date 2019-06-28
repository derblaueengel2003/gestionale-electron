import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

export class ViewDealPage extends React.Component {
    
    render() {
        if (this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2') {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)

            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.amount > 0 && <div>Provvigione: {numeral(this.props.deal.amount / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.consulenteVendita > 0 && <div>Cliente di: {this.props.deal.consulenteVendita}</div>}
                        {this.props.deal.provvM2square > 0 && <div className={`list-item ${this.props.deal.payed && 'list-item--paid'}`}>m2Square: {numeral(this.props.deal.provvM2square / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAt > 0 && <div>Prenotazione pagata il: {moment(this.props.deal.payedAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`list-item ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata a Stefano il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartnerId.length > 0 && <div>Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta && ` - Firma: ${agenziaPartner.ditta}`}</div>}
                        {this.props.deal.provvAgenziaPartner > 0 && <div className={`list-item ${this.props.deal.payedAgenziaPartner && 'list-item--paid'}`}>Provvigione Agenzia Partner: {numeral(this.props.deal.provvAgenziaPartner / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.venditoreId.length > 0 && <div>Venditore: {venditore.nome} {venditore.cognome} {venditore.ditta && ` - Firma: ${venditore.ditta}`}</div>}
                        {this.props.deal.venditoreId2.length > 0 && <div>Secondo Venditore: {venditore2.nome} {venditore2.cognome} {venditore2.ditta && ` - Firma: ${venditore2.ditta}`}</div>}
                        {this.props.deal.acquirenteId.length > 0 && <div>Acquirente: {acquirente.nome} {acquirente.cognome} {acquirente.ditta && ` - Firma: ${acquirente.ditta}`}</div>}
                        {this.props.deal.acquirenteId2.length > 0 && <div>Secondo Acquirente: {acquirente2.nome} {acquirente2.cognome} {acquirente2.ditta && ` - Firma: ${acquirente2.ditta}`}</div>}
                        {this.props.deal.numeroFattura && <div>Numero Fattura: {this.props.deal.numeroFattura}</div>}
                        {this.props.deal.dataFattura && <div>Data fattura: {moment(this.props.deal.dataFattura).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.dataRogito > 0 && <div>Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                        <Link className="button" to={`/edit/${this.props.deal.id}`}>Modifica Provvigione</Link>
                    </div>
                </div>
            )
        } else {
            const acquirente = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId)
            const acquirente2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.acquirenteId2)
            const venditore = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId)
            const venditore2 = this.props.clienti.find((cliente) => cliente.id === this.props.deal.venditoreId2)
            const agenziaPartner = this.props.clienti.find((cliente) => cliente.id === this.props.deal.agenziaPartnerId)
            const oggetto = this.props.oggetti.find((ogg) => ogg.id === this.props.deal.description)
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{`Rif. Id: ${oggetto.rifId} - ${oggetto.via} ${oggetto.numeroCivico}, WE ${oggetto.numeroAppartamento}, ${oggetto.cap} ${oggetto.citta}`}</div>}
                        {this.props.deal.rifId > 0 && <div>Rif. Id: {this.props.deal.rifId}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`list-item ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartnerId.length > 0 && <div>Agenzia Partner: {agenziaPartner.nome} {agenziaPartner.cognome} {agenziaPartner.ditta}</div>}
                        {this.props.deal.venditoreId.length > 0 && <div>Venditore: {venditore.nome} {venditore.cognome}</div>}
                        {this.props.deal.venditoreId2.length > 0 && <div>Secondo Venditore: {venditore2.nome} {venditore2.cognome}</div>}
                        {this.props.deal.acquirenteId.length > 0 && <div>Acquirente: {acquirente.nome} {acquirente.cognome}</div>}
                        {this.props.deal.acquirenteId2.length > 0 && <div>Secondo Acquirente: {acquirente2.nome} {acquirente2.cognome}</div>}
                        {this.props.deal.dataRogito > 0 && <div>Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state, props) => ({
    deal: state.deals.find((deal) => deal.id === props.match.params.id), 
    clienti: state.clienti,
    oggetti: state.oggetti,
    uid: state.auth.uid
})

export default connect(mapStateToProps)(ViewDealPage)