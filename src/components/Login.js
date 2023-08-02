import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { LoginApi } from "../api/userApi";
import AuthContext from "../context/AuthContext";
import Navbar from "./Navbar";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const { setUserObject } = useContext(AuthContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginApi({ email: user.email, password: user.password })
      localStorage.setItem("token", res.token);
      toast.success("successfull login!!",{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setUserObject(res.user[0])
      navigate("/home");

    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setUser({ email: "", password: "" });
    }
  };
  return (
    <div>
      <div className="container" style={{ width: 350, marginTop: 50 }}>
        <div className="mb-4">
         <h3>Login Form</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
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
    </div>
  );
};

export default Login;
