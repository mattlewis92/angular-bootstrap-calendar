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
    rules: [{
      test: /.*\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.html$/,
      loader: 'htmlhint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html-loader',
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
