var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

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
				var match = bcrypt.compareSync(password, row.password)
				if (match){
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
	console.log("you have hit the register")
	var username = req.body.username;
	var password = req.body.password;
	var hash = bcrypt.hashSync(password, 8);

	db.get('SELECT * FROM users WHERE username = ?', username,
		function(err, row){
			console.log(row)
			if (err) { throw err; }

			if (row){
				res.json({register: false})
			} else {
				db.run('INSERT INTO users (username, password, board, boxIdx, wins, losses, ties) VALUES (?, ?, "[]", "[]", 0,0,0)', username, hash, 
					function(err){ 
						if (err){
							throw err;
						}
						res.json({register:true})
					}
				)
			}
		}
	)
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




