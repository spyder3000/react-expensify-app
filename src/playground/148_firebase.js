// where we will connect to the database

import * as firebase from 'firebase';  // * as takes all named exports from firebase & dumps into var 'firebase' (this is recommended by fb) 
  
/*  note:  the rest of this copied from firebase.google.com (Project Overview -> register app to web) */
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD38e36rMdjh9RMugfHIDBRAlJ1RzLA-vk",
    authDomain: "expensify-9f0dc.firebaseapp.com",
    databaseURL: "https://expensify-9f0dc.firebaseio.com",
    projectId: "expensify-9f0dc",
    storageBucket: "expensify-9f0dc.appspot.com",
    messagingSenderId: "329779578596",
    appId: "1:329779578596:web:a6083b464b7007e1b9cef1",
    measurementId: "G-VB6FWRDVJ4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();  

// set does not need to take an object;  it can also take a string;  it will overwrite what's already there
database.ref().set({  // .ref() w/ no param gets reference to the root of our database;
    name: 'Jack Vardy', 
    age: 51, 
    stressLevel: 7, 
    job: {
        title: 'programmer', 
        company: 'Google'
    }, 
    location: {
        city: 'Charlotte', 
        country: 'United States'
    }
}).then(() => {
    console.log('Data is saved!!'); 
}).catch((e) => {
    console.log('ERROR - ', e); 
});  

database.ref().update({
    stressLevel: 9, 
    'job/company': 'Amazon', 
    'location/city': 'Seattle'
})

// database.ref().update({   // .update() only updates at root level;  need to specify city & country if updating location OR use diff syntax
//     age: 43, 
//     //location: {  city: 'Boston' }
//     'location/city': 'Chicago'   // must put in single quotes because of the forward slash 
// })

// database.ref('isSingle').set(null);  // the same as using .remove() from below 

// firebase.database().ref('isSingle')      // use .ref() to delete entire database
//     .remove()       
//     .then(() => {
//         console.log("Remove succeeded.")
//     })
//     .catch((error) =>  {
//         console.log("Remove failed: " + error.message)
//     });
