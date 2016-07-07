'use strict';

let path = require('path');
const PATHS = {
    app: path.join(__dirname, './src'),
};
var coverage;
var reporters;
if (process.env.CONTINUOUS_INTEGRATION) {
  coverage = {
    type: 'lcov',
    dir: 'coverage/'
  };
  reporters = ['coverage', 'coveralls'];
}
else {
  coverage = {
    type: 'html',
    dir: 'coverage/'
  };
  reporters = ['progress', 'coverage'];
}
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/selectToggle.js'
        ],

        preprocessors: {
            // add webpack as preprocessor
            // 'src/**/*.js': ['webpack', 'coverage'],
            'test/**/*.js': ['webpack', 'coverage']
        },

        // optionally, configure the reporter
        coverageReporter: coverage,

        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                // *optional* babel options: isparta will use it as well as babel-loader
                babel: {
                    presets: ['es2015', 'stage-1', 'react']
                },
                // *optional* isparta options: istanbul behind isparta will use it
                isparta: {
                    embedSource: true,
                    noAutoWrap: true,
                    // these babel options will be passed only to isparta and not to babel-loader
                    babel: {
                        presets: ['es2015', 'stage-1', 'react']
                    }
                },
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: path.resolve(__dirname, 'node_modules'),
                    loader: 'babel-loader',
                    query: {
                        presets: ['airbnb', 'es2015', 'react', 'stage-1']
                    }
                }, {
                    test: /\.js$/,
                    include: path.resolve('app'),
                    loader: 'isparta'
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
                }]
            },
            resolve: {
                alias: {
                    app: PATHS.app
                }
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
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
            'karma-coverage',
            'karma-coveralls'
        ],

        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        },
        // coverage reporter generates the coverage
        reporters: reporters,
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    })
};
