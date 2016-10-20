import React from 'react';

var styles = {
	box: {
		border: "2px solid black",
		height: "150px"
	},
	aInherit: {
		color: "inherit"
	}
}

function Options(props){
	return(
		<div className="col s8 push-s2">
			<button className="waves-effect waves-light btn col s3" onClick = {props.onUserChoice} name="Login">Login</button>
			<button className="waves-effect waves-light btn col s3 push-s4" onClick = {props.onUserChoice} name="Register">Register</button>
		</div>
	)
}

function UserInput(props){
	return(
		<div>
			<form onSubmit = {props.onUserSubmit} className="col s8 push-s2">
				<input type="text" placeholder="Enter Your Username" data="username" className="input-field col s12"/>
				<input type="password" placeholder="Enter Your Password" data="password" className="input-field col s12"/>
				<input type="submit" className="waves-light waves-effect btn col s2" />
				<button className="waves-effect waves-light btn col s2 push-s2"><a href="/" style={styles.aInherit}>Cancel</a></button>
			</form>
		</div>
	)
}

function HomeComponent(props){
	const {userAction, register} = props.data;

	return(
		<div className="row">
			<h1>Welcome to Jason's Tic Tac Toe</h1>
			<h4>Feel free to login/register with our super secure BCrypt hashing system to play this game of life and death</h4>

			{userAction === null ? <Options onUserChoice ={props.onUserChoice}/> : 
				<UserInput onUserSubmit = {props.onUserSubmit}/>}
			
			<h1 className='col s8 push-s2'>{register}</h1>
		</div>
	
	)
}

module.exports = HomeComponent;