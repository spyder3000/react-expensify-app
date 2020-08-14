import React from 'react';   // all JSX is converted into React.createElement, so React here is needed, even for stateless components;
import { Link } from 'react-router-dom'; 
//import { removeExpense, editExpense } from '../actions/expenses'
//import { connect } from 'react-redux';  

// Export a stateless functional component 
//   description, amount, createdAt

const ExpenseListItem = ({dispatch,description, amount, createdAt, id}) => (      /* dispatch can be accessed via destructred var also */
    <div>
        <Link to={`/edit/${id}`}>
          <h3>{description}</h3>
        </Link> 

        <p>{amount} - {createdAt} </p>
        {/*<button onClick={() => {
          dispatch(removeExpense({id}))
        }}> Remove </button>  */}
    </div>
);

export default ExpenseListItem;   // moved Remove button to EditExpensePage.js, so no connect() needed;  
//export default connect()(ExpenseListItem);   // connect() because we don't want anything from state;  just want to connect to use dispatch()  

