'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {

  env = env || {};

  const MIN = process.argv.indexOf('-p') > -1;
  let cssFilename, jsFilename;
  jsFilename = cssFilename = 'angular-bootstrap-calendar';
  if (!env.excludeTemplates) {
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

  const config = {
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
    devtool: MIN ? 'source-map' : false,
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
        test: /.*\.js$/,
        loader: 'ng-annotate-loader',
        exclude: /node_modules/
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }, {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!less-loader?sourceMap'
        }),
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.BannerPlugin({
        banner: getBanner(),
        raw: true,
        entryOnly: true
      }),
      new ExtractTextPlugin('../css/' + cssFilename),
      new webpack.DefinePlugin({
        EXCLUDE_TEMPLATES: !!env.excludeTemplates
      })
    ]
  };

  if (env.excludeTemplates) {
    config.plugins.push(new webpack.IgnorePlugin(/templates\/(.+)\.html$/));
  }

  return config;

};