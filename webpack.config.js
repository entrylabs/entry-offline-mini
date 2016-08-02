var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './app/src/app.js',
        init: './app/src/initializer.js',
        header: './app/src/header.js',
    },
    devtool: 'source-map',
    output: {
        path: path.resolve('./app/builds'),
        publicPath: './builds/',
        filename: '[name].js'
    },
    externals: [
        {'serialport': 'require("serialport")'},
        {'fstream': 'require("fstream")'},
        {'tar-fs': 'require("tar-fs")'},
    ],
    target: "electron",
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'  },
            { test: /\.(png|gif|jp?g|svg|woff|woff2|eot|ttf|cur)$/i, loader: 'url?limit=8192' },
            { 
                test: /\.js$/, 
                include:[
                    path.resolve(__dirname, 'app', 'src'),
                    path.resolve(__dirname, 'app', 'bower_components')
                ], 
                exclude:[
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'app', 'node_modules'),
                    /node_modules/
                ], 
                loader: 'babel-loader' 
            }
        ]
    }
}
