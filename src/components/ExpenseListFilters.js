import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';  // import all action creators

// ch 110 -- replace stateless component w/ class-based component;  all props are this.props now   
export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null   
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);   // call both actions
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {    // simple function to change calendarFocused to new value
    this.setState(() => ({ calendarFocused }));   // shorthand for calendarFocused: calendarFocused 
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  render() {
    return (  // returns JSX 
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}   /* adds button to reset/clear dates */
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({    // implicitly returns object;  same as => { return {... } }
  setTextFilter: (text) => dispatch(setTextFilter(text)),   // dispatches action 'setTextFilter' w/ param of 'text' 
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);  // mapStateToProps to get us current data from state
