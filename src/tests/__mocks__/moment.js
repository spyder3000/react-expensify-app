// cannot import moment or this would cause an endless loop;  .requireActual() needed for mock;  
const moment = require.requireActual('moment'); 

export default (timestamp = 0) => {
    return moment(timestamp);   
}