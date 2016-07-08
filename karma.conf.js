'use strict';
/* eslint-disable */

var webpack = require('webpack');

// let path = require('path');
// const PATHS = {
//     app: path.join(__dirname, './src'),
// };

// var coverage;
// var reporters;
// if (process.env.CONTINUOUS_INTEGRATION) {
//     coverage = {
//         type: 'lcov',
//         dir: 'coverage/'
//     };
//     reporters = ['coverage', 'coveralls'];
// } else {
//     coverage = {
//         type: 'html',
//         dir: 'coverage/'
//     };
//     reporters = ['progress', 'coverage'];
// }

// module.exports = function(config) {
//     config.set({
//         browsers: ['Firefox'],
//         browserNoActivityTimeout: 30000,
//         frameworks: ['jasmine'],
//         files: [
//             './test/**/*.js'
//         ],
//         preprocessors: {
//             './src/components/SwitchToggle/SwitchToggle.js': ['webpack', 'sourcemap', 'coverage'],
//         },
//         reporters: reporters,
//         coverageReporter: coverage,
//         webpack: {
//             devtool: 'inline-source-map',
//             module: {
//                 loaders: [
//                     // TODO: fix sourcemaps
//                     // see: https://github.com/deepsweet/isparta-loader/issues/1
//                     {
//                         test: /\.js$|.jsx$/,
//                         loader: 'babel',
//                         query: {
//                             presets: ['es2015', 'react', 'stage-1']
//                         },
//                         exclude: /node_modules/
//                     }, {
//                         test: /\.js$|.jsx$/,
//                         loader: 'isparta?{babel: {stage: 1}}',
//                         include: path.resolve('app'),
//                         exclude: /node_modules|test|utils/
//                     }, {
//                         test: /\.json$/,
//                         loader: 'json',
//                     }, {
//                         test: /\.html/,
//                         loader: 'html'
//                     }, {
//                         test: /\.css$/,
//                         loader: 'style-loader!css-loader!postcss-loader'
//                     }, {
//                         test: /\.sass/,
//                         loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
//                     }, {
//                         test: /\.scss/,
//                         loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
//                     }
//                 ]
//             },
//             plugins: [
//                 'karma-webpack',
//                 'karma-jasmine',
//                 'karma-sourcemap-loader',
//                 'karma-chrome-launcher',
//                 'karma-firefox-launcher',
//                 'karma-phantomjs-launcher',
//                 'karma-coverage'
//             ],
//             babelPreprocessor: {
//                 options: {
//                     presets: ['airbnb']
//                 }
//             },
//             resolve: {
//                 extensions: ['', '.js', '.jsx'],
//                 modulesDirectories: ['node_modules', 'src'],
//                 alias: {
//                     app: PATHS.app
//                 }
//             },
//             externals: {
//                 'react/lib/ExecutionEnvironment': true,
//                 'react/lib/ReactContext': 'window',
//                 'cheerio': 'window',
//                 'react/addons': true, // important!!
//             }
//         },
//         webpackServer: {
//             noInfo: true
//         }
//     });
// };

let path = require('path');
const PATHS = {
    app: path.join(__dirname, './src'),
};

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/**/*.js',
            'test/**/*.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.js': ['webpack', 'sourcemap', 'coverage'],
            'test/**/*.js': ['webpack', 'sourcemap', 'coverage']
        },

        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: path.resolve(__dirname, 'node_modules'),
                    query: {
                        presets: ['airbnb', 'es2015', 'react', 'stage-1']
                    }
                }, {
                    test: /\.js$|.jsx$/,
                    loader: 'isparta?{babel: {stage: 1}}',
                    include: path.resolve('app'),
                    exclude: /node_modules|test|utils/
                }, {
                    test: /\.json$/,
                    loader: 'json',
                }, {
                    test: /\.json$/,
                    loader: 'json',
                }, {
                    test: /\.scss/,
                    loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
                }]
            },
            resolve: {
                alias: {
                    app: PATHS.app
                }
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'cheerio': 'window',
                'react/addons': true, // important!!
            }
        },

        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],


        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};
