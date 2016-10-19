import React from 'react';

import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import {start, userMove, checkWin, compMove} from '../helpers/helpers';

const GameContainer = React.createClass({
	getInitialState(){
		return {
			userId : this.props.location.query.userId,
			board : [
						[0,0,0],
						[0,0,0],
						[0,0,0]
					],
			boxIdx:["00","01",'02','10','11','12','20','21','22'],
			start: false,
			reset: false,
			end: false,
			win: 0,
			lose: 0,
			tie: 0
		}
	},
	handleUserMove(event){
		const {userId, board, boxIdx, win, lose, tie} = this.state;
		
		let moveId = event.target.id;
		let moveIdx = boxIdx.indexOf(moveId);
		let moveSplit = moveId.split("");
		let userC = moveSplit.map(function(x){return parseInt(x)});
		
		if (board[userC[0]][userC[1]] === 0){
			
			let newBoxIdx = boxIdx;
			newBoxIdx[moveIdx] = "X";
			let newBoard = board;
			newBoard[userC[0]][userC[1]] = 1;

			this.setState({
				board: newBoard,
				boxIdx: newBoxIdx
			})

			userMove(userId, board, boxIdx, win, lose, tie)

			if (checkWin(newBoard, 1)){
				console.log("WE WONNNNN")
			} else {
				let computer = compMove(board, boxIdx)
				this.setState({
					board : computer.board,
					boxIdx : computer.boxIdx
				})
				let compWin = checkWin(board,2)
			}

		// 	userMove(1, [[1,2,1],[2,1,1],[2,2,1]], ['00','01','02','10','11','12','20','21','22'],1,0,0)
		// 		.then(function(data){
		// 			console.log("we are in the new user move")
		// 			console.log(data)
		// 		}.bind(this))
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