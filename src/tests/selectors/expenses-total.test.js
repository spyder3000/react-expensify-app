import selectExpensesTotal from '../../selectors/expenses-total'; 
import expenses from '../fixtures/expenses'; 

test('Should return 0 if no expenses', () => {
    const result = selectExpensesTotal([]); 
    expect(result).toBe(0)
}); 

test('Should correctly add up a single expenses', () => {
    const result = selectExpensesTotal([expenses[0]]); 
    expect(result).toBe(expenses[0].amount)
}); 

test('Should return sum of values for expenses', () => {
    const result = selectExpensesTotal(expenses); 
    expect(result).toBe(9695);  
}); 