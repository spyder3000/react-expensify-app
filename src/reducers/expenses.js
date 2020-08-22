// Expenses Reducer - action data here comes from addExpense action generator;  
const expensesReducerDefaultState = []; 
const expensesReducer = (state=expensesReducerDefaultState, action) => {     // default of empty array
    //console.log('AAA', action); 
    switch (action.type) {
        case 'ADD_EXPENSE': 
            // return state.concat(action.expense);  // note cannot use state.push as this changes array;  return .concat creates new array
            return [        // same as above but uses spread operator
               ...state, 
               action.expense 
            ]
        case 'REMOVE_EXPENSE': 
            // return state.filter((expense) => {
            //     console.log('expense.id = ' + expense.id)
            //     return expense.id !== action.id   // return all except matched id 
            // })  
            return state.filter(({ id }) => id !== action.id )   // destructured to get just id from state & simplify
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (action.id ===expense.id) {
                    //console.log('jv = ' + JSON.stringify(action.updates)); 
                    return {
                        ...expense, 
                        ...action.updates   // e.g. {"amount": 500};  effect is to add this as a new property
                    }; 
                } else return expense;   // no change
            })
        case 'SET_EXPENSES':  // completely sets the expenses array;  we don't access state because we don't care what was in there previously
            return action.expenses; 
        default: 
            return state; 
    }
}; 

export default expensesReducer;  