var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var crud = require('./events_crud/crud');
var options = { publicPath: config.output.publicPath, stats: 'errors-only' };
var server = new WebpackDevServer(webpack(config), options);


server.listen(3000, '0.0.0.0', function (err, result) {
  if (err) return console.log(err);
  console.log('Listening at 0.0.0.0:3000');
});
