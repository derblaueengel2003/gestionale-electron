import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

export class ViewDealPage extends React.Component {
    render() {
        if (this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2') {
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{this.props.deal.description}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.amount > 0 && <div>Provvigione: {numeral(this.props.deal.amount / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.consulenteVendita > 0 && <div>Cliente di: {this.props.deal.consulenteVendita}</div>}
                        {this.props.deal.provvM2square > 0 && <div className={`list-item ${this.props.deal.payed && 'list-item--paid'}`}>m2Square: {numeral(this.props.deal.provvM2square / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAt > 0 && <div>Prenotazione pagata il: {moment(this.props.deal.payedAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`list-item ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata a Stefano il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartner.length > 0 && <div>Agenzia Partner: {this.props.deal.agenziaPartner}</div>}
                        {this.props.deal.provvAgenziaPartner > 0 && <div className={`list-item ${this.props.deal.payedAgenziaPartner && 'list-item--paid'}`}>Provvigione Agenzia Partner: {numeral(this.props.deal.provvAgenziaPartner / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.venditoreNome.length > 0 && <div>Venditore: {this.props.deal.venditoreNome}</div>}
                        {this.props.deal.venditoreNome2.length > 0 && <div>Secondo Venditore: {this.props.deal.venditoreNome2}</div>}
                        {this.props.deal.acquirenteNome.length > 0 && <div>Acquirente: {this.props.deal.acquirenteNome}</div>}
                        {this.props.deal.acquirenteNome2.length > 0 && <div>Secondo Acquirente: {this.props.deal.acquirenteNome2}</div>}
                        {this.props.deal.numeroFattura.length > 0 && <div>Numero Fattura: {this.props.deal.numeroFattura}</div>}
                        {this.props.deal.dataFattura > 0 && <div>Data fattura: {moment(this.props.deal.dataFattura).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.dataRogito > 0 && <div>Data rogito: {moment(this.props.deal.dataRogito).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.note.length > 0 && <div>Note: {this.props.deal.note}</div>}
                        <Link className="button" to={`/edit/${this.props.deal.id}`}>Modifica Provvigione</Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Dettagli Provvigione</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        {this.props.deal.description.length > 0 && <div>{this.props.deal.description}</div>}
                        {this.props.deal.rifId > 0 && <div>Rif. Id: {this.props.deal.rifId}</div>}
                        {this.props.deal.prezzoDiVendita > 0 && <div>Prezzo di Vendita: {numeral(this.props.deal.prezzoDiVendita / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.provvStefano > 0 && <div className={`list-item ${this.props.deal.payedStefano && 'list-item--paid'}`}>Stefano: {numeral(this.props.deal.provvStefano / 100).format('0,0[.]00 $')}</div>}
                        {this.props.deal.payedAtStefano > 0 && <div>Pagata il: {moment(this.props.deal.payedAtStefano).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.createdAt > 0 && <div>Data prenotazione: {moment(this.props.deal.createdAt).format('DD MMMM, YYYY')}</div>}
                        {this.props.deal.agenziaPartner.length > 0 && <div>Agenzia Partner: {this.props.deal.agenziaPartner}</div>}
                        {this.props.deal.venditoreNome.length > 0 && <div>Venditore: {this.props.deal.venditoreNome}</div>}
                        {this.props.deal.venditoreNome2.length > 0 && <div>Secondo Venditore: {this.props.deal.venditoreNome2}</div>}
                        {this.props.deal.acquirenteNome.length > 0 && <div>Acquirente: {this.props.deal.acquirenteNome}</div>}
                        {this.props.deal.acquirenteNome2.length > 0 && <div>Secondo Acquirente: {this.props.deal.acquirenteNome2}</div>}
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
    uid: state.auth.uid
})

export default connect(mapStateToProps)(ViewDealPage)