import React from 'react';   // using ES6 syntax for React;  
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'   // found on reacttraining.com site
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage'; 
import AddExpensePage from '../components/AddExpensePage'; 
import EditExpensePage from '../components/EditExpensePage'; 
import Header from '../components/Header'; 
import HelpExpensePage from '../components/HelpPage'; 
import NotFoundPage from '../components/NotFoundPage'; 



const AppRouter = () => (   // this is JSX;  <Route /> includes 2 props -- path & component;  
    <BrowserRouter> 
        <div>   {/*  <div> needed if using more than one <Route />;  */}
            <Header /> 
            <Switch>     
                <Route path="/" component={ExpenseDashBoardPage} exact={true}/>   {/* will also match /create which is unwanted */}
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpExpensePage} />
                <Route component={NotFoundPage} />  
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter; 
