import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {start} from '../helpers/helpers';

const HomeContainer = React.createClass({
	getInitialState(){
		return {
			board: [],
			playerTurn: 1,
			boxIdx: ["00","01",'02','10','11','12','20','21','22']
		}
	},
	componentDidMount(){
		this.getBoard()
	},
	getBoard(){
		start()
			.then(function(data){
				this.setState({board: data})
			}.bind(this))
	},
	handleUserMove(event){
		const {playerTurn, board, boxIdx} = this.state;
		let moveId = event.target.id
		let moveIdx = boxIdx.indexOf(moveId)
		let moveSplit = moveId.split("")
		let userChoice = moveSplit.map(function(x){return parseInt(x)})
		
		if (board[userChoice[0]][userChoice[1]] === 0){
			let newBoxIdx = boxIdx;
			newBoxIdx[moveIdx] = playerTurn === 1 ? "X" : "Y";

			let newBoard = board
			newBoard[userChoice[0]][userChoice[1]] = playerTurn === 1 ? 1 : 2

			this.setState({
				board: newBoard,
				playerTurn: playerTurn === 1 ? 2 : 1,
				boxIdx: newBoxIdx
			})

			this.setState({})
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