// Note: to get this to run, we imported this module into app.js via import './playground/promises';  

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('This is my resolved data');   // can only resolve or reject a single thing (e.g. a string, object)
        resolve({
            name: 'oreo', 
            age: 7
        })
       // reject('Error message'); 
    }, 5000);   // 1.5 secs 
});  

console.log('before'); 

promise.then((data) => {
    console.log('1', data); 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise')  // can only resolve or reject a single thing (e.g. a string, object)
        }, 5000);   // 1.5 secs 
    });  
}).then((str) => {
    console.log('Does this run? ', str); 
}).catch((e) => {
    console.log('error: ', e); 
})


// promise.then((data) => {
//     console.log('1', data); 
//     return 'some data';     // passes data forard to next function 
// }).then((str) => {
//     console.log('Does this run? ', str); 
// }).catch((e) => {
//     console.log('error: ', e); 
// })

console.log('after');  

