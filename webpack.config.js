'use strict';

let path = require('path'),
    env;
const args = require('minimist')(process.argv.slice(2));

// list of allowed environments
const allowedEnvs = ['dev', 'production'];

// Set the correct environment
if(args._.length > 0 && args._.indexOf('start') !== -1) {
    env = 'test';
} else if (args.env) {
    env = args.env;
} else {
    env = 'dev';
}

process.env.NODE_ENV = env;

console.log(`Running ${env} environment`);

let configs = {
    base: require(path.join(__dirname, 'configs/base')),
    dev:  require(path.join(__dirname, 'configs/dev')),
    production:  require(path.join(__dirname, 'configs/production'))
};

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
    let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
    let validEnv = isValid ? wantedEnv : 'dev';
    return configs[validEnv];
}


module.exports = buildConfig(env);