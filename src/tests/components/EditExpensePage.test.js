import React from 'react'; 
import { shallow } from 'enzyme'; 
import { EditExpensePage } from '../../components/EditExpensePage'; 
import expenses from '../fixtures/expenses'; 

let startEditExpense, startRemoveExpense, history, wrapper;   // define 3 vars

beforeEach(() => {
    startEditExpense = jest.fn()        // jest spy
    startRemoveExpense = jest.fn()      // jest spy
    history = { push: jest.fn() }  // push will be the spy
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense} 
            history={history} 
            expense = {expenses[0]} 
        />);       
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();  // test that page renders;  see in __snapshots__
}); 

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);   // calls onSubmit w/ a sample expense
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);  // verifies called with correct params
});
  
test('should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');       // simulate click event of the button 
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({    // verify object passed to removeExpense is correct as well;  
        id: expenses[0].id
    });
});