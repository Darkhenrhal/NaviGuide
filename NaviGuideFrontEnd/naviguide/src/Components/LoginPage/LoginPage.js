import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginValidation = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    console.log('Login Successful');
  }

  return (
    <div id="LoginFormDiv">
      <div id="topic_Login">
        <h2>Sign in</h2>
      </div>
      <form onSubmit={loginValidation}>
        <div id="inputs_Login">
          
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            className="inputs"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="inputs"
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="forgotpass_Login">
          <input 
            type="checkbox" 
            checked name="remember" 
            id="remember" />
          <label htmlFor="remember">Remember me</label>
          <a href="/">Forgot password</a>
        </div>
        <div id="button_Login">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p> Don't have an account? <Link to="/register">Sign up</Link></p>
          <input type="submit" name="btnSign" id="btnSign" value="Login" />
          <button id="btnGSign">Sign in with Google</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
