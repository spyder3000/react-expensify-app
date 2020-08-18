const selectExpensesTotal = (expenses) => {
    if (expenses.length === 0) { 
        return 0; 
    } else {
        // converts array of objects to array of numbers, then reduce to a single number (total) 
        return expenses
            .map((expense) => expense.amount) 
            .reduce((sum, value) => sum + value, 0); 
    }

}; 

export default selectExpensesTotal;  