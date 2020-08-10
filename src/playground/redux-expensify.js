// combineReducers allow us to create multiple functions to define how our redux application changes;  
import { createStore, combineReducers } from 'redux';  
import uuid from 'uuid'; 

// ADD_EXPENSE action generator
const addExpense = ( {description='', note='', amount=0, createdAt = 0} = {} ) => ({    // destructuring the args; default vals; {} if no object
    type: 'ADD_EXPENSE', 
    expense:  {
        id: uuid(), 
        description, 
        note, 
        amount, 
        createdAt
    }
});

// REMOVE_EXPENSE action generator
const removeExpense = ( {id } = {} ) => ({    // destructuring the args; default vals; {} if no object;  implicity returns object via {{...})
    type: 'REMOVE_EXPENSE', 
    id
});

// EDIT_EXPENSE action generator
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE', 
    id, 
    updates
})

// SET_TEXT_FILTER action generator
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER', 
    text
})

// SORT_BY_AMOUNT action generator
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// SORT_BY_DATE action generator
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SET_START_DATE action generator
const setStartDate = (startDate=undefined) => ({
    type: 'SET_START_DATE',
    startDate
})

// SET_END_DATE action generator
const setEndDate = (endDate) => ({      // default is undefined so we don't need to set that for endDate
    type: 'SET_END_DATE', 
    endDate
})


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
        default: 
            return state; 
    }
}

const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 'date', 
    startDate: undefined, 
    endDate: undefined 
}
const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': 
            // return state.concat(action.expense);  // note cannot use state.push as this changes array;  return .concat creates new array
            return {        // same as above but uses spread operator
            ...state,           // current object
            text: action.text   // add/update text property of this object
            };
        case 'SORT_BY_AMOUNT': 
            return {
                ...state, 
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE': 
            return {
                ...state, 
                sortBy: 'date'
            }   
        case 'SET_START_DATE': 
            return {
                ...state, 
                startDate: action.startDate
            }    
        case 'SET_END_DATE': 
            return {
                ...state, 
                endDate: action.endDate
            }                
        default: 
            return state; 
    }
}

// Get visible expenses;  note: vals for startDate & endDate are timestamps (milliseconds) from Jan 1, 1970 midnight -- e.g. 33400, 10, etc;   
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;  // will always be true for non-numbers
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate; 
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

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,   // results in putting array on expenses property
        filters: filtersReducer
    })
); 
store.subscribe(() => {
    const state = store.getState(); 
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);  
    //console.log(store.getState());   // will display an expenses object;  
    console.log(visibleExpenses); 
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: -4000 })); 
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })); 
// const expenseThree = store.dispatch(addExpense({ description: 'Book', amount: 2100 })); 
// const expenseFour = store.dispatch(addExpense({ description: 'Cat', amount: 4000 })); 
// console.log(expenseOne); 

// store.dispatch(removeExpense({id: expenseOne.expense.id })); 

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('rent')); 
// store.dispatch(setTextFilter()); 

 store.dispatch(sortByAmount()); 
// store.dispatch(sortByDate()); 

//store.dispatch(setStartDate(125)); 
// store.dispatch(setStartDate());     // should be set to undefined 
//store.dispatch(setEndDate(1250));  

const demoState = {
    expenses: [{
        id: 'abfdasdg', 
        description: 'January Rent', 
        note: 'This was the final payment for that address', 
        amount: 54500,    // in pennies
        createdAt: 0
    }], 
    filters: {
        text: 'rent',    // filter by text (e.g. search)
        sortBy: 'amount',   // date or amount
        startDate: undefined, 
        endDate: undefined  
    }
}; 

// const user = {
//     name: 'Jen', 
//     age: 24
// }; 
// // to add new property (e.g. location) and/or override existing property (age);  note: to override, updates have to be after ...user
// console.log({
//     ...user, location: 'Miami', age: 33  
// })

