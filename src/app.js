import React from 'react';   // using ES6 syntax for React;  
import ReactDOM from 'react-dom'; 
import {Provider} from 'react-redux';  // Provider allows us to provide the Store to all the components in our application
import AppRouter from './routers/AppRouter'; 
import configureStore from './store/configureStore'; 
import {addExpense} from './actions/expenses'
import {setTextFilter} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';   // found in node_modules folder
import './styles/styles.scss'; 
import 'react-dates/lib/css/_datepicker.css'; 


const store = configureStore();  // this gives us access to store.subscribe() & store.dispatch(); 

/* Exercise -- add 2 expensees, filter by 'bill' & log visible Expenses */
const expenseOne = store.dispatch(addExpense({ description: 'Water Bill', amount: 4500, createdAt: 4000 }));  // amt in cents; date in ms after 1970
const expenseTwo = store.dispatch(addExpense({ description: 'Gas Bill', amount: 2300, createdAt: 10000 })); 
const expenseThree = store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 1000 })); 

// store.dispatch(setTextFilter('water')); 

// // page will be re-rendered with this new value after 3 seconds;  
// setTimeout(() => {
//     store.dispatch(setTextFilter('bill')); 
// }, 3000)

const state = store.getState(); 
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);  
console.log(visibleExpenses); 

//console.log(store.getState()); // will display an expenses object;  

const jsx = (   /*  Provider requires 'store' prop;  note: comment not allowed in <Provider> -- causes error;  */
    <Provider store={store}>  
      <AppRouter />
    </Provider>
  );
  
  ReactDOM.render(jsx, document.getElementById('app'));
//ReactDOM.render(<AppRouter />, document.getElementById('app'))   // 1st param is JSX to render;  2nd is location -- e.g. 'app' on index.html;  
