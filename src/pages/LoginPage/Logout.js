import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Logout extends Component {
	constructor(props) {
		super(props);
		localStorage.removeItem('token');
	}
	render() {
		return (
			<div>
				<h1>You have been logged out!!</h1>
				<Link to="/">Go back to home page</Link>
			</div>
		);
	}
}

export default Logout;
