import React from 'react';   // using ES6 syntax for React;  
import ReactDOM from 'react-dom'; 
import AppRouter from './routers/AppRouter'; 
import './styles/styles.scss'; 
import 'normalize.css/normalize.css';   // found in node_modules folder

ReactDOM.render(<AppRouter />, document.getElementById('app'))   // 1st param is JSX to render;  2nd is location -- e.g. 'app' on index.html;  
