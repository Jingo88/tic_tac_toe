import React from 'react';

import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import {start, updateMove, checkWin, compMove, getUserInfo, logout} from '../helpers/helpers';

const GameContainer = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},
	getInitialState(){
		return {
			board : [
						[0,0,0],
						[0,0,0],
						[0,0,0]
					],
			boxIdx:["00","01",'02','10','11','12','20','21','22'],
			start: false,
			end: false,
			wins: 0,
			losses: 0,
			ties: 0, 
			finish: "",
			username: "",
			moves: 0
		}
	},
	componentDidMount(){
		getUserInfo()
			.then(function(data){
				const {board, boxIdx, username, wins, losses, ties} = data;
				
				let boardParse = JSON.parse(board);
				let boxIdxParse = JSON.parse(boxIdx);
				
				this.setState({
					board :boardParse,
					boxIdx: boxIdxParse,
					username: username,
					wins: wins,
					losses: losses,
					ties: ties
				})

			}.bind(this))
	},
	handleUserMove(event){
		const {userId, board, boxIdx, wins, losses, ties, moves} = this.state;
		
		let moveId = event.target.id;
		let moveIdx = boxIdx.indexOf(moveId);
		let moveSplit = moveId.split("");
		let userC = moveSplit.map(function(x){return parseInt(x)});
		
		if (board[userC[0]][userC[1]] === 0){
			
			let newBoxIdx = boxIdx;
			newBoxIdx[moveIdx] = "X";
			let newBoard = board;
			newBoard[userC[0]][userC[1]] = 1;
			let newMoves = moves + 1;

			updateMove(userId, board, boxIdx, wins, losses, ties);

			if (checkWin(newBoard, 1)){
				
				this.setState({
					finish: "YOU WIN!",
					wins: wins + 1,
					moves: 0
				})
				console.log('YOU WONNNNN')

				updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], wins, losses, ties)
				
			} else if (newMoves >=5){
					console.log("THIS IS A TIE")
					console.log(moves)

					this.setState({
						finish: "It's A TIE!",
						ties: ties+1,
						moves: 0
					})

					updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], wins, losses, ties)
				
			} else {
				let computer = compMove(newBoard, newBoxIdx)

				newBoard = computer.board;
				newBoxIdx = computer.boxIdx;

				updateMove(userId, board, boxIdx, wins, losses, ties)

				let compWin = checkWin(newBoard,2);

				if (compWin === true){
					console.log('YOU HAVE LOST')

					this.setState({
						finish: "YOU LOSE!",
						losses: losses+1,
						moves: 0
					})

					updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], wins, losses, ties)	
				}
			}
			this.setState({
						board: newBoard,
						boxIdx: newBoxIdx,
						moves: moves+1
			})
		}
	},
	handleStart(event){
		this.setState({start: true})
	},
	handleReset(event){
		const {userId, board, boxIdx, wins, losses, ties} = this.state;
		
		this.setState({
			board : [
						[0,0,0],
						[0,0,0],
						[0,0,0]
					],
			boxIdx:["00","01",'02','10','11','12','20','21','22'],
			finish: "",
			moves: 0
		})
		updateMove(userId, board, boxIdx, wins, losses, ties)
	},
	handleEnd(event){
		const {userId, board, boxIdx, wins, losses, ties} = this.state;
		
		this.setState({
			board : [
						[0,0,0],
						[0,0,0],
						[0,0,0]
					],
			boxIdx:["00","01",'02','10','11','12','20','21','22'],
			start: false,
			finish: "",
			moves: 0
		})
		updateMove(userId, board, boxIdx, wins, losses, ties)
	},
	handleLogOut(event){
		logout()
			.then(function(data){
				this.context.router.push({
					pathname: '/'
				})
			}.bind(this))
	},
	render(){
		return (
			<div className="container">
				{this.state.start === true ? <GameBoard
				data={this.state}
				onUserMove={this.handleUserMove}/>
				: <h1>Tic Tac Toe</h1>}
				<GameMenu
					data = {this.state}
					onStart = {this.handleStart}
					onLogOut = {this.handleLogOut}
					onReset = {this.handleReset}
					onEnd = {this.handleEnd}/> 
			</div>
		)
	}
})

export default GameContainer;