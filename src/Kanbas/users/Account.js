import * as client from "./Client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "bootstrap";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Account() {
    const { id } = useParams();
  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };

  useEffect(() => {
    if (id) {
        findUserById(id);
      } else {
        fetchAccount();
      }  
  }, []);
  return (
    <div className="w-100">
      <h1 className="mb-4">Account</h1>
      {account && (
        <div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={account.password}
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={account.firstName}
              onChange={(e) =>
                setAccount({ ...account, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={account.lastName}
              onChange={(e) =>
                setAccount({ ...account, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="form-control"
              value={formatDate(account.dob)}
              onChange={(e) => setAccount({ ...account, dob: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              className="form-select"
              onChange={(e) => setAccount({ ...account, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={save}>
            Save
          </button><br /><br />
          <button onClick={signout} className="btn btn-danger w-100">Signout</button><br /><br />
          <Link to="/Kanbas/admin/users" className="btn btn-warning w-100">
            Users
          </Link>
        </div>
      )}
    </div>
  );
}
export default Account;