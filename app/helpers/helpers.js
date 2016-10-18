var axios = require('axios');

function start(){
	return axios.get('http://localhost:8000/start')
		.then(function(board){
			return board.data
		})
}

function userMove(move, newBoxIdx){
	return axios.post('http://localhost:8000/move',
			{
				move: move,
				newBoxIdx: newBoxIdx
			}
		)
		.then(function(data){
			return data.data
			
		})
}

function checkWin(board, player){
	let boardLen = board.length;
	let total;
	let rowCheck;
	let colCheck;
	let diagCheck;

	console.log(board)

	board.map(function(row){
		rowCheck = row.every(function(current){
			return current === player
		})
	})

	for (var i = 0; i<boardLen; ++i){
		let tempArr = [];
		for (var c = 0; c<boardLen; ++c){
			tempArr.push(board[i][c]);
		}
		colCheck = tempArr.every(function(current){
			return current === player
		})
	}

	if (rowCheck || colCheck){
		return true
	} else {
		return false
	}
	
}

module.exports = {
	start: start,
	userMove: userMove,
	checkWin: checkWin
}