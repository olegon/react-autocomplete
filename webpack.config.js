var path = require('path');
var webpack = require('webpack');

module.exports = { 
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
     
    module: {   
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }] 
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
