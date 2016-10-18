import React from 'react';
import { render } from 'react-dom';
import HomeContainer from './containers/HomeContainer';
import router from './router/router';

render(
	router,
	document.getElementById('app')
);