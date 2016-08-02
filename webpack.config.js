var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://' + host + ':' + (port + 1),
    'webpack/hot/only-dev-server',
    './app/main'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + (port + 1) + '/js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'developement')
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ["react-hot"] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }]
          ]
        }
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
