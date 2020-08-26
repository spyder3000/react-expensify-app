import React from 'react'; 
import { connect } from 'react-redux';   // connect to connect to Redux Store
import { Link } from 'react-router-dom'; 
import numeral from 'numeral';  
import selectExpenses from '../selectors/expenses'; 
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses' ; 
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00'); 
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount} </span>{expenseWord} totalling 
                    <span> {formattedExpensesTotal} </span> </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}; 

// this is basically a function that returns a sorted & filtered array  
const mapStateToProps = (state) => {   // e.g. state.expenses, state.filters
    const visibleExpenses = selectExpenses(state.expenses, state.filters);  

    return { 
        expenseCount: visibleExpenses.length, 
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
}; 

// when you connect a component to the Redux store it's reactive, meaning changes will cause the page to re-render 
export default connect(mapStateToProps)(ExpensesSummary);    
