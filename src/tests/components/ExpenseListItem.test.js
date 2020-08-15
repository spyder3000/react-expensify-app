import React from 'react'; 
import { shallow } from 'enzyme'; 
import ExpenseListItem from '../../components/ExpenseListItem'; 
import expenses from '../fixtures/expenses'; 

// test here is to test the const ExpenseListItem component in ExpenseListItem.js  
test('Should render ExpenseListItem correctly for one expense', () => {
    const wrapper =  shallow(<ExpenseListItem {...expenses[0]} />);  // props data is 1 element of array
    expect(wrapper).toMatchSnapshot(); 
})