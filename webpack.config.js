var open = require('open');
var karma = require('karma');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PORT = 8000;

open('http://localhost:' + PORT);

karma.server.start({
  configFile: __dirname + '/karma.conf.js',
  autoWatch: true,
  singleRun: false
});

module.exports = {
  entry: {
    'angular-bootstrap-calendar': __dirname + '/src/entry.js',
    style: __dirname + '/src/less/calendar.less'
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js'
  },
  module: {
    preLoaders: [{
      test: /.*\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!less?sourceMap')
    }]
  },
  plugins: [
    new ExtractTextPlugin('angular-bootstrap-calendar.css')
  ],
  devServer: {
    port: PORT,
    inline: true
  }
};
