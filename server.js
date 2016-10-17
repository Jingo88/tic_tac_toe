var express = require('express');
var path = require('path');
var app = express();
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var defaultPath = path.join(path.resolve('.'), '/app/index.html');

var compiler = webpack(webpackConfig);

var port = 8000;

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true, 
	publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req,res){
	res.sendFile(path.resolve(__dirname, 'app', 'index.html'))
})

app.listen(port, function(err){
	if(err){
		console.error
		return
	}
	console.log("Listening on port " + port)

})




