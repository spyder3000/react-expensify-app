import React from 'react';   // using ES6 syntax for React;  
import ExpenseForm from './ExpenseForm'; 
import { connect } from 'react-redux'; 
import { editExpense, removeExpense } from '../actions/expenses'; 

const EditExpensePage = (props) => {
    //console.log('aaa', props);  
    return (
        <div>
            <ExpenseForm 
                expense={props.expense}  // expense prop to hold existing expense object;  from mapStateToProps() below
                onSubmit={(expense) => {
                    // Dispatch the action to edit the expense & redirect to dashboard page
                    props.dispatch(editExpense(props.expense.id, expense));  // params - id & object w/ description, note, amount, createdAt
                    props.history.push('/');   // switch to Dashboard page;  on Chrome, click 'Components' - 'EditExpensePage' to see history object
                    //console.log('updated', props.expense.id, 'aaa', expense)
                }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({id: props.expense.id}));  
                props.history.push('/');  
            }}>Remove</button>
        </div>
    );
}; 


const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;   // props.match.params.id comes from ExpenseListItem.js <Link>
        })
    }
}

export default connect(mapStateToProps)(EditExpensePage);   // mapStateToProps to get us current data from state

