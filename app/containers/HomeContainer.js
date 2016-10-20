import React from 'react';

import HomeComponent from '../components/HomeComponent';
import {login, register, sessionCheck} from '../helpers/helpers';

const HomeContainer = React.createClass({
	contextTypes:{
		router: React.PropTypes.object.isRequired
	},
	getInitialState(){
		return {
			userAction: null,
			register: "Have an Account?"
		}
	},
	componentDidMount(){
		sessionCheck()
			.then(function(data){
				if (data === true){
					this.context.router.push({
						pathname: '/start',
					})
				}
			}.bind(this))
	},
	handleUserChoice(event){
		this.setState({userAction: event.target.name})
	},
	handleUserSubmit(event){
		event.preventDefault()
		let username = event.target.children[0].value;
		let password = event.target.children[1].value;

		if (this.state.userAction === "Login"){
			login(username, password)
				.then(function(data){
					if (data.success === true){
						let userId = data.info["id"]
						this.context.router.push({
							pathname: '/start'
						})
					} else {
						this.setState({
							register: "Sorry your login information does not match our records"
						})
					}
				}.bind(this))
		} else if (this.state.userAction === "Register") {
			register(username, password)
				.then(function(data){
					console.log(data)
					if (data.register){
						this.setState({
							userAction: null,
							register: "Successfully Registered"
						})
					} else {
						this.setState({
							register: "Sorry that username has been taken"
						})
					}
				}.bind(this))
		}
	},
	render(){
		return (
			<HomeComponent 
				data={this.state} 
				onUserChoice = {this.handleUserChoice}
				onUserSubmit = {this.handleUserSubmit}/>
		)
	}
})

export default HomeContainer;