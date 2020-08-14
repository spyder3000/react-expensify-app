import React from 'react'; 
import { connect } from 'react-redux';  
import {DateRangePicker } from 'react-dates'; 
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate)); 
        this.props.dispatch(setEndDate(endDate)); 
    }
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))  // var indicates which datepicker of the 2 is the active one
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => {
                  this.props.dispatch(setTextFilter(e.target.value));  // updates Text filter with each key stroke AND refreshes display  
                  console.log(e.target.value);   
                }}/>
                <select 
                    value={this.props.filters.sortBy} onChange={(e) => {     // 'sortBy' defined in reducers/filters.js
                        if (e.target.value === 'date') {
                            this.props.dispatch(sortByDate(e.target.value))      // this will re-render ExpenseList.js w/ new sortBy
                        } else if (e.target.value ==='amount') {
                            this.props.dispatch(sortByAmount(e.target.value))
                        }
                        console.log(e.target.value + 'zzz =  ' ); 
                    }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                {/* see documentation at github.com/airbnb/react-dates for DateRangePicker */}
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates = {true}     // a button that allows you to clear the dates (shows All expenses)
                    numberOfMonths={1}  // just show 1 month calendar at a time
                    isOutsideRange={() => false}   // allow for previous dates to be selected
                />
            </div>
        );  
    }
}; 
// const ExpenseListFilters = (props) => (
//     <div>
//         <input type="text" value={props.filters.text} onChange={(e) => {
//           props.dispatch(setTextFilter(e.target.value));  // updates Text filter with each key stroke AND refreshes display  
//           console.log(e.target.value);   
//         }}/>
//         <select 
//             value={props.filters.sortBy} onChange={(e) => {     // 'sortBy' defined in reducers/filters.js
//                 if (e.target.value === 'date') {
//                     props.dispatch(sortByDate(e.target.value))      // this will re-render ExpenseList.js w/ new sortBy
//                 } else if (e.target.value ==='amount') {
//                     props.dispatch(sortByAmount(e.target.value))
//                 }
//                 console.log(e.target.value + 'zzz =  ' ); 
//             }}>
//             <option value="date">Date</option>
//             <option value="amount">Amount</option>
//         </select>
//         {/* see documentation at github.com/airbnb/react-dates for DateRangePicker */}
//         <DateRangePicker 
//         />
//     </div>
// ); 

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);  