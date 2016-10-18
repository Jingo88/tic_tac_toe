import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {start, userMove} from '../helpers/helpers';

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
		console.log(board)
		if (board[userC[0]][userC[1]] === 0){
			console.log('WE JUST CLICKED SHIT')
			let newBoxIdx = boxIdx;
			newBoxIdx[moveIdx] = "X"

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