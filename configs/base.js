'use strict';

let webpack = require('webpack'),
    path = require('path');

const PATHS = {
    app: path.join(__dirname, '/../dist'),
    build: path.join(__dirname, '/../dist'),
    srcPath: path.join(__dirname, '/../src')
};

const CONFIGS = {
    preLoaders: [{
        test: /\.(js)$/,
        include: PATHS.srcPath,
        loader: 'eslint-loader'
    }],
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-1']
            }
        },
        {
            test: /\.html/, loader: 'html'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        },
        {
            test: /\.sass/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        },
        {
            test: /\.scss/,
            loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
        },
        {
            test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
            loader: 'url-loader?limit=8192'
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }
    ],
    extensions: [
        '',
        '.js',
        '.jsx'
    ],
    port: 8000,
    publicPath: '/assets/'
}

module.exports = {
    context: __dirname,
    port: CONFIGS.port,
    devServer: {
        port: CONFIGS.port,
        stats: { colors: true },
        publicPath: CONFIGS.publicPath,
    },
    entry: {
        app: '../src/index.js'
    },
    output: {
        path: PATHS.build,
        sourceMapFilename: './main.js.map',
        filename: 'main.js'
    },
    module: {
        loaders: CONFIGS.loaders
    },
    resolve: {
        extensions: CONFIGS.extensions,
        alias: {
            root: PATHS.srcPath,
            app: PATHS.srcPath,
            components: PATHS.srcPath + '/components/'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ]
}
