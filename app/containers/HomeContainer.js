import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {start, userMove, checkWin} from '../helpers/helpers';

const HomeContainer = React.createClass({
	getInitialState(){
		return {
			board: [],
			playerTurn: 1,
			boxIdx: []
		}
	},
	componentWillMount(){
		this.getBoard()
	},
	getBoard(){
		start()
			.then(function(data){
				this.setState({
					board: data.board,
					boxIdx: data.boxIdx
				})
			}.bind(this))
	},
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
	render(){
		return (
			<HomeComponent 
				data={this.state}
				onUserMove={this.handleUserMove}/>
		)
	}
})

export default HomeContainer;