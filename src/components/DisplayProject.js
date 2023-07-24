import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const DisplayProject = () => {
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/project/displayproject/${userObject?.user_id}`)
      .then((response) => {
        console.log(response.data.res, "display project");
        setData(response.data.res);
      })
      .catch((res) => { console.log(res); });
  }, [])

  const handleDelete = (projectObj) => {
    console.log(projectObj.project_id, "prokject");
    axios.delete(`http://localhost:8080/api/v1/project/deleteproject/${projectObj.project_id}`)
      .then((response) => {
        console.log(response.data, "delete project");
        alert(response.data.message);
        setData((prevData) => prevData.filter((item) => item.project_id !== projectObj.project_id));
      })
      .catch((res) => { console.log(res); });
  }
  return (
    <div className="container" style={{ marginTop: 100 }}>
      {data.length > 0 ? <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr#</th>
            <th scope="col">Manager Name</th>
            <th scope="col">Role</th>
            <th scope="col">Project Title</th>
            <th scope="col">Developer</th>
            <th scope="col">Qa Name </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.role_name}</td>
              <td>{item.project_title}</td>
              <td>{item.developer}</td>
              <td>{item.qa}</td>
              <td>{
                <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleDelete(item)}>  Delete Project </button>
              }

              </td>
            </tr>
          ))}


        </tbody>
      </table> : <h1 style={{ color: "red" }}>Project Not Found!! Please Create A New Project</h1>}

    </div>
  )
}


export default DisplayProject;