import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Login Form</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter Email"
            required
            value={user.email}
            onChange={(data) => {
              setUser({ ...user, email: data.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter Password"
            required
            value={user.password}
            onChange={(data) => {
              setUser({ ...user, password: data.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary"
            style={{ marginLeft: 70 }}
          >
            Log In
          </button>

          <button
            className="btn btn-outline-secondary "
            style={{ marginLeft: 10 }}
          >
            <Link className="nav-link active" to="/signup">
              SignUp
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
