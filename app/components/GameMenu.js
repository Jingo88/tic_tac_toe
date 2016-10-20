import React from 'react';

function GameMenu(props){
	const {start, username, wins, losses, ties} = props.data
	const {onStart, onReset, onEnd, onLogOut} = props
	return (
		<div>
			{start === true ? 
				<div>
					<ul>
						<li><button onClick = {onStart}>Start Game</button></li>
						<li><button onClick = {onReset}>Reset Game</button></li>
						<li><button onClick = {onEnd}>End Game</button></li>
					</ul>
				</div>

				:
				
				<div className="col s12">
					<h1>Hello {username}!</h1>
					<h4>Want to play a game?</h4>

					<div className = "row">
						<button onClick = {onStart} className="col s3 waves-effect waves-light btn">Start Game</button>
						<button onClick = {onLogOut} className="col s3 push-s3 waves-effect waves-light btn">Log Out</button>
					</div>

					<h4>Your Record Is:</h4>
					<ul>
						<li>Wins: {wins}</li>
						<li>Losses: {losses}</li>
						<li>Ties: {ties}</li>
					</ul>
				</div>
			}
		</div>
	)
}

module.exports = GameMenu;