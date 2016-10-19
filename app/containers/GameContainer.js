import React from 'react';

import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import {start, userMove, checkWin} from '../helpers/helpers';

const GameContainer = React.createClass({
	getInitialState(){
		return {
			userID : this.props.location.query.userId,
			board : [
						[0,0,0],
						[0,0,0],
						[0,0,0]
					],
			boxIdx:["00","01",'02','10','11','12','20','21','22'],
			playerTurn: 1,
			start: false,
			reset: false,
			end: false
		}
	},
	// componentWillMount(){
	// 	this.getBoard()
	// },
	// getBoard(){
	// 	start()
	// 		.then(function(data){
	// 			this.setState({
	// 				board: data.board,
	// 				boxIdx: data.boxIdx
	// 			})
	// 		}.bind(this))
	// },
	handleUserMove(event){
		const {playerTurn, board, boxIdx} = this.state;
		
		let moveId = event.target.id;
		let moveIdx = boxIdx.indexOf(moveId);
		let moveSplit = moveId.split("");
		let userC = moveSplit.map(function(x){return parseInt(x)});
		
		if (board[userC[0]][userC[1]] === 0){
			
			let newBoxIdx = boxIdx;
			newBoxIdx[moveIdx] = "X"
			board[userC[0]][userC[1]] = 1

			console.log(checkWin(board,1))
			if (checkWin(board, 1)){
				console.log("WE WONNNNN")
			} else {
				console.log("KEEP GOING")
			}


			userMove(userC, newBoxIdx)
				.then(function(data){
					this.setState({
						board: data.board,
						boxIdx: data.boxIdx
					})
				}.bind(this))
		}
	},
	handleStart(event){
		console.log('you clicked it!!!')
		this.setState({start: true})
	},
	handleReset(event){

	},
	handleEnd(event){

	},
	render(){
		console.log("RENDERING GAME CONTAINER")
		console.log(this.state)
		return (
			<div>
				{this.state.start === true ? <GameBoard
				data={this.state}
				onUserMove={this.handleUserMove}/>
				: <h1>Tic Tac Toe</h1>}
				<GameMenu
					onStart = {this.handleStart}
					onReset = {this.handleReset}
					onEnd = {this.handleEnd}/> 
			</div>
			
		)
	}
})

export default GameContainer;