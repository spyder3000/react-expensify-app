import { createStore, combineReducers } from 'redux';  
import expensesReducer from '../reducers/expenses'; 
import filtersReducer from '../reducers/filters'; 

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,   // results in putting array on expenses property
            filters: filtersReducer
        }), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ); 
    return store; 
};

