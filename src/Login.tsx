import React, { useState, FormEvent } from 'react';
import './Login.css'; // Make sure to create a corresponding CSS file

  const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Handle the login logic here
    console.log(email, password);
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <div className="form-group">
          <label htmlFor="email">Email or phone</label>
          <input
            type="email"
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
          <button type="submit" className="login-button">Next</button>
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
