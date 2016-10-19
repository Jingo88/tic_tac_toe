import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {start, userMove, checkWin, login} from '../helpers/helpers';

const HomeContainer = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},
	getInitialState(){
		return {
			userAction: null
		}
	},
	handleUserChoice(event){
		this.setState({userAction: event.target.name})
	},
	handleUserSubmit(event){
		event.preventDefault()
		let username = event.target.children[0].value;
		let password = event.target.children[1].value;
		console.log(username)
		console.log(password)
		if (this.state.userAction === "Login"){
			login(username, password)
				.then(function(data){
					if (data === true){
						this.context.router.push({
							pathname: '/game'
						})
					} else {
						console.log('WE HAVE TO BUILD SOMETHING TO TELL THE USER THEIR LOGIN INFO IS WRONG')
					}
				}.bind(this))
		} else if (this.state.userAction === "Register") {

		}
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