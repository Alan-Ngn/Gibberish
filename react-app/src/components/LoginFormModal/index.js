import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="splash-page">
      <div className="login">
        {/* {errors.length > 0 ? <img className="login-img" src={process.env.PUBLIC_URL + '/2760998.png'}></img> : <img className="login-img" src={process.env.PUBLIC_URL + '/2758343-200.png'}></img>} */}
        <h1>Sign into Gibberish</h1>
        {errors.length > 0 && <div className="errors">{errors[0]}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <i class="fa-solid fa-envelope"></i>
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
            <i class="fa-solid fa-lock"></i>
            <input
              className="password-input"
              type="password"
              value={password}
              placeholder="super duper secret password"
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

export default LoginFormModal;
