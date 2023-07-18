import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const {setUserObject}=useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/v1/user/login/${user.email}/${user.password}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
            // toast("successfull login!!")
            localStorage.setItem("token", response.data.token);
            alert("successfull login!!");
            setUserObject(response.data.user[0])
             navigate("/home");
        }
        else{
          alert( `${response.data.message}`)
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
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
