import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class ViewUtentiPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Utenti</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/users">Torna al Riepilogo</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.utente.name.length > 0 && <div>Nome: {this.props.utente.name}</div>}
                    {this.props.utente.role.length > 0 && <div>Ruolo: {this.props.utente.role}</div>}
                    <Link className="button" to={`/useredit/${this.props.utente.id}`}>Modifica Utente</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    utente: state.utenti.find((utente) => utente.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewUtentiPage)