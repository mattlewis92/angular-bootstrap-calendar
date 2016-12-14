'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const EXCLUDE_TEMPLATES = process.argv.indexOf('--exclude-templates') > -1;
const MIN = process.argv.indexOf('-p') > -1;
let cssFilename, jsFilename;
jsFilename = cssFilename = 'angular-bootstrap-calendar';
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
  const pkg = require('./package.json');
  return `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 */
 `.trim();
}

module.exports = {
  entry: __dirname + '/src/entry.js',
  output: {
    path: __dirname + '/dist/js',
    filename: jsFilename,
    libraryTarget: 'umd',
    library: 'angularBootstrapCalendarModuleName'
  },
  externals: {
    angular: 'angular',
    moment: 'moment',
    'interactjs': {
      root: 'interact',
      commonjs: 'interactjs',
      commonjs2: 'interactjs',
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
    new ExtractTextPlugin('../css/' + cssFilename),
    new webpack.DefinePlugin({
      EXCLUDE_TEMPLATES: EXCLUDE_TEMPLATES
    })
  ]
};

if (EXCLUDE_TEMPLATES) {
  module.exports.plugins.push(new webpack.IgnorePlugin(/templates\/(.+)\.html$/));
}
