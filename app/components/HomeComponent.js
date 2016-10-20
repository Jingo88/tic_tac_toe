import React from 'react';

var styles = {
	box: {
		border: "2px solid black",
		height: "150px"
	}
}

function Options(props){
	return(
		<div>
			<button onClick = {props.onUserChoice} name="Login">Login</button>
			<button onClick = {props.onUserChoice} name="Register">Register</button>
		</div>
	)
}

function UserInput(props){
	return(
		<div>
			<form onSubmit = {props.onUserSubmit}>
				<input type="text" placeholder="Enter Your Username" data="username"/>
				<input type="text" placeholder="Enter Your Password" data="password"/>
				<input type="submit"/>
			</form>
			<button>Cancel</button>
		</div>
	)
}

function HomeComponent(props){
	const {userAction, register} = props.data;

	return(
		<div className="row">
			{userAction === null ? <Options onUserChoice ={props.onUserChoice}/> : 
				<UserInput onUserSubmit = {props.onUserSubmit}/>}
			{register === "" ? <h1>Please Login or Register</h1> : <h1>{register}</h1>}
		</div>
	
	)
}

module.exports = HomeComponent;