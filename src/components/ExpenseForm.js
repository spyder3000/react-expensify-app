import React from 'react'; 
import moment from 'moment'; 
import { SingleDatePicker } from 'react-dates';  
import 'react-dates/lib/css/_datepicker.css'; 

//const date = new Date();    // from core JS
const now = moment();   // returns an instance of moment (e.g. current time); 
//console.log(now);   // on Chrome console, click _proto_ to see all functions available for this
console.log(now.format('YYYY-MM-DD')); 
console.log(now.format('MMM Do, YYYY')); 

export default class ExpenseForm extends React.Component {
    /* goal is to track changes for all of these fields which will then be used upon button submit */ 
    constructor(props) {
        super(props); 
        this.state = {
            description: props.expense ? props.expense.description : '', 
            note: props.expense ? props.expense.note : '',  
            amount: props.expense ? (props.expense.amount / 100).toString() : '',    // convert from number (cents) to string w/ decimal
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(), 
            calendarFocused: false, 
            error: ''            
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value; 
        this.setState(() => ({ description })); 
    }
    onNoteChange = (e) => {
        const note = e.target.value; 
        this.setState(() => ({ note}));   // implicity return an object which sets note state to note variable
    }
    onAmountChange = (e) => {
        const amount = e.target.value; 
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {    // !amount allows user to clear value;  regex101.com to test regular expressions
            this.setState(() => ({ amount})); 
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {        // prevents user from being able to delete date;  
            this.setState(() => ({createdAt}))
        }
    }; 
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}))
    }; 

    onSubmit = ((e) => {
        e.preventDefault();  // to prevent full page refresh, handle w/ JS instead
        if (!this.state.description || !this.state.amount)  { // render error
            this.setState(() => ({ error: 'Please provide description and amount'}))
        }
        else {
            this.setState(() => ({ error: ''}))
            this.props.onSubmit({
                description: this.state.description, 
                amount: parseFloat(this.state.amount, 10) * 100,    // convert from string & from cents to dollar amt
                createdAt: this.state.createdAt.valueOf(),          // .valueOf() converts via momentjs.com Unix Timestamp documentation
                note: this.state.note
            })
        }
    })
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        //type="number"
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount} 
                        onChange={this.onAmountChange}
                    />
                    {/*  by default, SingleDatePicker only lets you choose current or future dates */}
                    <SingleDatePicker
                        date={this.state.createdAt} // momentPropTypes.momentObj or null
                        onDateChange={this.onDateChange} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                        numberOfMonths = {1}    // default is 2
                        isOutsideRange = {() => false }  // override here lets you choose dates in the past 
                        //id="your_unique_id" // PropTypes.string.isRequired,
                    />
                    <textarea  
                        placeholder="Add a note for your expense (optional)" 
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>

                </form>
            </div>
        )
    }
}