import React, { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";
import "./styles.scss";

function Signin() {
  const { signin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    signin({ email, password });
  };

  return (
    <div className="container">
      <div className="side-image">
        <img src="./leaf2.jpg" alt="Leaf" className="leaf-image" />
        <img src="./leaf3.jpg" alt="Leaf" className="leaf-image" />
      </div>
      <div className="login">
        <h1 className="title">Sign In</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
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
        </form>
      </div>
    </div>
  );
}

export default Signin;
