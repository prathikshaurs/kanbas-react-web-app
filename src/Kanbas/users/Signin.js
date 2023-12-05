import * as client from "./Client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/account");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sign In</h1>
      <input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="Username"
        className="form-control mb-2"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="Password"
        className="form-control mb-2"
        onChange={handleInputChange}
      />
      <button onClick={signin} className="btn btn-success mb-2 me-2">
        Sign In
      </button>
    </div>
  );
}
export default Signin;