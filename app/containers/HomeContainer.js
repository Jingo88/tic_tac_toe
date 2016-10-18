import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {start, userMove, checkWin} from '../helpers/helpers';

const HomeContainer = React.createClass({
	getInitialState(){
		return {
			userAction: null
		}
	},
	handleUserChoice(event){
		console.log(event.target.name);
		this.setState({userAction: event.target.name})
	},
	handleUserSubmit(event){
		event.preventDefault()
		let username = event.target.children[0].value;
		let password = event.target.children[1].value;
	},
	render(){
		return (
			<HomeComponent 
				data={this.state.userAction} 
				onUserChoice = {this.handleUserChoice}
				onUserSubmit = {this.handleUserSubmit}/>
		)
	}
})

export default HomeContainer;