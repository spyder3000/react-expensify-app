import React from 'react'; 
import { shallow } from 'enzyme'; 
import { AddExpensePage } from '../../components/AddExpensePage'; 
import expenses from '../fixtures/expenses'; 

let addExpense, history, wrapper;   // define 3 vars

beforeEach(() => {
    addExpense = jest.fn(); 
    history = { push: jest.fn() }; 
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history = {history} />);    
})

// need to pass in the expected props -- onSubmit & history
test('should render AddExpensePage correctly', () => {
    // moved these 3 lines to beforeEach()
    // const onSubmit = jest.fn(); 
    // const history = { push: jest.fn() }; 
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history = {history} />); 
    expect(wrapper).toMatchSnapshot();  // test that page renders;  see in __snapshots__
}); 

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);  // call onSubmit in ExpenseForm w/ data from expenses[1]
    expect(history.push).toHaveBeenLastCalledWith('/');   // verify that our spies were called with the correct data
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]); 
}); 