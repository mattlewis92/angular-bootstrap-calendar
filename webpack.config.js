var open = require('open');
var karma = require('karma');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PORT = 8000;

open('http://localhost:' + PORT);

karma.server.start({
  configFile: __dirname + '/karma.conf.js',
  autoWatch: true,
  singleRun: false
});

module.exports = {
  entry: __dirname + '/src/entry.js',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'angular-bootstrap-calendar.js'
  },
  module: {
    preLoaders: [{
      test: /.*\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!less?sourceMap'),
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html',
      exclude: /node_modules/
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
