import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense)
        this.props.history.push(`/view/${this.props.expense.id}`)
    }
    onRemove = () => {
        if (window.confirm('Confermi la cancellazione? L\'operazione è irreversibile')) {
            this.props.startRemoveExpense({ id: this.props.expense.id })
            this.props.history.push('/')
        } 
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Modifica Provvigione</h1>
                        <div className="page-header__actions">
                        <Link className="button" to="/">Torna al Riepilogo</Link>
                    </div>
                    </div>
                </div>
                <div className="content-container">
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button className="button button--secondary" onClick={this.onRemove}>Cancella provvigione</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id) 
})

const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)