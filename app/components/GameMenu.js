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

function Leader(props){
	const {username, wins, losses, ties} = props.data;

	return(
		<li>{username}: {wins} W | {losses} L | {ties} D</li>
	)
}

function Leaderboard(props){
	let arrKeys = Object.keys(props.leaders)
	return(
		<ul>
			{arrKeys.map(function(key){
				return <Leader data={props.leaders[key]}/>
			})}
		</ul>
	)
}

function GameMenu(props){
	const {start, username, wins, losses, ties, leaders} = props.data;
	const {onStart, onReset, onEnd, onLogOut} = props;

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
					<div className="row">
						<div className="col s6">
							<h5>Your Record Is:</h5>
							<ul>
								<li>Wins: {wins}</li>
								<li>Losses: {losses}</li>
								<li>Ties: {ties}</li>
							</ul>
						</div>
						
						<div className="col s6">
							<h5> Leaderboard Standings </h5>
							<Leaderboard leaders={leaders}/>
						</div>
					</div>
					
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