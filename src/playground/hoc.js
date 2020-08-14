// Higher Order Component (HOC) a component (HOC) that renders another component (regular component) 
//    Goals: Reuse code, Render hijacking, Prop manipulation, Abstract state

import React from 'react'; 
import ReactDOM from 'react-dom'; 

// Info in this example is a regular component;  
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
); 

// A regular function -- Add an Admin msg 
const withAdminWarning = (WrappedComponent) => {   // a regular function that will get called with the regular component we want to wrap
    return (props) => (   // props here comes from the info= prop on HOC <AdminInfo>
        <div>
            { props.isAdmin && <p>This is Private Info.  Please do NOT share. </p> }   {/* conditional display */}
            <WrappedComponent {...props}/>   {/* ...props allows us to pass props to child component; {} to instantiate a JSX 
                                                takes every key/value pair on this object & passes them down as props  */}
        </div>
    )
};

// A regular function
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>You are not authorized for this screen </p>) }
        </div>
    )
}

// AdminInfo is the HOC -- what we get back from withAdminWarning, which is an alternate component --  
const AdminInfo = withAdminWarning(Info);  // Info is the component we want to wrap;  
const AuthInfo = requireAuthentication(Info); 

//ReactDOM.render(<Info info="these are the details" />, document.getElementById('app')); 
//ReactDOM.render(<AdminInfo isAdmin={true} info="these are the details" />, document.getElementById('app')); 
ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the details" />, document.getElementById('app')); 
