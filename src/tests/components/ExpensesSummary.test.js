import React from 'react'; 
import { shallow } from 'enzyme'; 
import { ExpensesSummary }  from '../../components/ExpensesSummary'; 

// test here is to test the const ExpenseListItem component in ExpenseListItem.js  
test('Should render ExpensesSummary correctly for one expense', () => {
    const wrapper =  shallow(<ExpensesSummary expenseCount={1} expensesTotal={3333} />);   
    expect(wrapper).toMatchSnapshot(); 
})

test('Should render ExpensesSummary correctly for multiple expenses', () => {
    const wrapper =  shallow(<ExpensesSummary expenseCount={8} expensesTotal={49033} />); 
    expect(wrapper).toMatchSnapshot(); 
})