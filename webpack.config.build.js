var webpack = require('webpack');
var ejs = require('ejs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var EXCLUDE_TEMPLATES = process.argv.indexOf('--exclude-templates') > -1;
var MIN = process.argv.indexOf('-p') > -1;
var jsFilename = cssFilename = 'angular-bootstrap-calendar';
if (!EXCLUDE_TEMPLATES) {
  jsFilename += '-tpls';
}
if (MIN) {
  jsFilename += '.min';
  cssFilename += '.min';
}
jsFilename += '.js';
cssFilename += '.css';

function getBanner() {
  var pkg = require('./bower.json');
  var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');
  return ejs.render(banner, {pkg: pkg});
}

module.exports = {
  entry: __dirname + '/src/entry.js',
  output: {
    path: __dirname + '/dist/js',
    filename: jsFilename,
    libraryTarget: 'umd'
  },
  externals: {
    angular: 'angular',
    moment: 'moment',
    'interact.js': {
      root: 'interact',
      commonjs: 'interact.js',
      commonjs2: 'interact.js',
      amd: 'interact'
    }
  },
  devtool: MIN ? 'source-map' : null,
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
      test: /.*\.js$/,
      loaders: ['ng-annotate'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'html',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!less?sourceMap'),
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.BannerPlugin(getBanner(), {
      raw: true,
      entryOnly: true
    }),
    new ExtractTextPlugin('../css/' + cssFilename)
  ]
};

if (EXCLUDE_TEMPLATES) {
  module.exports.plugins.push(new webpack.IgnorePlugin(/templates\/(.+)\.html$/));
}
