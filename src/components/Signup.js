import { useState } from "react";
const Signup = () => {
    const [user,setUser]=useState({name:"", email:"", password:"", userType:""});
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(user);
    }
  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Register Your Self!</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            class="form-control"
            id="name"
            placeholder="Enter name"
            required
            value={user.name}
            onChange={(e)=>{ setUser({...user,name:e.target.value});}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter Email"
            required
            value={user.email}
            onChange={(e)=>{ setUser({...user,email:e.target.value});}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter Password"
            required
            value={user.password}
            onChange={(e)=>{ setUser({...user,password:e.target.value});}}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type">Choose Type:</label>
          <select name="type" id="type" style={{width:200,  height:35,marginLeft:20}}
              onChange={(e)=>{ setUser({...user,userType:e.target.value});}}
          >
            <option value="manager">Manager</option>
            <option value="developer">Developer</option>
            <option value="qa">QA</option>
          </select>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary " style={{ marginLeft: 120 }}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
