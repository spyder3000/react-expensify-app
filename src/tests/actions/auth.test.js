import { login, logout } from '../../actions/auth'; 

test('Setup generate Login action object', () => {
    const uid = 'abc123'; 
    const action = login(uid); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'LOGIN', 
        uid: uid 
    })
})

test('Setup generate Logout action object', () => {
    const action = logout(); 
    //expect(action).toBe({       // .toBe() is equivalent of === so compare of objects & compare of arrays will fail
    expect(action).toEqual({        // use .toEqual() for objects or arrays, so it will compare each element contained in those
        type: 'LOGOUT'
    })
})

