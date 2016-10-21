var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session')

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

//sessions
app.use(session({
	secret: "string",
	resave: false,
	saveUninitialized: true,
}))

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
	var userId = req.session.userId;
	var board = JSON.stringify(req.body.board);
	var boxIdx = JSON.stringify(req.body.boxIdx);
	var win = req.body.win;	
	var lose= req.body.lose;	
	var tie = req.body.tie;	

	db.run("UPDATE users SET board = ?, boxIdx = ?, wins = ?, losses = ?, ties= ? WHERE id=?", board, boxIdx, win, lose, tie, userId,
		function(err){
			if (err){throw err;}
		})

	res.json(true)
})

app.get('/logout', function(req, res){
	req.session.destroy();
	res.json('logout');
});

app.get('/session', function(req, res){
	if (req.session.valid_user === true){
		res.json(true)
	} else {
		res.json(false)
	}
})

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log(req.body)
	
	db.get('SELECT * FROM users WHERE username = ?', username,
		function(err, row){
			if (err) {throw err;};

			console.log(row);

			if (row){
					var match = bcrypt.compareSync(password, row.password)
					if (match){
						req.session.valid_user = true;
						req.session.userId = row.id;
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
	var username = req.body.username;
	var password = req.body.password;
	var hash = bcrypt.hashSync(password, 8);
	var boxIdx = JSON.stringify(["00","01",'02','10','11','12','20','21','22'])

	db.get('SELECT * FROM users WHERE username = ?', username,
		function(err, row){
			if (err) { throw err; }

			if (row){
				res.json({register: false})
			} else {
				db.run('INSERT INTO users (username, password, board, boxIdx, wins, losses, ties) VALUES (?, ?, "[[0,0,0],[0,0,0],[0,0,0]]", ?, 0,0,0)', username, hash, boxIdx,
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
	var userId = req.session.userId;

	if (req.session.valid_user === true && req.session.valid_user !== undefined){
		db.get('SELECT * FROM users WHERE id = ?', userId,
			function(err, row){
				if (err){throw err;}

				res.json(row)
			}
		)
	} else {
		res.redirect('/')
	}
})

app.get('/leaders', function(req, res){
		var userId = req.session.userId;

	if (req.session.valid_user === true && req.session.valid_user !== undefined){
		db.all('SELECT * FROM users ORDER BY wins DESC, ties DESC, losses DESC LIMIT 10;',
			function(err, row){
				if (err){throw err;}
				console.log("WE ARE IN THE LEADERS")
				console.log(row)
				res.json(row)
			}
		)
	} else {
		res.redirect('/')
	}
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




