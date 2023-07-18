import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const { userObject } = useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/v1/project/addproject`, {
      title: `${title}`,
      manager_id: `${userObject.user_id}`
    })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        setTitle("");
      })
      .catch((err) => {
        console.log(err, "err");
      });
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