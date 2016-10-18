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

module.exports = {
	start: start,
	userMove: userMove
}