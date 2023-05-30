import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
  }

  const handleAdmin = (e) => {
    e.preventDefault();
    dispatch(login('admin@aa.io', 'password'));
  }

  return (
    <div className="splash-page">
      <div className="sign-up-wrapper">
        <div className="sign-up">
          <h3>New to Gibberish?</h3>
          <Link to='/signup'>Create an Account</Link>
        </div>
      </div>
      <div className="login">
        {errors.length > 0 ? <img className="login-img" src={process.env.PUBLIC_URL + '/2760998.png'}></img> : <img className="login-img" src={process.env.PUBLIC_URL + '/2758343-200.png'}></img>}
        <h1>Sign in to Gibberish</h1>
        <h3>We suggest using the email address you use for fun.</h3>
        <button onClick={handleDemo} className="login-button"><i class="fa-solid fa-user"></i> Sign in With Demo User</button>
        <button onClick={handleAdmin} className="login-button"><i class="fa-solid fa-user-tie"></i> Sign in With Demo Admin</button>
        {errors.length > 0 && <div className="errors">{errors[0]}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <input
              className="email-input"
              type="text"
              placeholder="name@fun-email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="password-input"
              type="password"
              value={password}
              placeholder="super duper secret email"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="login-button" type="submit">Sign In With Email</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
