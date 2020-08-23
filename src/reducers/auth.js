export default (state = {}, action) => {       // default is empty object (e.g. logged out);  action is action being dispatched
    switch (action.type) {
        case 'LOGIN': 
            return {
                uid: action.uid
            }
        case 'LOGOUT': 
            return {}; 
        default: 
            return state;  
    }
}