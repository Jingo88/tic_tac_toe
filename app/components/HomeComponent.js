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
		</div>
	)
}

function HomeComponent(props){
	console.log(props)
	return(
		<div className='row'>
			{props.data.boxIdx.map(function(state){
				return <Box 
					idx={state} 
					onUserMove={props.onUserMove}/>
			})}
		</div>
	)
}

module.exports = HomeComponent;