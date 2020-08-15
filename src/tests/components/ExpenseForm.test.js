import React from 'react'; 
import { shallow } from 'enzyme'; 
import moment from 'moment'; 
import ExpenseForm from '../../components/ExpenseForm'; 
import expenses from '../fixtures/expenses'; 

test('Should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot(); 
})

// verify by looking in components\__shapshots__ 
test('Should render ExpenseForm correcly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense = {expenses[0]} />); 
    expect(wrapper).toMatchSnapshot(); 
})

test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot();  // snapshot before & after change
    // simulate an event (e.g. click, submit, change);  airbnb.io/enzyme -- API ref -> Shallow Rendering -> .simulate()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}        // e.preventDefault() on ExpenseForm.js error if 'e' not specified here
    });   
    // airbnb.io/enzyme -- API ref -> Shallow Rendering -> state()
    expect(wrapper.state('error').length).toBeGreaterThan(0);   // corresponds to this.setState() of 'error' in 'onSubmit'
    expect(wrapper).toMatchSnapshot();  // make sure that after error state changes, it gets rendered;  view in __snapshots__ folder
})

test('Should set description on input change', () => {
    const value = 'New Description'; 
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(0).simulate('change', {   // airbnb.io/enzyme -- .at ;  (0) refers to first input in <form> on ExpenseForm.js
        target: { value }         // e.target.value on ExpenseForm.js 
    });   
    expect(wrapper.state('description')).toBe(value); 
}); 

test('Should set note on textarea change', () => {
    const value = 'New Note'; 
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('textarea').simulate('change', {   
        target: { value }         // e.target.value on ExpenseForm.js 
    });   
    expect(wrapper.state('note')).toBe(value); 
}); 

test('Should set amount to a valid amount', () => {
    const value = '23.50'; 
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(1).simulate('change', {   // airbnb.io/enzyme -- .at ;  (0) refers to first input in <form> on ExpenseForm.js
        target: { value }         // e.target.value on ExpenseForm.js 
    });   
    expect(wrapper.state('amount')).toBe(value); 
}); 

test('Should set amount to an Invalid amount', () => {
    const value = '22.113'; 
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(1).simulate('change', {   // airbnb.io/enzyme -- .at ;  (0) refers to first input in <form> on ExpenseForm.js
        target: { value }         // e.target.value on ExpenseForm.js 
    });   
    expect(wrapper.state('amount')).toBe(''); 
}); 

test('Should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();   // returns new spy;  
    //onSubmitSpy('Andrew', 'Chicago');   // spy allows us to pass spy into component we render, submit things (e.g. submit) & verify it went well
    //expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Chicago');     // URL -- https://jestjs.io/docs/en/expect
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    // simulate an event (e.g. click, submit, change);  airbnb.io/enzyme -- API ref -> Shallow Rendering -> .simulate()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}        // e.preventDefault() on ExpenseForm.js error if 'e' not specified here
    });  
    expect(wrapper.state('error')).toBe('');  // expect state.error to be empty
    expect(onSubmitSpy).toHaveBeenLastCalledWith({      // cannot use expenses[0] by itself because id field not created yet
        description: expenses[0].description, 
        amount: expenses[0].amount, 
        note: expenses[0].note, 
        createdAt: expenses[0].createdAt 
    })
}); 

test('Should set new date on Date change', () => {
    //const onSubmitSpy = jest.fn();   // returns new spy;  
    const now = moment();  // curr date
    const wrapper = shallow(<ExpenseForm />)

    // find SingleDatePicker to get one of its props (onDateChange) & call it  
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);   // calls this w/ var now;  
    expect(wrapper.state('createdAt')).toEqual(now);  // expect state.error to be empty
}); 

test('verify that onFocusChange changes calendarFocused', () => {
    //const onSubmitSpy = jest.fn();   // returns new spy;  
    const focused = true;  // curr date
    const wrapper = shallow(<ExpenseForm />)

    // find SingleDatePicker to get one of its props (onFocusChange) & call it  
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: focused});   // calls this w/ var focus;  
    expect(wrapper.state('calendarFocused')).toBe(focused);  // expect state.error to be empty
}); 