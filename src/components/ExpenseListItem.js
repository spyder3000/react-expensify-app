import React from 'react';   // all JSX is converted into React.createElement, so React here is needed, even for stateless components;
import { Link } from 'react-router-dom'; 
import moment from 'moment'; 
import numeral from 'numeral'; 

//import { removeExpense, editExpense } from '../actions/expenses'
//import { connect } from 'react-redux';  

// Export a stateless functional component 
//   description, amount, createdAt

const ExpenseListItem = ({dispatch,description, amount, createdAt, id}) => (   /* dispatch can be accessed via destructred var also */
    <Link className="list-item" to={`/edit/${id}`}>
      <div>
        <h3 className="list-item__title">{description}</h3>
        <span className="list-item__subtitle">{moment(createdAt).format('MMMM Do, YYYY')}</span> 
      </div>
      <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link> 
);

export default ExpenseListItem;   // moved Remove button to EditExpensePage.js, so no connect() needed;  
//export default connect()(ExpenseListItem);   // connect() because we don't want anything from state;  just want to connect to use dispatch()  

