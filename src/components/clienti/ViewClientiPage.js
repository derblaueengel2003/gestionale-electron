import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class ViewClientiPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Clienti</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/customer">Torna al Riepilogo</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.cliente.name.length > 0 && <div>Nome: {this.props.cliente.name}</div>}
                    {this.props.cliente.role.length > 0 && <div>Ruolo: {this.props.cliente.role}</div>}
                    <Link className="button" to={`/customeredit/${this.props.cliente.id}`}>Modifica Cliente</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cliente: state.clienti.find((cliente) => cliente.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewClientiPage)