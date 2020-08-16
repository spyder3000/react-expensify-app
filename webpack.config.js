// this is a node script
const path = require('path');   // 'path' is a built-in node function
const ExtractTextPlugin = require('extract-text-webpack-plugin');   // node uses require (instead of import)

// more info on this at webpack.js.org/configuration/configuration-types  
module.exports = (env) => {
    const isProduction = env === 'production'; 
    const CSSExtract = new ExtractTextPlugin('styles.css'); 

    //console.log('env', env);  
    return {
        //entry: './src/app.js', 
        //entry: './src/playground/destructuring.js',
        entry: './src/app.js',  
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
            CSSExtract
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
