import React from 'react';   // using ES6 syntax for React;  
import ExpenseForm from './ExpenseForm'; 
import { connect } from 'react-redux'; 
import { addExpense } from '../actions/expenses'; 

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit={(expense) => {
                console.log(expense); 
                props.dispatch(addExpense(expense));  // action creator that expects object w/ description, note, amount, createdAt
                props.history.push('/');   // switch to Dashboard page;  from Chrome, click 'Components' then 'AddExpensePage' to see history object
            }}
        /> 
    </div>
);

export default connect()(AddExpensePage);   // () because we don't need anything from state;  this will give us access to props.dispatch above
