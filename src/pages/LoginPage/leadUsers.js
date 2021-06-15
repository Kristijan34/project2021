import React, {Component} from 'react';
import {Link, Redirect, NavLink} from 'react-router-dom';
import Leads from '../../components/Leads';

class leadUsers extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem('token');

		let loggedIn = true;
		if (token == null) {
			loggedIn = false;
		}

		this.state = {
			loggedIn,
		};
	}
	render() {
		if (this.state.loggedIn === false) {
			return <Redirect to="/login" />;
		}
		return (
			<div>
				<h1>You are now logged in!</h1>
				<NavLink to="/logout">Logout</NavLink>
				<Leads />
			</div>
		);
	}
}

export default leadUsers;
