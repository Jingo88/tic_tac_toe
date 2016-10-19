var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('ttt.db');

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



// // create board
// var data = {
// 	board : [
// 				[0,0,0],
// 				[0,0,0],
// 				[0,0,0]
// 			],
// 	boxIdx:["00","01",'02','10','11','12','20','21','22']
// }

// var randomMove = function(arr){
	
// 	var idx = Math.floor(Math.random() * 9)
// 	if (arr[idx] !== "X" && arr[idx] !== "O"){
// 		var move = arr[idx];
// 		var moveSplit = move.split("");
// 		var computerMove = moveSplit.map(function(x){return parseInt(x)});
// 		return {
// 			"computerMove": computerMove,
// 			"idx": idx
// 		}
// 	} else {
// 		return randomMove(arr);
// 	}
// }

//ROUTES
app.post('/move',function(req,res){
	var userId = req.body.id;
	var board = JSON.stringify(req.body.board);
	var boxIdx = JSON.stringify(req.body.boxIdx);	
	var win = req.body.win;	
	var lose= req.body.lose;	
	var tie = req.body.tie;	

	console.log(req.body)

	db.run("UPDATE users SET board = ?, boxIdx = ?, wins = wins + ?, losses = losses + ?, ties= ties + ? WHERE id=?", board, boxIdx, win, lose, tie, userId,
		function(err, row){
			if (err){throw err;}
			console.log(row)
		})
})

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	console.log(password);
	
	db.get('SELECT * FROM users WHERE username = ?', username,
		function(err, row){
			console.log(row)
			if (err) {throw err;}

			if (row){
				if (row.password === password){
					res.json({
						success: true,
						info: row
					})
				} else {
					res.json({
						success:false,
						info: null
					})
				}
			} 
		})
})

app.post('/register', function(req, res){

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




