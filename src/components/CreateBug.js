import { useEffect, useState, useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProjectDeveloper, addBugApi } from "../api/bugApi";
const CreateBug = () => {
  const { userObject } = useContext(AuthContext);
  const location = useLocation();
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  const navigate = useNavigate();
  const [bug, setBug] = useState({ title: "", description: "", deadline: Date, type: "", status: "", image: "", bug_creater: `${userObject.user_id}`, project: 0, developer: 0 })
  const [status, setStatus] = useState([]);
  const [developer, setDeveloper] = useState([""]);
  const item=location.state;

  const handleType = (e) => {
    setBug({ ...bug, type: e.target.value });

    if (e.target.value === "feature") {

      setStatus(["new", "started", "completed"]);
    }
    else if (e.target.value === "bug") {
      setStatus(["new", "started", "resolved"]);
    }
    else {
      setStatus([]);
    }
  }
  // get developer against selected projecct
  const onProjectChange = async () => {
    setBug({ ...bug, project: item.project_id });
    try {
      const res = await getProjectDeveloper({ project_id: item.project_id  })

      setDeveloper(res.res)
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });  
    }

  }

  useEffect(() => {
    // get project against assign qa
    onProjectChange();
  }, [])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.append("title", bug.title);
    Data.append("description", bug.description);
    Data.append("deadline", bug.deadline);
    Data.append("type", bug.type);
    Data.append("status", bug.status);
    const imageFile=e.target.image.files[0];
    if(imageFile){
      Data.append("image", imageFile);    // Get the selected file from the file input
    }
    else{
      Data.append("image",null);
    }

    Data.append("bug_creater", userObject.user_id);
    Data.append("project", bug.project);
    Data.append("developer", bug.developer);
    try {
      const res = await addBugApi(Data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      navigate("/qaproject")
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
  }


  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Create New Bug!</h3>
      </div>
      <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            readOnly
            value={item.project_title}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter Bug Title"
            required
            onChange={(e) => { setBug({ ...bug, title: e.target.value }); }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Bug Description"
            onChange={(e) => { setBug({ ...bug, description: e.target.value }); }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" >Bug DeadLine</label>
          <input
            type="date"
            min={formattedCurrentDate}
            className="form-control"
            id="deadline"
            placeholder="Enter Bug Deadline"
            name="deadline"
            required
            onChange={(e) => { setBug({ ...bug, deadline: e.target.value }); }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Type:</label>
          <select name="type" id="type" style={{ width: 200, height: 35, marginLeft: 20 }} required
            onChange={handleType}
          >
            <option value="">Select an Option</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status">Choose Status:</label>
          <select name="status" id="status" style={{ width: 200, height: 35, marginLeft: 7 }}
            required
            onChange={(e) => { setBug({ ...bug, status: e.target.value }); }}
          >

            <option value="">Select an Option</option>
            {status.map((item, index) => (
              <option key={index} value={item}>{item}</option>

            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            id="image"
            placeholder="Enter Bug image"
            onChange={(e) => { setBug({ ...bug, image: e.target.value });}}
          />
        </div>
      
        <div className="mb-3">
          <label htmlFor="developer">Choose Developer:</label>
          <select name="developer" id="developer" style={{ width: 180, height: 35, marginLeft: 7 }}
            onChange={(e) => { setBug({ ...bug, developer: e.target.value }); }}
          >
            <option value="">Select an Option</option>
            {developer?.map((item, index) => (
              <option key={index} value={item.user_id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary " style={{ marginLeft: 120 }}>
            Create Bug
          </button>
        </div>
      </form>
    </div>
  )
}


export default CreateBug;