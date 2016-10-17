import React from 'react';

import HomeComponent from '../components/HomeComponent';

const HomeContainer = React.createClass({
	getInitialState(){
		return {
			board: [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			],
			playerTurn: 1,
			boxIdx: ["00","01",'02','10','11','12','20','21','22']
		}
	},
	handleUserMove(event){
		console.log('WE ARE IN HANDLE USER MOVE')
		console.log(event.target.id)	
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