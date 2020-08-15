import moment from 'moment'; 

const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 'date', 
    startDate: moment().startOf('month'),   // found in momentjs.com/docs -- look for manipulate & Start of Time / End of Time 
    endDate: moment().endOf('month')        //   sets defaults to start of month & end of month;  
}
const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': 
            // return state.concat(action.expense);  // note cannot use state.push as this changes array;  return .concat creates new array
            return {        // same as above but uses spread operator
            ...state,           // current object
            text: action.text   // add/update text property of this object
            };
        case 'SORT_BY_AMOUNT': 
            return {
                ...state, 
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE': 
            return {
                ...state, 
                sortBy: 'date'
            }   
        case 'SET_START_DATE': 
            return {
                ...state, 
                startDate: action.startDate
            }    
        case 'SET_END_DATE': 
            return {
                ...state, 
                endDate: action.endDate
            }                
        default: 
            return state; 
    }
}

export default filtersReducer;  