var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv');

// Load environment variables from .env file
if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;

var config = {
  debug: process.env.NODE_ENV !== 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './app/main'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['babel-loader'] 
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
