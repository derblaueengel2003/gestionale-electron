import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpensesPayed from '../selectors/expenses-payed'

export const ExpensesSummary = ({ expenseCount, expensesTotal, expensesPayed, uid }) => {
    const expenseWord = expenseCount === 1 ? 'provvigione' : 'provvigioni'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('0,0[.]00 $')
    const formattedExpensesPayed = numeral(expensesPayed / 100).format('0,0[.]00 $')
    const expensesPending = numeral((expensesTotal - expensesPayed) / 100).format('0,0[.]00 $')
    const adminNavbar = (
        <div>
        <Link className="button" to="/create">Aggiungi Provvigione</Link>
        <Link className="button" to="/users">Utenti</Link>
        </div>
        )

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Riepilogo: <span>{expenseCount}</span> {expenseWord} per un totale di <span>{formattedExpensesTotal}</span></h1>
                <h1 className="page-header__title">Incassate: <span>{formattedExpensesPayed}</span> - Pendenti: <span>{expensesPending}</span></h1>
                <div className="page-header__actions">
                 {uid === 'JzFEsotsQwhMMAeJeWDM8Jv2qGb2' && adminNavbar}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters, state.auth)
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses, state.auth),
        expensesPayed: selectExpensesPayed(visibleExpenses, state.auth),
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(ExpensesSummary)