import React from 'react';   // using ES6 syntax for React;  
import ExpenseList from './ExpenseList';  
import ExpenseListFilters from './ExpenseListFilters';  

const ExpenseDashBoardPage = () => (
    <div>
        <ExpenseListFilters /> 
        <ExpenseList />
    </div>
);

export default ExpenseDashBoardPage; 