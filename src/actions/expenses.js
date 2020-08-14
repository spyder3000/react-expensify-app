import uuid from 'uuid'

// action generators for expenses

// ADD_EXPENSE action generator
export const addExpense = ( {description='', note='', amount=0, createdAt = 0} = {} ) => ({    // destructuring the args; default vals; {} if no object
    type: 'ADD_EXPENSE', 
    expense:  {
        id: uuid(), 
        description, 
        note, 
        amount, 
        createdAt
    }
});

// REMOVE_EXPENSE action generator
export const removeExpense = ( {id } = {} ) => ({    // destructuring the args; default vals; {} if no object;  implicity returns object via {{...})
    type: 'REMOVE_EXPENSE', 
    id
});

// EDIT_EXPENSE action generator
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE', 
    id, 
    updates
})