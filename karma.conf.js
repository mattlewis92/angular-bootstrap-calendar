'use strict';

var webpack = require('webpack');

module.exports = function(config) {

  var webpackConfig = {
    cache: true,
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }, {
        test: /\.html$/,
        loader: 'htmlhint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }, {
        test: /\.less/,
        loader: 'null-loader',
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        exclude: /(test|node_modules)/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post'
      }]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        EXCLUDE_TEMPLATES: false
      })
    ]
  };

  if (config.singleRun) {
    webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai', 'chai-things'],

    // list of files / patterns to load in the browser
    files: [
      'test/unit/entry.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/unit/entry.js': ['webpack', 'sourcemap']
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html',
        subdir: 'html'
      }, {
        type: 'lcovonly',
        subdir: '.'
      }]
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS']
  });
};
