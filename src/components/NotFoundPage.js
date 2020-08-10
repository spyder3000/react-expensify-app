import React from 'react';   // using ES6 syntax for React;  
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
    <div>
        404!! <Link to='/'>Go Home</Link>   {/* Use <Link> for Client-side routing instead of <a> tag;  prevents full-page refresh;  */}
    </div>
); 

export default NotFoundPage; 
