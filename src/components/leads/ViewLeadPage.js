import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class ViewLeadPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Richiesta</h1>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.lead.leadNome.length > 0 && <div>Nome: {this.props.lead.leadNome}</div>}
                    {this.props.lead.leadEmail.length > 0 && <div>Cognome: {this.props.lead.leadEmail}</div>}
                    <Link className="button" to={`/leadedit/${this.props.lead.id}`}>Modifica Richiesta</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    lead: state.leads.find((lead) => lead.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewLeadPage)