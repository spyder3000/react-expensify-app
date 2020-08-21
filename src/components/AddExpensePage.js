import React from 'react';   // using ES6 syntax for React;  
import ExpenseForm from './ExpenseForm'; 
import { connect } from 'react-redux'; 
import { startAddExpense } from '../actions/expenses'; 

// ch 124 - convert to class-based component 
export class AddExpensePage extends React.Component {
    onSubmit= (expense) => {
        console.log(expense); 
       // props.dispatch(addExpense(expense));  // action creator that expects object w/ description, note, amount, createdAt
        this.props.startAddExpense(expense);  // replaces above line w/ this & mapDispatchToProps below
        this.props.history.push('/');   // switch to Dashboard page;  from Chrome, click 'Components' then 'AddExpensePage' to see history object
    }
    render() {
        return (
            <div>
            <h1>Add Expense</h1>
            <ExpenseForm onSubmit={this.onSubmit}
            /> 
        </div>
        )
    }
}

// goal is to return an object;  to more easily test, we want to replace props.dispatch(addExpense(expense)) above w/ props.onSubmit(expense)
const mapDispatchToProps = (dispatch) => ({     // implicitly returns object;  same as => { return { onsubmit: ... } }
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
    }); 

export default connect(undefined, mapDispatchToProps)(AddExpensePage);   // () because we don't need anything from state;  this will give us access to props.dispatch above
