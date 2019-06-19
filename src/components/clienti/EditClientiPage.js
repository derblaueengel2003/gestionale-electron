import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomerForm from './ClientiForm'
import { startEditCustomer, startRemoveCustomer } from '../../actions/clienti'

export class EditClientePage extends React.Component {
    onSubmit = (cliente) => {
        this.props.startEditCustomer(this.props.cliente.id, cliente)
        this.props.history.push(`/customerview/${this.props.cliente.id}`)
    }
    onRemove = () => {
        if (window.confirm('Confermi la cancellazione? L\'operazione è irreversibile')) {
            this.props.startRemoveCustomer({ id: this.props.cliente.id })
            this.props.history.push('/customer')
        } 
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Modifica Cliente</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/customer">Torna al Riepilogo Clienti</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                <CustomerForm 
                    customer={this.props.cliente}
                    onSubmit={this.onSubmit}
                />
                <button className="button button--secondary" onClick={this.onRemove}>Cancella cliente</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cliente: state.clienti.find((cliente) => cliente.id === props.match.params.id) 
})

const mapDispatchToProps = (dispatch) => ({
    startEditCustomer: (id, cliente) => dispatch(startEditCustomer(id, cliente)),
    startRemoveCustomer: (data) => dispatch(startRemoveCustomer(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditClientePage)