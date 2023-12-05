import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./Client";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/kanbas/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Signup</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              username: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({
              ...credentials,
              password: e.target.value,
            })
          }
        />
      </div>

      <button className="btn btn-primary" onClick={signup}>
        Signup
      </button>
    </div>
  );
}
export default Signup;