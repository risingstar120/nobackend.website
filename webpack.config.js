var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    app: ['webpack/hot/dev-server', './app.js']
  },
  output: {
    path: './assets',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'ng-annotate?add=true!babel-loader'},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.less$/, loader: "style!css!less"},
      {test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader'},
      {test: /\.html$/, loader: 'raw'}
    ],
    noParse: [
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      'react': 'build/react'
    }
  }
};