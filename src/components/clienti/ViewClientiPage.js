import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import LeadsList from '../leads/LeadsList'

export class ViewClientiPage extends React.Component {
    render() {
        
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Clienti</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.cliente.ditta.length > 0 && <div>{this.props.cliente.ditta}</div>}
                    {this.props.cliente.nome.length > 0 && <div>{this.props.cliente.titolo} {this.props.cliente.nome} {this.props.cliente.cognome}</div>}
                    {this.props.cliente.indirizzo.length > 0 && <div>{`${this.props.cliente.indirizzo} ${this.props.cliente.indirizzo2 && this.props.cliente.indirizzo2}, ${this.props.cliente.cap} ${this.props.cliente.comune}, ${this.props.cliente.nazione}`}</div>}
                    {this.props.cliente.telefono1.length > 0 && <div>Tel: {this.props.cliente.telefono1}</div>}
                    {this.props.cliente.email.length > 0 && <div>E-Mail: {this.props.cliente.email}</div>}
                    <Link className="print button button--secondary" to={`/customeredit/${this.props.cliente.id}`}>Modifica Cliente</Link>
                </div>
                <LeadsList userLeads={this.props.leads}/>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cliente: state.clienti.find((cliente) => cliente.id === props.match.params.id),
    leads: state.leads.filter((lead) => lead.leadId === props.match.params.id)
})

export default connect(mapStateToProps)(ViewClientiPage)