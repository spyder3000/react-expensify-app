import { addExpense, editExpense, removeExpense } from '../../actions/expenses'; 

test('Setup Remove Expense action object', () => {
    const action = removeExpense({id: '1234abc'}); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'REMOVE_EXPENSE', 
        id: '1234abc'
    })
})

test('Setup Edit Expense action object', () => {
    const action = editExpense('1234abc', {note: 'new note value'}); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'EDIT_EXPENSE', 
        id: '1234abc', 
        updates: {note: 'new note value'}
    })
})

test('Setup Add Expense action object', () => {
    const expenseData = {
        description: 'RENT', note: 'note', amount: 5500, createdAt: 101
    }
    const action = addExpense(expenseData); 
    expect(action).toEqual({        // id field is unknown as this is generated each time;  use .any(String) for this field
        type: 'ADD_EXPENSE', 
        expense: {
            ...expenseData, 
            id: expect.any(String)
        }
    })
})

test('Setup Add Expense with no data', () => {
    const action = addExpense(); 
    expect(action).toEqual({        // id field is unknown as this is generated each time;  use .any(String) for this field
        type: 'ADD_EXPENSE', 
        expense: {
            description: '', 
            note: '', 
            amount: 0, 
            createdAt: 0, 
            id: expect.any(String)
        }
    })
})