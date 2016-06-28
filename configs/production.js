'use strict';

let baseConfig = require('./base'),
    webpack = require('webpack');

let config = Object.assign({}, baseConfig, {
    cache: false,
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ],
});


module.exports = config;
