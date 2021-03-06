import React from 'react';   // using ES6 syntax for React;  
import { connect } from 'react-redux'; 
import ExpenseForm from './ExpenseForm'; 
import { startEditExpense, startRemoveExpense } from '../actions/expenses'; 

export class EditExpensePage extends React.Component {
    onSubmit= (expense) => {
        console.log(expense); 
        // this.props.dispatch(startEditExpense(this.props.expense.id, expense));  // params - id & object w/ description, note, amount, createdAt
        this.props.startEditExpense(this.props.expense.id, expense);  // replaces above line by removing dispatch which is in mapDispatchToProps below
        this.props.history.push('/');   // switch to Dashboard page;  from Chrome, click 'Components' then 'AddExpensePage' to see history object
    }
    onRemove = () => {
        // this.props.dispatch(startRemoveExpense({id: this.props.expense.id}));
        this.props.startRemoveExpense({ id: this.props.expense.id });   
        this.props.history.push('/'); 
    }
    render() {
        return (
            <div>
                <div className="page-header">  
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}  // expense prop to hold existing expense object;  from mapStateToProps() below
                        onSubmit={this.onSubmit}    
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        );
    }
}; 


const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;   // props.match.params.id comes from ExpenseListItem.js <Link>
        })
    }
}

// goal is to return an object;  to more easily test, we want to replace props.dispatch(editExpense(expense)) above w/ props.onSubmit(expense);  
//  2nd param is Own props -- it's there if needed, but not needed here 
const mapDispatchToProps = (dispatch, props) => ({     // implicitly returns object;  same as => { return { onsubmit: ... } }
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)), 
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage); // mapStateToProps to get us current data from state
