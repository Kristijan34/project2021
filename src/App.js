import React, {useState, useEffect} from 'react';
import './App.css';
import Leads from './components/Leads';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage/Login';
import leadUsers from './pages/LoginPage/leadUsers';
import Logout from './pages/LoginPage/Logout';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/leadUsers" component={leadUsers} />
				<Route path="/logout" component={Logout} />
			</Switch>
		</Router>
	);
}

export default App;
