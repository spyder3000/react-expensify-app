import authReducer from '../../reducers/auth'; 
// import expenses from '../fixtures/expenses'

test('Should Set uid for Login', () => {
    const action = { type: 'LOGIN', uid: 'abc123' }; 
    const state = authReducer({}, action);  // pass data thru reducer
    expect(state.uid).toBe(action.uid);     // use .toBe to compare values;  use .toEqual for objects
}); 
test('Should clear uid for logout', () => {
    const action = { type: 'LOGOUT' }
    const state = authReducer({uid: 'anything'}, action);   
    expect(state).toEqual({}); 
}); 