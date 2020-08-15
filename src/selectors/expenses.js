import moment from 'moment'; 

// Get visible expenses;  note: vals for startDate & endDate are timestamps (milliseconds) from Jan 1, 1970 midnight -- e.g. 33400, 10, etc;   
//a const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {
export default (expenses, {text, sortBy, startDate, endDate }) => {  // 1st param is array of expenses
    return expenses.filter((expense) => {   // will return filtered & sorted array (due to .filter() & .sort() below)
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;  // will always be true for non-numbers
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
        const createdAtMoment = moment(expense.createdAt); 
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true;  // moment function 
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true; 
        const textMatch =  expense.description.toLowerCase().includes(text.toLowerCase());  // .includes checks for match in string 
        return startDateMatch && endDateMatch && textMatch;  
    }).sort((a, b) => {
        if (sortBy === 'date') {        // put most recent purchaes first;  1 means b comes first;  -1 means a comes first 
            return a.createdAt < b.createdAt ? 1 : -1 
        }
        if (sortBy === 'amount') {      // put largest amount first;  1 means b comes first;  -1 means a comes first
            return a.amount < b.amount ? 1 : -1 
        }
    })
}; 

//a export default getVisibleExpenses;  // used alternate syntax for export for this one