import React from 'react'; 
import { shallow } from 'enzyme'; 
import { EditExpensePage } from '../../components/EditExpensePage'; 
import expenses from '../fixtures/expenses'; 

let editExpense, removeExpense, history, wrapper;   // define 3 vars

beforeEach(() => {
    editExpense = jest.fn()        // jest spy
    removeExpense = jest.fn()      // jest spy
    history = { push: jest.fn() }  // push will be the spy
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            removeExpense={removeExpense} 
            history={history} 
            expense = {expenses[0]} 
        />);       
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();  // test that page renders;  see in __snapshots__
}); 

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);   // calls onSubmit w/ a sample expense
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);  // verifies called with correct params
});
  
test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');       // simulate click event of the button 
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({    // verify object passed to removeExpense is correct as well;  
        id: expenses[0].id
    });
});