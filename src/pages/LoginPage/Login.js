import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../../App.css';

const initialState = {
	email: '',
	password: '',
	emailError: '',
	passwordError: '',
	emailAndPasswordError: '',
};

class Login extends Component {
	state = initialState;
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

		this.submitForm = this.submitForm.bind(this);
	}

	validate = () => {
		let emailError = '';
		let passwordError = '';
		let emailAndPasswordError = '';

		if (
			this.state.password.length < 8 &&
			this.state.password.length === 0
		) {
			passwordError = 'Minimum 9 characters required ';
		}

		if (!this.state.email.includes('@')) {
			emailError = 'Invalid email';
		}

		if (this.state.password.length === 0 && this.state.email.length === 0) {
			emailAndPasswordError = 'Please enter your email and password';
		}

		if (emailError && passwordError) {
			this.setState({emailError, passwordError});
			return false;
		}

		return true;
	};

	submitForm(e) {
		e.preventDefault();
		//const {username, password} = this.state;
		const isValid = this.validate();
		//login
		if (isValid) {
			localStorage.setItem('token', 'adaskjdksaljdlkasjdklajsdkl');
			this.setState({
				loggedIn: true,
			});
			this.setState(initialState);
		}
	}

	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	render() {
		const {email, password} = this.state;
		if (this.state.loggedIn) {
			return <Redirect to="/leadUsers" />;
		}
		return (
			<div className="login-component">
				<form onSubmit={this.submitForm} className="forma-login">
					<span className="spanEmail">Email</span>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={this.handleEmailChange}
						className="inputEmail"
					/>

					<div>{this.state.emailAndPasswordError}</div>

					<div className="email">{this.state.emailError}</div>
					<br />
					<span className="spanPassword">Password</span>
					<input
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={this.handlePasswordChange}
						className="inputPassword"
					/>
					<div className="password">{this.state.passwordError}</div>
					<br />
					<input className="login-submit" type="submit" />
					<br />
				</form>
			</div>
		);
	}
}

export default Login;
