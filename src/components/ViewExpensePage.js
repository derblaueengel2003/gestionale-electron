import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

export class ViewExpensePage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Dettagli Provvigione</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/">Torna al Riepilogo</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                    {this.props.expense.description.length > 0 && <div>Descrizione: {this.props.expense.description}</div>}
                    {this.props.expense.amount > 0 && <div>Importo: {numeral(this.props.expense.amount / 100).format('0,0[.]00 $')}</div>}
                    {this.props.expense.createdAt > 0 && <div>Data prenotazione: {moment(this.props.expense.createdAt).format('DD MMMM, YYYY')}</div>}
                    {this.props.expense.note.length > 0 && <div>Note: {this.props.expense.note}</div>}
                    <Link className="button" to={`/edit/${this.props.expense.id}`}>Modifica Provvigione</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id) 
})

export default connect(mapStateToProps)(ViewExpensePage)