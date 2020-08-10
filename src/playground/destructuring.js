/* ARRAY Destructuring */

const address = ['100 E Main Street', 'McAdenville', 'NC', '28270']; 
//const [street, city, state, zip] = address;   // matching by position
const [,city,state ] = address;   // same as above, just omitting the ones we don't need

console.log(`You are in ${address[1]} ${address[2]}`); 
console.log(`You are in ${city} ${state}`); 

const address2 = []; 
const [, , state2 = 'Alaska'] = address2; 
console.log(`You are in ${state2}`)

const item = ['coffee (hot)', '$1.50', '$2.50', '$3.00'];   // item & 3 prices
const [itemName, sm_price, med_price, lg_price] = item; 
//const [itemName, , med_price ] = item;   // same as above
console.log(`A medium ${itemName} costs ${med_price}`)

/* OBJECT Destructuting */
// const person = {
//     name: 'Jack', 
//     age: 41, 
//     location: {
//         city: 'Charlotte', 
//         temp: 90
//     }
// }

// // ES6 destructuring;  
// const {name = 'Anonymous', age} = person; 
// const {city, temp: temperature} = person.location; 

// console.log(`${person.name} is ${person.age}`); 
// console.log(`${name} is ${age}`);   // same as above

// console.log(`It's ${temperature} in ${city}`)

// const book = {
//     title: 'Cloud Atlas', 
//     author: 'David Mitchell', 
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published' } = book.publisher;   // rename var w/ default value if undefined
// console.log(publisherName); 

