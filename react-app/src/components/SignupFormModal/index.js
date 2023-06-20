import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [admin, setAdmin] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {

			const data = await dispatch(signUp(username, email, password, firstName, lastName, admin));

			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const handleRedirect = (e) => {
		e.preventDefault()
		history.push(`/login`)
	  }

	return (
		<div className="sign-up-page">
		{errors.length > 0 ? <img className="login-img" src={process.env.PUBLIC_URL + '/2760998.png'}></img> : <img className="login-img" src={process.env.PUBLIC_URL + '/2758343-200.png'}></img>}
		{/* <img className="login-img" src={process.env.PUBLIC_URL + '/2758343-200.png'}></img> */}
		<h1>Sign Up</h1>
		<form className="sign-up-form" onSubmit={handleSubmit}>
		  {errors.includes('Email address is already in use.') && <p className="text-error">Email address is already in use.</p>}
		  {errors.includes('Invalid email address.') && <p className="text-error">Invalid email address.</p>}
		  <label>
		  <i class="fa-solid fa-envelope"></i>
			<input
			  className={errors.includes('Email address is already in use.') || errors.includes('Invalid email address.') ? 'email-error' : 'email'}
			  placeholder="Email"
			  type="text"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			  required
			/>
		  </label>
			<p className="hide-email-text">Email</p>
		  {errors.includes('Username is already in use.') && <p className="text-error">Username is already in use.</p>}
		  <label>
		  <i class="fa-solid fa-user"></i>
			<input
			  className={errors.includes('Username is already in use.') ? 'username-error' : 'username'}
			  type="text"
			  placeholder="Username"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			  required
			/>
		  </label>
		  <label>
		  <i class="fa-solid fa-user"></i>
			<input
			  type="text"
			  placeholder="First Name"
			  value={firstName}
			  onChange={(e) => setFirstName(e.target.value)}
			  required
			/>
		  </label>
		  <label>
		  <i class="fa-solid fa-user"></i>
			<input
			  type="text"
			  placeholder="Last Name"
			  value={lastName}
			  onChange={(e) => setLastName(e.target.value)}
			  required
			/>
		  </label>
		  <label className="admin-sign-up">
			<p>Admin</p>
		  <input
			className="sign-up-checkbox"
			type='checkbox'
			onChange={(e) => setAdmin(true)}
			>
		  </input>

		  </label>
		  <label>
		  <i class="fa-solid fa-lock"></i>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  required
			/>
		  </label>
		  {errors.includes('Confirm Password field must be the same as the Password field') && <p className="text-error">Confirm Password field must be the same as the Password field</p>}
		  <label>
		  <i class="fa-solid fa-lock"></i>
			<input
			  className={errors.includes('Confirm Password field must be the same as the Password field') ? 'password-error' : 'password'}
			  type="password"
			  placeholder="Confirm Password"
			  value={confirmPassword}
			  onChange={(e) => setConfirmPassword(e.target.value)}
			  required
			/>
		  </label>
		  <button className="sign-up-button" type="submit">Sign Up</button>
		  <button className="sign-up-button" onClick={handleRedirect}>Back to Login</button>
		</form>
	  </div>
	);
}

export default SignupFormModal;
