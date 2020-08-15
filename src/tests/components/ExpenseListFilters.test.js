import React from 'react';
import { shallow } from 'enzyme';
import  moment  from 'moment'; 
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({      // .setProps is an Enzyme function that allows us to modify props for the test
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value='zzz'; 
  wrapper.find('input').at(0).simulate('change', {   // airbnb.io/enzyme -- .at ;  (0) refers to first input in <form> on ExpenseListFilters.js
    target: { value }         // e.target.value on ExpenseForm.js 
  });   
  expect(setTextFilter).toHaveBeenLastCalledWith(value);  
});

test('should sort by amount', () => {
  const value='amount'; 
  wrapper.find('select').simulate('change', {   
    target: { value }         // e.target.value on ExpenseListFilters.js 
  });  
  expect(sortByAmount).toHaveBeenCalled(); 
});

test('should sort by date', () => {
  const value='date'; 
  wrapper.find('select').simulate('change', {   
    target: { value }         // e.target.value on ExpenseListFilters.js 
  });  
  expect(sortByDate).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years'); 
    const endDate = moment(0).add(8, 'years'); 

    // find DateRangePicker to get one of its props (onDatesChange) & call it  
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });    
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate'; 
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused); 
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});