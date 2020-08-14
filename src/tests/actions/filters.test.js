import moment from 'moment'; 
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters'; 

test('should generate start date action object', () => {
    const action = setStartDate(moment(0)); 
    expect(action).toEqual({
        type: 'SET_START_DATE', 
        startDate: moment(0)
    })
})

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0)); 
    expect(action).toEqual({
        type: 'SET_END_DATE', 
        endDate: moment(0)
    })
})

test('Should generate Set Text Filter object w/ text value', () => {
    const text = 'abc'; 
    const action = setTextFilter(text); 
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER', 
        text: text
    })
})

test('Should generate Set Text Filter object w/ default value', () => {
    const action = setTextFilter(); 
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER', 
        text: ''
    })
})

test('Should generate action object for Sort By Amount', () => {
    const action = sortByAmount(); 
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('Should generate action object for Sort By Date', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })   // same as above
})
