import React from 'react';

var styles = {
	box: {
		border: "2px solid black",
		height: "150px"
	}, 
	center:{
		textAlign: "center"
	}
}

function GameMenu(props){
	const {start, username, wins, losses, ties} = props.data
	const {onStart, onReset, onEnd, onLogOut} = props
	return (
		<div>
			{start === true ? 
				<div className = "row">
					<div className = 'col s6'>
						<button onClick = {onReset} className="col s3 waves-effect waves-light btn-large">New</button>
						<button onClick = {onEnd} className="col s3 push-s3 waves-effect waves-light btn-large">Quit</button>
					</div>

					<div className="col s6">
						<h5>Your Record Is:</h5>
						<ul>
							<li>Wins: {wins}</li>
							<li>Losses: {losses}</li>
							<li>Ties: {ties}</li>
						</ul>
					</div>
					

				</div>

				:
				
				<div className="col s12" style={styles.center}>

					<h5>Your Record Is:</h5>
					<ul>
						<li>Wins: {wins}</li>
						<li>Losses: {losses}</li>
						<li>Ties: {ties}</li>
					</ul>
					
					<div className = "row">
						<button onClick = {onStart} className="col s3 waves-effect waves-light push-s1 btn-large">Start Game</button>
						<button onClick = {onLogOut} className="col s3 push-s5 waves-effect waves-light btn-large">Log Out</button>
					</div>


				</div>
			}
		</div>
	)
}

module.exports = GameMenu;