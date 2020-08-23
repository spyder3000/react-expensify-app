import React from 'react'; 
import { connect } from 'react-redux'; 
import { Route, Redirect } from 'react-router-dom'; 
import Header from '../components/Header'; 

export const PublicRoute = ({
    isAuthenticated, 
    component: Component,   // renames to upper-case Component as we will be rendering this later
    ...rest     // ...rest (can also be ...abc - name not important) gets the rest of the props not specified (e.g. path, exact, etc )
}) => (     // implicitly return JSX
    <Route {...rest} component={(props) => (  // props is all the data passed to <Route>
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : ( 
            <Component {...props}/>  // ...props corresponds to just the props on component element? -- e.g. component={AddExpensePage} on AppRouter.js */}
      ) 
    )} />     
); 

// need to grab some values to see if user is authenticated or not  
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid     // !! will flip to boolean;  undefined will = false, uid will be true
})

export default connect(mapStateToProps)(PublicRoute); 