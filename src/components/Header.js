import React from 'react';   // using ES6 syntax for React;  
import { NavLink } from 'react-router-dom'   // found on reacttraining.com site
import { connect } from 'react-redux'; 
import { startLogout } from '../actions/auth';  

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" activeClassName='is-active'>Dashboard</NavLink> 
        <NavLink to="/create" activeClassName='is-active'>Create Expense</NavLink> 
        <button onClick={startLogout}>Logout</button>
    </header>
); 

const mapDispatchToProps = (dispatch) => ({     // implicitly returns object via ({...}) 
    startLogout: () => dispatch(startLogout())
}); 

// modify to connected version to connect this to Redux;  
export default connect(undefined, mapDispatchToProps)(Header); 