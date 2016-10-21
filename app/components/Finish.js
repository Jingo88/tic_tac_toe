import React from 'react';

var styles = {
	modalAll: {
		top: "0",
		left: '0',
		position: "fixed",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,.4)"
	}, 
	closeButton:{
		position: "absolute",
		top: "5%",
		right: "3%"
	},
	modalContent:{
		position: "relative",
		margin: "0 30%",
		backgroundColor: "white",
		top: "150px",
		width: "40%",
	},
	modalHeader: {
		position: 'absolute',
		backgroundColor: 'white',
		width: "100%",
		textAlign: "center",
		borderRadius: "20px"
	},
	headingStyle:{
		textDecoration: "underline",
		fontStyle: 'italic',
		fontWeight: '700',
		textShadow: '3px 3px 2px rgba(150, 150, 150, 1)'		
	}
}

// will have to attach function to button to turn state.finish in container to ""

function Finish(props){
	return (
		<div className="modalAll" style={styles.modalAll}>
			<div className = "modelContent" style={styles.modalContent}>
				<div className = "modelHeader" style={styles.modalHeader}>
					<h1 style={styles.headingStyle}>{props.data}</h1>
					<button 
						id="close" 
						style={styles.closeButton} 
						className="btn-floating btn waves-effect waves-light"
						onClick = {props.onChangeFinish}>X
					</button>
				</div>
			</div>
		</div>
		
	)
}

module.exports = Finish;