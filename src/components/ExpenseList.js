import React from 'react'; 
import { connect } from 'react-redux';   // connect to connect to Redux Store
import ExpenseListItem from './ExpenseListItem';  
import selectExpenses from '../selectors/expenses'; 

export const ExpenseList = (props) => (     // set to export to test in ExpenseList.test.js 
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            { props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No expenses</span>
                </div>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />   /* ...expense allows for destructuring in ExpenseListItem */
                })
            )
            }
        </div>
    </div>
); 

// replaces logic below (this one's more standard);  this is basically a function that returns a sorted & filtered array  
const mapStateToProps = (state) => {   // e.g. state.expenses, state.filters
    return {
        expenses: selectExpenses(state.expenses, state.filters)   // params for default fn in selectors/expenses
        // expenses: state.expenses, 
        // filters: state.filters
    }; 
}; 

// when you connect a component to the Redux store it's reactive, meaning changes will cause the page to re-render 
export default connect(mapStateToProps)(ExpenseList);    

// const ConnectedExpenseList = connect((state) => {   // e.g. state.expenses, state.filters
//     return {
//         expenses: state.expenses
//     }; 
// })(ExpenseList);  // connect() returns a function which we need to call w/ the component ExpenseList;  
// export default ConnectedExpenseList; 