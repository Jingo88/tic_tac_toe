import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import HomeContainer from '../containers/HomeContainer';
import GameContainer from '../containers/GameContainer';

const router = (
	<Router history={hashHistory}>
		<Route path='/' component={HomeContainer}/>
		<Route path='/start' component={GameContainer}/>
	</Router>
)

module.exports = router;