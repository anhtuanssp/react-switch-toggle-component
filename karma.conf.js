'use strict';

let path = require('path');
const PATHS = {
    app: path.join(__dirname, './src'),
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'tests.webpack.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'tests.webpack.js': ['webpack', 'sourcemap']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: path.resolve(__dirname, 'node_modules'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['airbnb', 'es2015', 'react', 'stage-1']
                    }
                }, {
                    test: /\.json$/,
                    loader: 'json',
                }, {
                    test: /\.html/,
                    loader: 'html'
                }, {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!postcss-loader'
                }, {
                    test: /\.sass/,
                    loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
                }, {
                    test: /\.scss/,
                    loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
                }, {
                    test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
                    loader: 'url-loader?limit=8192'
                }, {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }, {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }],
                postLoaders: [
                    { //delays coverage til after tests are run, fixing transpiled source coverage error
                        test: /\.js$/,
                        exclude: /(test|node_modules)\//,
                        loader: 'istanbul-instrumenter'
                    } 
                ]
            },
            resolve: {
                alias: {
                    app: PATHS.app
                }
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react/addons': true,
            }
        },

        webpackServer: {
            noInfo: true // please don't spam the console when running in karma!
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],

        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },

        // coverage reporter generates the coverage
        reporters: ['coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
    })
};
