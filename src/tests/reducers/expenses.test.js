import expensesReducer from '../../reducers/expenses'; 
import expenses from '../fixtures/expenses'

test('Should setup default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });   // first param is state properties
    expect(state).toEqual([]); 
})

test('Should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id }
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures
    expect(state).toEqual([expenses[0], expenses[2]]);  
}); 

test('Should FAIL to remove expense by invalid id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: '-9999' }
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures
    expect(state).toEqual(expenses);  
}); 

test('Should add an expense ', () => {
    const expense = { id: '4', description: 'Pancake', note: '', amount: 2600, createdAt: 430 }
    const action = { type: 'ADD_EXPENSE', expense }
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures
    expect(state).toEqual([...expenses, expense]);  
}); 

test('Should Edit expense by id', () => {
    const amount = 9999; 
    const action = { type: 'EDIT_EXPENSE', id: expenses[0].id, updates: { amount: amount }}
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures
    expect(state[0].amount).toBe(amount);  
}); 

test('Should FAIL to Edit expense by invalid id', () => {
    const amount = 9999; 
    const action = { type: 'EDIT_EXPENSE', id: -9999, updates: { amount: amount }}
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures
    expect(state).toEqual(expenses);  
});

test('should set expenses', () => {
    const action = { type: 'SET_EXPENSES', 
        expenses: [expenses[1]] 
    }; 
    const state = expensesReducer(expenses, action);  // expenses is data array in tests\fixtures;  so this will start with all expenses
                                                    // and we will test that the end result is just the one expense
    expect(state).toEqual([expenses[1]]);     
}); 