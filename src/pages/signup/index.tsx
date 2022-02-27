import React, { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";
import "./styles.scss";

function Signup() {
  const { authenticated, signup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    signup({ email, password });
  };

  return (
    <div className="login">
      <h1 className="title">Login system</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">Login</button>
        </div>
        <p>{String(authenticated)}</p>
      </form>
    </div>
  );
}

export default Signup;
