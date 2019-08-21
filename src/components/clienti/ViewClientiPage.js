import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import LeadsList from '../leads/LeadsList'
import FattureList from '../fatture/FattureList'
import DealList from '../deals/DealList';

export class ViewClientiPage extends React.Component {
    render() {
        const dealFatture = this.props.fatture.filter((fattura) => fattura.clienteId === this.props.cliente.id || fattura.clienteId2 === this.props.cliente.id)
        const clienteDeals = this.props.deals.filter((deal) => deal.acquirenteId === this.props.cliente.id || deal.acquirenteId2 === this.props.cliente.id || deal.venditoreId === this.props.cliente.id || deal.venditoreId2 === this.props.cliente.id || deal.agenziaPartnerId === this.props.cliente.id)
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Cliente</h1>
                    </div>
                </div>
                <div className="content-container">
                    <div className="list-header">
                        <div className="show-for-mobile">Scheda cliente</div>
                        <div className="show-for-desktop">Scheda cliente</div>
                        <div className="show-for-desktop"></div>
                    </div>
                    <div className="list-body">
                        <div className="list-item">
                        <div>
                            {this.props.cliente.ditta.length > 0 && <h3>{this.props.cliente.ditta}</h3>}
                            {this.props.cliente.nome.length > 0 && <h3>{this.props.cliente.titolo} {this.props.cliente.nome} {this.props.cliente.cognome}</h3>}
                            {this.props.cliente.indirizzo.length > 0 && <div>{`${this.props.cliente.indirizzo} ${this.props.cliente.indirizzo2 && this.props.cliente.indirizzo2}, ${this.props.cliente.cap} ${this.props.cliente.comune}, ${this.props.cliente.nazione}`}</div>}
                        </div>
                        <div>
                            {this.props.cliente.telefono1.length > 0 && <div>Tel: {this.props.cliente.telefono1}</div>}
                            {this.props.cliente.email.length > 0 && <div>E-Mail: {this.props.cliente.email}</div>}
                        </div>
                    </div>
                    </div>   
                    <Link className="print button button--secondary" to={`/customeredit/${this.props.cliente.id}`}>Modifica Cliente</Link>          
                </div>
                <LeadsList userLeads={this.props.leads}/>
                <DealList clienteDeals={clienteDeals} />
                {this.props.uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && <FattureList dealFatture={dealFatture} />}
                {this.props.uid === 'BNhRvZCcvMPr54unKlYSSliPel42' && <FattureList dealFatture={dealFatture} />}
                
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cliente: state.clienti.find((cliente) => cliente.id === props.match.params.id),
    leads: state.leads.filter((lead) => lead.leadId === props.match.params.id),
    fatture: state.fatture,
    deals: state.deals,
    uid: state.auth.uid
})

export default connect(mapStateToProps)(ViewClientiPage)