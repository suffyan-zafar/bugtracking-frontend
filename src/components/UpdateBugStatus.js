import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { updateBugStatusApi } from "../api/bugApi";
const UpdateBugStatus = () => {
  const { userObject } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(["new", "started", "completed"]);
  const [status2, setStatus2] = useState(["new", "started", "resolved"]);
  const [selected, setSelected] = useState("");
  const item = location.state;
  useEffect(() => {
    if (item.type === "feature") {
      setStatus(status.filter((items) => { return items !== item.status }))
    }
    else {
      setStatus2(status2.filter((items) => { return items !== item.status }))
    }
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const res=await updateBugStatusApi({ status: selected,   bug_id: item.bug_id,   type: item.type});
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      if (userObject.role_name === "developer") {
        navigate("/home");
      }
      else {
        navigate("/qaproject");
      }
    }catch(error){
      toast.success(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }

  }
  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Update Status Of Project!</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            readOnly
            value={item.project_name}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Project Type
          </label>
          <input
            type="text"
            className="form-control"
            readOnly
            value={item.type}

          />
        </div>

        <div className="mb-3">
          <label htmlFor="type">Choose status:</label>
          <select name="status" id="status" style={{ width: 200, height: 35, marginLeft: 10 }}
            onChange={(e) => { setSelected(e.target.value) }}
          >
            <option value="">Select an Option</option>
            {item.type === "feature" ? status.map((item, index) => (<option key={index} value={item}>{item}</option>)) :
              status2.map((item, index) => (<option key={index} value={item}>{item}</option>))
            }


          </select>
        </div>
        <div className="mb-3">
          <button className="btn btn-outline-secondary" style={{ marginLeft: 40 }}>
            Update Status
          </button>

        </div>
      </form>
    </div>
  )
}

export default UpdateBugStatus