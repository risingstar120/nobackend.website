var path = require('path');
var args = require('yargs').argv;

var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// parameters
var isProd = args.prod;

module.exports = {
  devtools: 'inline-source-map',
  entry: {
    app: ['webpack/hot/dev-server', './app/app.js'],
    vendor: [
      // angular
      'angular',
      'angular-ui-router',
      'angular-route',
      'angular-new-router',
      'angular-sanitize',
      'angular-animate',

      // 3rd dependencies
      'ng-fx',
      'angular-cache',
      'angular-marked',
      'angularUtils-disqus',
      'angular-loading-bar',
      'angular-socialshare',
      'angular.audio',
      'angular-ui-awesome',
      'angulartics',
      'angulartics-google-analytics',
      'js-yaml/lib/js-yaml.js',
      'lowdb',
      'lowdb/browser',
      'to-markdown'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'ng-annotate?add=true!babel?presets[]=es2015'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less')},
      {test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/, loader: 'url?limit=100000&name=./fonts/[name].[ext]'},
      {test: /\.(png|jpe?g|gif)$/, loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'},
      {test: /\.html$/, loader: 'ngtemplate!html?attrs[]=img:src img:ng-src'}
    ],
    noParse: []
  },
  postcss: function () {
    return [precss, autoprefixer];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      'react': './pages/build/react'
    },
    modulesDirectories: ['node_modules', 'assets/libraries']
  }
};