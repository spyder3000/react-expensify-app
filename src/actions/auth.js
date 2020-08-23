import { firebase, googleAuthProvider } from '../firebase/firebase'; 

export const login = (uid) => ({    // implicit return of object 
    type: 'LOGIN', 
    uid: uid
})

export const startLogin = () => {
    // async function
    return () => {
        // to sign in to your google acct & to have login screen as popup;  return to return the promise chain that others can attach to it 
        return firebase.auth().signInWithPopup(googleAuthProvider);  
    }
}

export const logout = () => ({    // implicit return of object 
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut(); 
    }
}