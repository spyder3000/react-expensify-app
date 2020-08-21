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

firebase.initializeApp(firebaseConfig); // Initialize Firebase

const database = firebase.database();  

// Part 2 -- child_removed 
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val()); 
})
// Part 2b -- child_changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val()); 
})
// Part 2c -- child_added;  will fire one time for all data currently at location;  & will re-run for all new expenses
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val()); 
})

//  Try 1 -- create an array from database info using .once() & childSnapshot;  
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {       // firebase documenation has more info on .val() & .foreach()
//         const expenses = []; 
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({   //  basically creating an array by iterating over the Child snapshots;  .key is randomly generated id
//                 id: childSnapshot.key, 
//                 ...childSnapshot.val()  
//             })
//         });    
//         console.log(expenses); 
//     }); 

//  Try 2 -- create an array from database info using .on() & childSnapshot;  //.on() to have the server notify us of changes 
// const onValueChange2 = database.ref('expenses')
//     .on('value', (snapshot) => {        // 2nd param is success handler 
//         const expenses = []; 
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({   //  basically creating an array by iterating over the Child snapshots;  .key is randomly generated id
//                 id: childSnapshot.key, 
//                 ...childSnapshot.val()  
//             })
//         });   
//         console.log(expenses); 
//     }, (e) => {
//         console.log('Error with data fetching', e); 
// });     

// Hardcoded add of 1 to 3 expenses 
database.ref('expenses').push({
    description: 'Mortgage', 
    note: 'Due on 1st of month', 
    amount: 50000,
    createdAt: 50000 
});  
  


// database.ref('notes/-MF3k841EeZ1IvrSLuGn').update({
//     body: 'Body text modified2'
// })
// database.ref('notes/MF3k841EeZ1IvrSLuGn').remove(); 
// for .push() firebase will create a new property w/ random value & will set whatever we push as a child to this random property  
// database.ref('notes').push({
//     title: 'Clean fridge', 
//     body: 'This is my to do note'
// })   

// const firebaseNotes = {
//     notes: {
//         asfsda : {      // unique identifier  ;  array stuff goes in next level
//             title: 'First note', 
//             body: 'This is my note'
//         }, 
//         fdasdas : {
//             title: 'Second note', 
//             body: 'This is my (2nd) note'            
//         }
//     }
// }
// const notes = [{
//     id: '12', 
//     title: 'First note', 
//     body: 'This is my note'
// }, {
//     id: '700', 
//     title: 'Second note', 
//     body: 'This is my (2nd) note'
// }]; 

// database.ref('notes').set(notes); 


// .once() -- to Fetch data from entire database  
// database.ref()        // .ref() gets entire database;  .ref('location') gets just location;  .once() returns a promise
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);  
//     })
//     .catch((e) => {
//         console.log('Error fetching data', e); 
//     })

// .on() to have the server notify us of changes 
// const onValueChange2 = database.ref().on('value', (snapshot) => {
//     const val = snapshot.val(); 
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`); 
// }, (e) => {
//     console.log('Error with data fetching', e); 
// }); 

// setTimeout(() => {
//     database.ref('name').set('Oreo');   // or for this test, we could just change on Firebase 
// }, 3500)

// To have the server notify us of changes use .on()
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val()); 
// }, (e) => {
//     console.log('Error with data fetching', e); 
// }); 

// // const onValueChange = (snapshot) => {
// //     console.log(snapshot.val()); 
// // }
// // database.ref().on('value', onValueChange); 

// setTimeout(() => {
//     database.ref('age').set(38); 
// }, 3500)

// unsubscribe via .off();  .off() will remove all subscriptions;  this removes just the one;
// setTimeout(() => {
//     database.ref().off(onValueChange);     
// }, 7000)

// setTimeout(() => {
//     database.ref('age').set(58);    // database still changes, but no longer subscribed, so no console update;  
// }, 10500)

// // set does not need to take an object;  it can also take a string;  it will overwrite what's already there
// database.ref().set({  // .ref() w/ no param gets reference to the root of our database;
//     name: 'Jack Vardy', 
//     age: 51, 
//     stressLevel: 7, 
//     job: {
//         title: 'programmer', 
//         company: 'Google'
//     }, 
//     location: {
//         city: 'Charlotte', 
//         country: 'United States'
//     }
// }).then(() => {
//     console.log('Data is saved!!'); 
// }).catch((e) => {
//     console.log('ERROR - ', e); 
// });  

// database.ref().update({
//     stressLevel: 9, 
//     'job/company': 'Amazon', 
//     'location/city': 'Seattle'
// })

// // database.ref('isSingle').set(null);  // the same as using .remove() from below 

// // firebase.database().ref('isSingle')      // use .ref() to delete entire database
// //     .remove()       
// //     .then(() => {
// //         console.log("Remove succeeded.")
// //     })
// //     .catch((error) =>  {
// //         console.log("Remove failed: " + error.message)
// //     });
