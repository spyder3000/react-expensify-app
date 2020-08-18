import React from 'react';   // using ES6 syntax for React;  
import ExpenseList from './ExpenseList';  
import ExpenseListFilters from './ExpenseListFilters';  
import ExpensesSummary from './ExpensesSummary';  

const ExpenseDashBoardPage = () => (
    <div>
        <ExpensesSummary /> 
        <ExpenseListFilters /> 
        <ExpenseList />
    </div>
);

export default ExpenseDashBoardPage; 