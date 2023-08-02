import { useState, useEffect } from "react";

import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getProjectDeveloper,assignProjectDeveloper } from "../api/bugApi";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
const AssignDeveloper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [developer, setDeveloper] = useState([]);
  const [developer_id, setDeveloper_Id] = useState("");
  const item = location.state;
  const displayProject = async () => {
    try {
      const res = await getProjectDeveloper({ project_id: item.project_id});
      setDeveloper(res.res)
    } catch (error) {
      console.log(error);
      
    }

  }
  useEffect(()=>{
    displayProject();
  },[]);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await assignProjectDeveloper({project_id: item.project_id, bug_id:item.bug_id,title:item.title,developer_id:developer_id});
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      navigate("/displaybug")
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
      <div className="container" style={{ width: 350, marginTop: 50 }}>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Bug Title
            </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={item.title}

            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Bug Description
            </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={item.description}

            />
          </div>
          

          <div className="mb-3">
            <label htmlFor="developer">Choose Developer:</label>
            <select name="developer" id="developer" style={{ width: 180, height: 35, marginLeft: 7 }}
                value={developer_id}
              onChange={(data) => {
                setDeveloper_Id(data.target.value);
              }}
            >
              <option value="">Select an Option</option>
              {developer?.map((item, index) => (
                <option key={index} value={item.user_id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <button
              className="btn btn-outline-secondary"
              style={{ marginLeft: 70 }}
            >
              Assign Developer
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}


export default AssignDeveloper;