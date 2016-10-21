import React from 'react';

import Finish from './Finish';

var styles = {
	box: {
		border: "2px solid black",
		height: "150px",
		textAlign: "center"
	}, 
	centerXO:{
		textAlign: "center"
	},
	zero:{
		display: "none"
	}
}

function Box(props){

	return(
		<div 
			className = "col s4"
			id = {props.idx}
			style={styles.box}
			onClick = {props.onUserMove}>
			<h1>{(props.idx === "X" || props.idx === "O") ? props.idx : " "}</h1>
		</div>
	)
}

function GameComponent(props){
	return(
			<div className='row'>
				{props.data.boxIdx.map(function(state){
					return <Box 
						idx={state} 
						onUserMove={props.onUserMove}/>
				})}
				
				{props.data.finish === "" ? 
					<div style={styles.zero}></div>	
				: 
					<Finish data={props.data.finish} onChangeFinish={props.onChangeFinish}/>
				}
			</div>
	)
}

module.exports = GameComponent;