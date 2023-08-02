import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addProjectApi } from "../api/projectApi";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
const CreateProject = () => {
  const [title, setTitle] = useState("");
  const { userObject } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProjectApi({ title: title, manager_id: userObject.user_id })
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setTitle("");
      navigate('/home');
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
  };
  return (
    <div>
      <div className="container" style={{ width: 350, marginTop: 50 }}>

        <div className="mb-4">
          <h3>Create New Project</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Project Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Project Title"
              required
              value={title}
              onChange={(data) => {
                setTitle(data.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-outline-secondary"
              style={{ marginLeft: 70 }}
            >
              Create New Project
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}


export default CreateProject;