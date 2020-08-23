import configureMockStore from 'redux-mock-store'; 
import thunk from 'redux-thunk'; 
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, 
            startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses'; 
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase'; 

// create configuration for creating mock Store;  params are array of middleware
const createMockStore = configureMockStore([thunk]); 
const uid = 'thisismytestuid'; 
const defaultAuthState = { auth: { uid }};  // used in firebase createMockStore() to have default value for uid;  

// clears the database on expensify test prior to each test to include just the fixtures data (3 items)
beforeEach((done) => {
    const expensesData = {}; 
    expenses.forEach(({ id, description, note, amount, createdAt }) => {  // destructure these fields directly 
        expensesData[id] = {description, note, amount, createdAt };
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done()); // ensures that .forEach doesn't allow test case to run until Firebase updates
})

test('Setup Remove Expense action object', () => {
    const action = removeExpense({id: '1234abc'}); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'REMOVE_EXPENSE', 
        id: '1234abc'
    })
})

/* Async function uses 'done' to force test to wait until done() is executed;  */
test('Should Remove Expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);  // add auth object param w/ uid property so startRemoveExpense has needed info
    const id = expenses[2].id; 

    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();   // should just be 1 action 
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE', 
            id        // should get our seed data back
        }); 
        // return so we can chain onto this  
        return database.ref(`users/${uid}/expenses/${id}`).once('value');  // return from this should be null 
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();  // null is considered falsy;   
        done();  // this is async as well, so move done() here to forces Jest to wait for this to complete
    }) 
})

test('Setup Edit Expense action object', () => {
    const action = editExpense('1234abc', {note: 'new note value'}); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'EDIT_EXPENSE', 
        id: '1234abc', 
        updates: {note: 'new note value'}
    })
})

/* Async function uses 'done' to force test to wait until done() is executed;  */
test('Should Edit Expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState); 
    const id = expenses[0].id; 
    const updates = { amount: 31288 }; 

    store.dispatch(startEditExpense(id, updates)).then(() => {   // can use .then() because of return promise in expenses.js
        const actions = store.getActions();   // should just be 1 action 
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE', 
            id,        // should get our seed data back
            updates     // e.g. updates = updates
        }); 
        // return so we can chain onto this  
        return database.ref(`users/${uid}/expenses/${id}`).once('value'); 
        }).then((snapshot) => {
            expect(snapshot.val().amount).toBe(updates.amount);  // verifies that amount from update is = to amount specified in object above   
        done();  // this is async as well, so move done() here to forces Jest to wait for this to complete
    });  
})

test('Setup Add Expense action object with provided values', () => {
    const action = addExpense(expenses[2]); 
    expect(action).toEqual({        // id field is unknown as this is generated each time;  use .any(String) for this field
        type: 'ADD_EXPENSE', 
        expense: expenses[2]
    })
})

test('Should add Expense to database and (dispatch to) store', (done) => {  // done used to force async wait in test below
    const store = createMockStore(defaultAuthState); 
    const expenseData = {
        description: 'Mouse', 
        amount: 3000, 
        note: 'This one is better', 
        createdAt: 1000
    }
    // Use Promise chaining -- e.g. promise.then(() => {...}).then(() => {...}).then ...
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // expect(1).toBe(2);   // w/out done, passes the test because Jest is already finished with initial function call 
        // done();  // forces Jest to wait for Firebase to complete, & expect(1).toBe(2) will fail
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({    // first action is the only one that should exist (dispatch on expenses.js is only action here)
            type: 'ADD_EXPENSE',        
            expense: {
                id: expect.any(String),     // just checking that id is a string of some kind
                ...expenseData
            }
        })

        // expense.id is the id generated by Firebase;   return allows for chaining of Promises 
       return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData); 
        done();  // this is async as well, so move done() here to forces Jest to wait for this to complete
    }) 
})

test('Should add Expense with defaults to database and (dispatch to) store', (done) => {
    const store = createMockStore(defaultAuthState); 
    const expenseDefaults = {
        description: '', 
        amount: 0, 
        note: '', 
        createdAt: 0
    }
    // Use Promise chaining -- e.g. promise.then(() => {...}).then(() => {...}).then ...
    store.dispatch(startAddExpense({})).then(() => {
        // expect(1).toBe(2);   // w/out done, passes the test because Jest is already finished with initial function call 
        // done();  // forces Jest to wait for Firebase to complete, & expect(1).toBe(2) will fail
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({    // first action is the only one that should exist (dispatch on expenses.js is only action here)
            type: 'ADD_EXPENSE',        
            expense: {
                id: expect.any(String),     // just checking that id is a string of some kind
                ...expenseDefaults
            }
        })

        // expense.id is the id generated by Firebase;  return allows for chaining to work (also fixes Timeout error) 
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults); 
        done();  // this is async as well, so move done() here to forces Jest to wait for this to complete
    }) 
})

// test('Setup Add Expense with no data', () => {
//     const action = addExpense(); 
//     expect(action).toEqual({        // id field is unknown as this is generated each time;  use .any(String) for this field
//         type: 'ADD_EXPENSE', 
//         expense: {
//             description: '', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0, 
//             id: expect.any(String)
//         }
//     })
// })

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);   // entire expenses array
    expect(action).toEqual({
        type: 'SET_EXPENSES', 
        expenses
    })
})

// startSetExpenses -- This one is async, so need to use 'done'
test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState); 
    // should grab all the dummy Firebase data we setup
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();   // should just be 1 action
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES', 
            expenses        // should get our seed data back
        }); 
        done(); 
    });  
})