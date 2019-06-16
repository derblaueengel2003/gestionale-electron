import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
    <div className="content-container">
     <div className="list-header">
        <div className="show-for-mobile">Provvigione</div>
        <div className="show-for-desktop">Provvigione</div>
        <div className="show-for-desktop">Importo</div>
     </div>
       <div className="list-body">
       {
        props.expenses.length === 0 ? (
            <div className="list-item list-item--message">
                <span>Nessuna provvigione in base ai filtri inseriti</span>
            </div>
        ) : (
            
            props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense } uid={props.uid} />
            })
        )
       
    }
       </div>
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters, state.auth),
        uid: state.auth.uid
    }
} 

export default connect(mapStateToProps)(ExpenseList)