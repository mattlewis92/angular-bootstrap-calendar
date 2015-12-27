'use strict';

const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: __dirname + '/src/entry.js',
  devtool: 'eval',
  output: {
    filename: 'angular-bootstrap-calendar.js'
  },
  module: {
    preLoaders: [{
      test: /.*\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'htmlhint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.less$/,
      loader: 'style!css!less',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html',
      exclude: /node_modules/
    }]
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      EXCLUDE_TEMPLATES: false
    })
  ]
};
