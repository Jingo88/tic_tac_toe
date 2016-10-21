import React from 'react';

var styles = {
	fontDecor: {
		textDecoration: "underline",
		fontStyle: 'italic',
		fontWeight: '700',
		textShadow: '3px 3px 2px rgba(150, 150, 150, 1)'		
	}, 
	center:{
		textAlign: "center",
		
	}
}

function Heading(props){
	return (
		<div style={styles.center}>
			<h1 style={styles.fontDecor}>Tic Tac Toe</h1>
			<h3>Hey {props.name}! Want to play a game?</h3>
		</div>
		
	)
}

module.exports = Heading;