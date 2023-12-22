import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/authSlice';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(authenticate({ email, password }));
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button bg-blue-500">Next</button>
        </div>
        <div className="login-footer">
          <a href="#">Forgot email?</a>
          <a href="#">Create account</a>
        </div>
      </form>
    </>
  );
};

export default Login;
