import React from 'react';   // using ES6 syntax for React;  
import { connect } from 'react-redux'; 
import { startLogin } from '../actions/auth'; 

export const LoginPage = ({ startLogin }) => (   // destructured off of props (e.g. startLogin will = props.startLogin) from below
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

// const LoginPage = (props) => (   // props passed up from below
//     <div>
//         <button onClick={props.startLogin}>Login</button>
//     </div>
// );

const mapDispatchToProps = (dispatch) => ({ 
    startLogin: () => dispatch(startLogin())    // sets up function to dispatch startLogin()
})

export default connect(undefined, mapDispatchToProps)(LoginPage); 