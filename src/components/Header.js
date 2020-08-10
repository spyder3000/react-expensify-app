import React from 'react';   // using ES6 syntax for React;  
import { NavLink } from 'react-router-dom'   // found on reacttraining.com site

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName='is-active' exact={true}>Dashboard</NavLink> 
        <NavLink to="/create" activeClassName='is-active'>Create Expense</NavLink> 
        <NavLink to="/help" activeClassName='is-active'>Help</NavLink> 
    </header>
)

export default Header; 