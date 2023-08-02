import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const userObject = useContext(AuthContext);
  const LogOut = () => {
    toast.success("successfull Logout!!",{
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });
    localStorage.removeItem("token");
 
    navigate("/login")
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      LogOut();
    }
  
  },[])
  return (
    <div>
      <nav className="navbar navbar-expand-lg  bg-dark navbar-dark" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home" style={{ fontSize: 30 }}>
            Bug Tracking System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {localStorage.getItem("token") ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userObject.userObject?.role_name === "manager" ? <>
              
              <li className="nav-item">
                  <Link className="nav-link" to="/managerproject">Projects </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/createproject">Create Project </Link>
                </li> </> :
                userObject.userObject?.role_name === "qa" ? <>
                 <li className="nav-item">
                    <Link className="nav-link" to="/qaproject">Projects</Link>
                  </li>
                   </> : userObject.userObject?.role_name === "developer" ? <li className="nav-item">
                    <Link className="nav-link" to="/developerproject">Projects</Link>
                  </li> : ""
              }
            </ul> : ""
            }

            {!localStorage.getItem("token") ? <form className="d-flex" role="search"> ?
              <Link className="btn btn-outline-secondary " to={"/login"} style={{ marginRight: 20 }}>LogIn</Link>
              <Link className="btn btn-outline-secondary " to={"/signup"} style={{ marginRight: 20 }}>SignUp</Link>
            </form> : <> <h5 style={{ color: "white", marginRight: 20, marginTop: 12 }}>Wellcome {userObject.userObject?.name} ! Logout ? </h5> <Link className="btn btn-outline-secondary " to={"/login"} onClick={LogOut} style={{ marginRight: 20 }}>LogOut</Link></>}
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;
