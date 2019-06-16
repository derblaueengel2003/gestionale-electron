import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserForm from './UserForm'
import { startEditUser, startRemoveUser } from '../actions/utenti'

export class EditUtentePage extends React.Component {
    onSubmit = (utente) => {
        this.props.startEditUser(this.props.utente.id, utente)
        this.props.history.push(`/userview/${this.props.utente.id}`)
    }
    onRemove = () => {
        if (window.confirm('Confermi la cancellazione? L\'operazione è irreversibile')) {
            this.props.startRemoveUser({ id: this.props.utente.id })
            this.props.history.push('/users')
        } 
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Modifica Utente</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/users">Torna al Riepilogo Utenti</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                <UserForm 
                    user={this.props.utente}
                    onSubmit={this.onSubmit}
                />
                <button className="button button--secondary" onClick={this.onRemove}>Cancella utente</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    utente: state.utenti.find((utente) => utente.id === props.match.params.id) 
})

const mapDispatchToProps = (dispatch) => ({
    startEditUser: (id, utente) => dispatch(startEditUser(id, utente)),
    startRemoveUser: (data) => dispatch(startRemoveUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUtentePage)