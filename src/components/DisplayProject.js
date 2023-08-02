import { useEffect, useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { deleteProjectApi, displayProjectApi } from "../api/projectApi";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
const DisplayProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const item=location.state;
  console.log(item,"atom");
  const displayProject = async () => {
    try {
      const res = await displayProjectApi({ user_id: userObject?.user_id, project_id:item.project_id });
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

  const handleDelete = async (projectObj) => {
    try {
      const res = await deleteProjectApi({ project_id: projectObj.project_id });
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setData((prevData) => prevData.filter((item) => item.project_id !== projectObj.project_id));
      navigate("/home")
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }

  }

  const AssignProject=()=>{
    navigate("/assignproject");
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
            <th scope="col">Action</th>
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
                <>
                <button className="btn btn-outline-secondary" style={{ color: "white", pointerEvents: (item.developer || item.qa) === null ? "auto" : "none"
               }} onClick={() => handleDelete(item)}>  Delete Project </button>
                <Link to="/unassigneddeveloper" state={item} className="btn btn-outline-secondary" style={{ color: "white" , marginLeft:20}}> UnAssigned Dev </Link> 
                <Link to="/unassignedqa" state={item} className="btn btn-outline-secondary" style={{ color: "white" , marginLeft:20 }}> UnAssigned qa </Link></>
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