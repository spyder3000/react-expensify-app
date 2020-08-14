// this is a node script
const path = require('path');   // 'path' is a built-in node function

//console.log(path.join(__dirname, 'public'));   // see this via cmd >node webpack.config.js;  then use below in path var;  
                            //  e.g. C:\2020-edu\react\react_udemy\indecision-app\public

module.exports = {
    //entry: './src/app.js', 
    //entry: './src/playground/destructuring.js',
    entry: './src/app.js',  
    output: {
        path: path.join(__dirname, 'public'),       // needs to be an absolute path
        filename: 'bundle.js'
    }, 
    module: {
        rules: [{
            loader: 'babel-loader', 
            test: /\.js$/,               // checks file ends in .js 
            exclude: /node_modules/     // do NOT run babel through the files in node_modules 
        }, {
            test: /\.s?css$/,       // checks for .scss & .css files 
            use: [
                'style-loader', 
                'css-loader', 
                'sass-loader'
            ]      
        }]
    }, 
    devtool: 'cheap-module-eval-source-map', 
    devServer: {
        contentBase: path.join(__dirname, 'public'),  // config Webpack Dev server w/ path to public folder;  
        historyApiFallback: true 
    }
}; 