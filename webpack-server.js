var config = require('./webpack.config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = (function() {
  var compiler = webpack(config);
  return function(host, port) {
    var options = {
      contentBase: 'http://' + host + ':' + (port + 1),
      hot: false,
      inline: true,
      lazy: false,
      publicPath: config.output.publicPath,
      compress: true,
      quiet: false,
      noInfo: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    var webpackDevServer = new WebpackDevServer(compiler, options);
    webpackDevServer.listen(port + 1, host, function() {
    });
  };
})();
