var axios = require('axios');

function login(un, pw){
	return axios.post('http://localhost:8000/login',
		{
			username: un,
			password: pw
		}
	).then(function(data){
		console.log(data)
		return data.data
	})
}

function sessionCheck(){
	return axios.get('http://localhost:8000/session')
		.then(function(data){
			return data.data
		})
}

function logout(){
	return axios.get('http://localhost:8000/logout')
		.then(function(data){
			return data
		})
}

function register(un, pw){
	return axios.post('http://localhost:8000/register',
		{
			username: un,
			password: pw
		}
	).then(function(data){
		return data.data
	})
}

function getLeaders(){
	return axios.get('http://localhost:8000/leaders')
		.then(function(data){
			return data.data
		})
}


function getUserInfo(){
	return axios.get('http://localhost:8000/start')
		.then(function(data){
			return data.data
		})
}

function countMoves(board){
	let boardLen = board.length;
	let count = 0;

	board.map(function(row){
		for (var i = 0; i<boardLen; ++i){
			if (row[i] === 1){
				count ++ 
			}
		}
	})
	return count;
}

function updateMove(id, board, boxIdx, win, lose, tie){
	return axios.post('http://localhost:8000/move',
			{
				id: id,
				board: board,
				boxIdx: boxIdx,
				win: win,
				lose: lose,
				tie: tie				
			}
		)
		.then(function(data){
			return data.data
		})
}

// are we using this?
function updateFinish(userId, finish){
	return axios.post('http://localhost:8000/move',
		{
			id: id,
			board: board,
			boxIdx: boxIdx,
			win: win,
			lose: lose,
			tie: tie				
		}
	)
	.then(function(data){
		return data.data
	})
}

var compMove = function(board, boxIdx){
	
	var idx = Math.floor(Math.random() * 9)

	if (boxIdx[idx] !== "X" && boxIdx[idx] !== "O"){
		var move = boxIdx[idx];
		var moveSplit = move.split("");
		var cMove = moveSplit.map(function(x){return parseInt(x)});

		board[cMove[0]][cMove[1]] = 2;
		boxIdx[idx] = "O";

		return {
			board: board,
			boxIdx: boxIdx
		}
	} else {
		// have to check for tie here
		return compMove(board,boxIdx);
	}
}

function checkWin(board, player){
	let boardLen = board.length;
	let total;
	let rowCheck;
	let colCheck;
	let diagCheckOne;
	let diagCheckTwo;
	let diagArrOne = [];
	let diagArrTwo = [];

// Check for Rows
	board.map(function(row){
		let temp = row.every(function(current){
			return current === player
		})
		if (temp){
			rowCheck = true;	
		}
	})

// Check for Columns
	for (var i = 0; i<boardLen; ++i){
		let tempArr = [];
		let status;
		for (var c = 0; c<boardLen; ++c){
			tempArr.push(board[c][i]);
		}
		
		status = tempArr.every(function(current){
			return current === player
		})
		if (status){
			colCheck = true;
		}
	}

// Check for diagonals
	for (var i=0; i<boardLen; ++i){
		diagArrOne.push(board[i][i])
	}	
	diagCheckOne = diagArrOne.every(function(current){
		return current === player
	})

	for (var i=0; i<boardLen; ++i){
		diagArrTwo.push(board[i][boardLen - 1 - i])
	}	
	diagCheckTwo = diagArrTwo.every(function(current){
		return current === player
	})

	if (rowCheck || colCheck || diagCheckOne || diagCheckTwo){
		return true
	} else {
		return false
	}
}

module.exports = {
	getUserInfo: getUserInfo,
	updateMove: updateMove,
	checkWin: checkWin,
	compMove: compMove,
	login: login,
	logout: logout,
	register: register,
	sessionCheck: sessionCheck,
	countMoves: countMoves,
	getLeaders: getLeaders
}