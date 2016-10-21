import React from 'react';

var styles = {
	box: {
		border: "2px solid black",
		height: "150px"
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

function Finish(props){
	return (
		<h1>{props.data}</h1>
	)
}

function GameComponent(props){
	return(
		<div>
			{props.data.finish === "" ? 
				<div className='row'>
					{props.data.boxIdx.map(function(state){
						return <Box 
							idx={state} 
							onUserMove={props.onUserMove}/>
					})}
				</div>
				
			: 
				<div className='row'>
					
					{props.data.boxIdx.map(function(state){
						return <Box 
							idx={state} 
							onUserMove={props.onUserMove}/>
					})}
					<Finish data={props.data.finish}/>
				</div>
		}
		</div>

	)
}

module.exports = GameComponent;