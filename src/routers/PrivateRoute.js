import React from 'react'; 
import { connect } from 'react-redux'; 
import { Route, Redirect } from 'react-router-dom'; 
import Header from '../components/Header'; 

// export const PrivateRoute = (props) => (     // implicitly return JSX
//     <Route {...props}/>     // this will create the same <Route> that was found on AppRouter.js;  
// ); 

export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,   // renames to upper-case Component as we will be rendering this later
    ...rest     // ...rest (can also be ...abc - name not important) gets the rest of the props not specified (e.g. path, exact, etc )
}) => (     // implicitly return JSX
    <Route {...rest} component={(props) => (  // props is all the data passed to <Route>
      isAuthenticated ? (
        <div>
            <Header /> 
            {/* ...props corresponds to just the props on component element? -- e.g. component={AddExpensePage} on AppRouter.js */}
            <Component {...props}/>  
        </div>
       ) : (
        <Redirect to="/" />
      ) 
    )} />     // this will create the same <Route> that was found on AppRouter.js;  
); 

// need to grab some values to see if user is authenticated or not  
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid     // !! will flip to boolean;  undefined will = false, uid will be true
})

export default connect(mapStateToProps)(PrivateRoute); 