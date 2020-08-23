// where we will connect to the database;  note: earlier notes saved to 152_firebase.js & removed here  
import * as firebase from 'firebase';  // * as takes all named exports from firebase & dumps into var 'firebase' (this is recommended by fb) 
  
/*  note:  the rest of this copied from firebase.google.com (Project Overview -> register app to web) */
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//    appId: "1:329779578596:web:a6083b464b7007e1b9cef1",
//    measurementId: "G-VB6FWRDVJ4"
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase

const database = firebase.database();  
// more info for auth setup at firebase.google.com/docs/
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();   // setting up to authenticate with Google (could do similar for Github, etc)

export { firebase, googleAuthProvider, database as default }
