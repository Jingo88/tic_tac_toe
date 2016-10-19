import React from 'react';

function GameMenu(props){
	const {onStart, onReset, onEnd} = props
	return (
		<div>
			<ul>
				<li><button onClick = {onStart}>Start Game</button></li>
				<li><button onClick = {onReset}>Reset Game</button></li>
				<li><button onClick = {onEnd}>End Game</button></li>
			</ul>
		</div>
	)
}

module.exports = GameMenu;