var axios = require('axios');

function start(){
	return axios.get('http://localhost:8000/start')
		.then(function(board){
			return board.data
		})
}

function userMove(move){
	return axios.get('http://localhost:8000/move')
		.then(function(data){
			console.log('WE ARE IN USER MOVEEEE')
			console.log(data)
		})
}

module.exports = {start: start}