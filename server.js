var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var defaultPath = path.join(path.resolve('.'), '/app/index.html');

var compiler = webpack(webpackConfig);

var port = 8000;

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



// create board
var data = {
	board : [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
	boxIdx:["00","01",'02','10','11','12','20','21','22']
}

var randomMove = function(arr){
	
	var idx = Math.floor(Math.random() * 9)
	if (arr[idx] !== "X" && arr[idx] !== "O"){
		var move = arr[idx];
		var moveSplit = move.split("");
		var computerMove = moveSplit.map(function(x){return parseInt(x)});
		return {
			"computerMove": computerMove,
			"idx": idx
		}

	} else {
		return randomMove(arr);
	}

}

//ROUTES
app.post('/move',function(req,res){
	var user = req.body.move;
	var newBoxIdx = req.body.newBoxIdx;
	data.board[user[0]][user[1]] = 1;
	data.boxIdx = newBoxIdx;
	var move = randomMove(newBoxIdx);
	var compMove = move["computerMove"]

	data.board[compMove[0]][compMove[1]] = 2;

	data.boxIdx[move['idx']] = "O"

	res.json(data)
})

app.get('/start', function(req,res){
	res.json(data)
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




