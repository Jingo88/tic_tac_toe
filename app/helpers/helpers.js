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
	let x;
	console.log(board)

	board.map(function(row){
		// total = row.reduce(function(prev, curr){ return prev + curr})
		
		
		total = row.reduce((p,c) => p+c);
		x = total === player*boardLen
	})
	return x
}

module.exports = {
	start: start,
	userMove: userMove,
	checkWin: checkWin
}