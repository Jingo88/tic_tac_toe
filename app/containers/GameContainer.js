import React from 'react';

import GameBoard from '../components/GameBoard';
import GameMenu from '../components/GameMenu';
import {start, updateMove, checkWin, compMove, checkTie, getUserInfo} from '../helpers/helpers';

const GameContainer = React.createClass({
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
			username: ""
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
		const {userId, board, boxIdx, wins, losses, ties} = this.state;
		
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

			updateMove(userId, board, boxIdx, wins, losses, ties);

			if (checkWin(newBoard, 1)){
				updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], 1, losses, ties)		
				this.setState({finish: "YOU WIN!"})
				console.log('YOU WONNNNN')
			} else {
				let computer = compMove(board, boxIdx)
				this.setState({
					board : computer.board,
					boxIdx : computer.boxIdx
				})

				updateMove(userId, board, boxIdx, wins, losses, ties)

				let compWin = checkWin(board,2);

				if (compWin){
					updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], wins, 1, ties)
					console.log('YOU HAVE LOST')
					this.setState({finish: "YOU losses!"})
				} else {
					let isTie = checkTie(board);

					if (isTie){
						updateMove(userId, [[0,0,0],[0,0,0],[0,0,0]], ["00","01",'02','10','11','12','20','21','22'], wins, losses, 1)
						console.log('YOU HAVE TIED')
						this.setState({finish: "It's A TIE!"})
					}
				}
			}
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
			end: false,
			wins: 0,
			losses: 0,
			ties: 0, 
			finish: ""
		})
		updateMove(userId, board, boxIdx, win, 1, ties)
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
			wins: 0,
			losses: 0,
			ties: 0, 
			finish: ""
		})
		updateMove(userId, board, boxIdx, wins, 1, ties)
	},
	render(){
		console.log("rendering")
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