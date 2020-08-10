import React from 'react';   // using ES6 syntax for React;  

const EditExpensePage = (props) => {
    console.log(props);  
    return (
        <div>Editing the expense with id of {props.match.params.id}</div>
    );
}; 

export default EditExpensePage; 

