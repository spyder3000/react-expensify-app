// this is a node script
const path = require('path');   // 'path' is a built-in node function
const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');   // node uses require (instead of import)

 // NODE_ENV will be 'Production' if from Heroku, 'Test' if from package.json "test" or 'development' as default;  
process.env.NODE_ENV = process.env.NODE_ENV || 'development';   

// Specify Environment vars for Test & Dev;  dotenv installed via yarn - loads environment variables from a .env file into process.env
// Note: these vars do not get passed to client-side JS (would be security issue), so need to manually pass these thru (see plugins below);  
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'  }); 
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' }); 
}

// more info on this at webpack.js.org/configuration/configuration-types  
module.exports = (env) => {
    const isProduction = env === 'production'; 
    const CSSExtract = new ExtractTextPlugin('styles.css'); // the file we want to save the css in 

    //console.log('env', env);  
    return {
        //entry: './src/app.js', 
        //entry: './src/playground/destructuring.js',
        entry: ['babel-polyfill', './src/app.js'],  
        output: {
            path: path.join(__dirname, 'public', 'dist'),       // needs to be an absolute path
            filename: 'bundle.js'
        }, 
        module: {
            rules: [{
                loader: 'babel-loader', 
                test: /\.js$/,               // checks file ends in .js 
                exclude: /node_modules/     // do NOT run babel through the files in node_modules 
            }, {
                test: /\.s?css$/,       // checks for .scss & .css files 
                use: CSSExtract.extract({       // tells weback when you see this stuff, extract it
                    use: [{loader: 'css-loader', options: {sourceMap: true}  }, 
                          {loader: 'sass-loader', options: {sourceMap: true} } 
                         ]
                })
                // use: [
                //     'style-loader', 
                //     'css-loader', 
                //     'sass-loader'
                // ]      
            }]
        }, 
        plugins: [
            CSSExtract, 
            new webpack.DefinePlugin({  // will let us manually pass through Env vars to Client-side JS 
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY), 
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN), 
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL), 
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID), 
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET), 
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID) 
            })
        ],
        // source-map takes a lot more time to build (is external file), but much smaller;  
        devtool: isProduction ? 'source-map' : 'inline-source-map',  // 'cheap-module-eval-source-map',    
        devServer: {
            contentBase: path.join(__dirname, 'public'),  // config Webpack Dev server w/ path to public folder;  
            historyApiFallback: true, 
            publicPath: '/dist/'
        }
    }
}

//console.log(path.join(__dirname, 'public'));   // see this via cmd >node webpack.config.js;  then use below in path var;  
                            //  e.g. C:\2020-edu\react\react_udemy\indecision-app\public
