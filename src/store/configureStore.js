import { createStore, combineReducers, applyMiddleware, compose } from 'redux';  
import expensesReducer from '../reducers/expenses'; 
import filtersReducer from '../reducers/filters'; 
import thunk from 'redux-thunk'; 

// first option is populated if we're using the dev tools;  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,   // results in putting array on expenses property
            filters: filtersReducer
        }), 
        composeEnhancers(applyMiddleware(thunk))
    ); 
    return store; 
};

