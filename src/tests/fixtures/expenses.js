import moment from 'moment'; 

export default [
    { id: '1', description: 'Gum', note: '', amount: 195, createdAt: 0 }, 
    { id: '2', description: 'Yahtzee', note: '', amount: 5000, createdAt: moment(0).subtract(4, 'days').valueOf() }, 
    { id: '3', description: 'Book Three', note: 'test note', amount: 4500, createdAt: moment(0).add(4, 'days').valueOf() } 
]