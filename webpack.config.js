var path = require('path');
var webpack = require('webpack');

module.exports = { 
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },     
    module: {   
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }] 
    },
};
