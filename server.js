var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var defaultPath = path.join(path.resolve('.'), '/app/index.html');

var compiler = webpack(webpackConfig);

var port = 8000;

var board = [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			];

//Cors 
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//Middleware to grab information from axios post request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//automatically run webpack when files are updated
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true, 
	publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.post('/move',function(req,res){
	// console.log(req) 
	console.log(req.body)
	// console.log(req.get('move'))
	res.json(board)
})

app.get('/start', function(req,res){
	res.json(board)
})

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




