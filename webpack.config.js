var path = require('path');

module.exports = {
    entry: {
        app: './app/src/app.js',
    },
    devtool: 'source-map',
    output: {
        path: path.resolve('./app/builds'),
        publicPath: '/builds/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'  },
            { test: /\.css$/, loader: 'style-loader!css-loader'  },
            { test: /\.(png|gif|jp?g|svg|woff|woff2|eot|ttf|cur)$/i, loader: 'url?limit=8192' },
            { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
}
