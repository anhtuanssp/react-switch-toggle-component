'use strict';

let baseConfig = require('./base');

let config = Object.assign({}, baseConfig, {
    cache: false,
    debug: true,
    devtool: 'inline-source-map',
    outputPathinfo: true,
    watch: true
});

module.exports = config;
