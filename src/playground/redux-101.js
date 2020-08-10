import { createStore } from 'redux';    // call once to create Store

// const add = (data, c) => {
//     return data.a + data.b + c; 
// }
// const add = ({ a, b}, c) => {
//     return a + b + c; 
// }
// console.log(add({ a: 1, b: 12 }, 100)); 

// Action generators -- a very simple function that return action objects;  type & incrementBy will be referenced as action vars in createStore
// const incrementCount = (payload = {}) => ({  // create a single Action Generator for increment;  payload is input;  
//     type: 'INCREMENT',   // implicitly returns object;
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1  
// })
// sets incrementBy to 1 if object doesn't include incrementBy;  sets to {} if no object is provided;  
const incrementCount = ({incrementBy = 1} = {}) => ({  // use destructuring of {incrementBy} w/ default to simplify prev stmt 
    type: 'INCREMENT',   
    incrementBy  //  same as incrementBy: incrementBy
})

// sets decrementBy to 1 if object doesn't include decrementBy;  sets to {} if no object is provided;  
const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT', 
    decrementBy
})

const setCount = ({count = 0} = {}) => ({   
    type: 'SET', 
    count
})

// at the most basic form, the action generators are always arrow functions that will always return an implicit object
const resetCount = () => ({   
    type: 'RESET'
})

// Reducers are pure functions (output is only determined by the input);  our reducers need to compute new state based on old state & action
//   State or action should never be changed directly;  instead return a new object that reflects the new state;   
const countReducer = (state = { count: 0 }, action) => {  // createStore expects fn for first arg;  state is current state;  
    switch (action.type) {
        case 'INCREMENT': 
            //const incrementBy = (typeof action.incrementBy === 'number') ? action.incrementBy : 1; 
            return { count: state.count + action.incrementBy };   // note:  we do not want to change state or action directly
        case 'DECREMENT': 
            //const decrementBy = (typeof action.decrementBy === 'number') ? action.decrementBy : 1;
            return { count: state.count - action.decrementBy };   // return the object where count is 1 less than before
        case 'SET': 
            return { count: action.count }
        case 'RESET': 
            return { count: 0 };    
        default: 
            return state; 
    }
}

// the function part of this is called a 'reducer';  see https://redux.js.org/basics/reducers  
const store = createStore(countReducer);       

//console.log(store.getState());   // returns current state object  

// Actions -- an object that gets sent to the store 
//  e.g. increment, decrement, reset -- allowing us to change store via various actions;  

// return from store.subscribe is actually a function to unsubscribe (if you want to discontinue this), so save this to a constant;  
const unsubscribe = store.subscribe(() => {     // called every time the Store state changes;  
    console.log(store.getState());   
})

// store.dispatch will actually call the createStore as 2nd param of action
// store.dispatch({
//     type: 'INCREMENT',   // all caps is a convention w/ redux; separate words w/ _  
//     incrementBy: 5
// }); 
store.dispatch(incrementCount({ incrementBy: 5})); 

//unsubscribe();     // used to discontinue the store.subscribe() specified earlier;  

// store.dispatch({
//     type: 'INCREMENT'   // all caps is a convention w/ redux; separate words w/ _  
// }); 
store.dispatch(incrementCount()); 

// store.dispatch({
//     type: 'RESET'   
// }); 
store.dispatch(resetCount()); 

// store.dispatch({
//     type: 'DECREMENT', 
//     decrementBy: 10   
// }); 
store.dispatch(decrementCount({ decrementBy: 10})); 

// store.dispatch({
//     type: 'DECREMENT' 
// }); 
store.dispatch(decrementCount()); 

// store.dispatch({
//     type: 'SET', 
//     count: 101 
// }); 
store.dispatch(setCount({ count: 103})); 

