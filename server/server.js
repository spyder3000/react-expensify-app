// very basics of getting an Express server -- expressjs.com 
//  we will run this server from the command line

const path = require('path'); 
const express = require('express'); 
const app = express();   // app is an express application
const publicPath = path.join(__dirname, '..', 'public');  
const port = process.env.PORT || 3000; 

// express.static() will return a function
app.use(express.static(publicPath));   // use this to register some middleware (this gives access to public folder for Express app)

app.get('*', (req, res) => {     // '*' to match all unmatched routes;  this fixes 'Cannot GET /create' error of localhost:3000/create <Refresh> 
    res.sendFile(path.join(publicPath, 'index.html'));  // if asset requested is unavail, then send to index.html   
});        

app.listen(port, () => {        // can see this via localhost:3000  
    console.log('Server is Running'); 
}); 

