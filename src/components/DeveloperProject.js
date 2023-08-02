import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {  getProjectAgainstDeveloperApi } from "../api/projectApi";
const DeveloperProject=()=>{
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const displayProject = async () => {
    try {
      const res = await getProjectAgainstDeveloperApi({ user_id: userObject?.user_id });
      setData(res.res);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
  }
  useEffect(() => {
    displayProject()
  }, [])
  return (
    <div className="container" style={{ marginTop: 100 }}>
    {data.length > 0 ? <table className="table table-dark table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Sr#</th>
          <th scope="col">Manager Name</th>
          <th scope="col">Project Title</th>
          <th scope="col">Developer</th>
          <th scope="col">Action </th>
       
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.manager_name}</td>
            <td>{item.project_name}</td>
            <td>{item.name}</td>
            {/* <td>{
              <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleDelete(item)}>  Delete Project </button>
            }

            </td> */}
            <td>{
              <Link to="/projectandbug" state={item} className="btn btn-outline-secondary" style={{ color: "white" }}> Show Bug </Link>
            }
            </td>
          </tr>
        ))}


      </tbody>
    </table> : <h1 style={{ color: "red" }}>Project Not Found!! Please Create A New Project</h1>}

  </div>
  )
}


export default DeveloperProject;