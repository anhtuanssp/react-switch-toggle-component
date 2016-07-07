'use strict';
/* eslint-disable */

var webpack = require('webpack');
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
} else {
    coverage = {
        type: 'html',
        dir: 'coverage/'
    };
    reporters = ['progress', 'coverage'];
}

module.exports = function(config) {
    config.set({
        browsers: ['Firefox'],
        browserNoActivityTimeout: 30000,
        frameworks: ['jasmine'],
        files: [
            './test/**/*.js'
        ],
        preprocessors: {
            
            './src/components/SwitchToggle/SwitchToggle.js': ['coverage'],
            './test/**/*.js': ['webpack', 'sourcemap', 'coverage']
        },
        reporters: reporters,
        coverageReporter: coverage,
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    // TODO: fix sourcemaps
                    // see: https://github.com/deepsweet/isparta-loader/issues/1
                    {
                        test: /\.js$|.jsx$/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react', 'stage-1']
                        },
                        exclude: /node_modules/
                    }, {
                        test: /\.js$|.jsx$/,
                        loader: 'isparta?{babel: {stage: 1}}',
                        include: path.resolve('app'),
                        exclude: /node_modules|test|utils/
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
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        BROWSER: JSON.stringify(true),
                        NODE_ENV: JSON.stringify('test')
                    }
                })
            ],
            resolve: {
                extensions: ['', '.js', '.jsx'],
                modulesDirectories: ['node_modules', 'src'],
                alias: {
                    app: PATHS.app
                }
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'cheerio': 'window',
                'react/addons': true, // important!!
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
