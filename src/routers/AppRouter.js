import React from 'react';   // using ES6 syntax for React;  
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom'   // found on reacttraining.com site
import createHistory from 'history/createBrowserHistory'; 

import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage'; 
import AddExpensePage from '../components/AddExpensePage'; 
import EditExpensePage from '../components/EditExpensePage'; 
import HelpExpensePage from '../components/HelpPage'; 
import NotFoundPage from '../components/NotFoundPage'; 
import LoginPage from '../components/LoginPage'; 
import PrivateRoute from './PrivateRoute'; 

export const history = createHistory(); 

const AppRouter = () => (   // this is JSX;  <Route /> includes 2 props -- path & component;  
    /* change from BrowserRouter which has a built-in history component to Router where we can provide our our history prop  */ 
    <Router history={history}> 
        <div>   {/*  <div> needed if using more than one <Route />;  */}
            <Switch>     
                <Route path="/" component={LoginPage} exact={true}/>   {/* need exact stmt so it doesnt match /create & others */}
                <PrivateRoute path="/dashboard" component={ExpenseDashBoardPage}/>   
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpExpensePage} />
                <Route component={NotFoundPage} />  
            </Switch>
        </div>
    </Router>
)

export default AppRouter; 
