import { useEffect, useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { deleteProjectApi, displayProjectAgainstManagerApi } from "../api/projectApi";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
const ManagerProject=()=>{
  const navigate = useNavigate();
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const displayProject = async () => {
    try {
      const res = await displayProjectAgainstManagerApi({ user_id: userObject?.user_id });
      console.log(res,"raaas");
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

  // const handleDelete = async (projectObj) => {
  //   try {
  //     const res = await deleteProjectApi({ project_id: projectObj.project_id });
  //     alert(res.message);
  //     setData((prevData) => prevData.filter((item) => item.project_id !== projectObj.project_id));
  //   } catch (error) {
  //     alert(error?.response?.data?.message)
  //   }

  // }

  // const AssignProject=()=>{
  //   navigate("/assignproject");
  // }
  return (
    <div className="container" style={{ marginTop: 100 }}>
      {data.length > 0 ? <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr#</th>
            <th scope="col">Project Title</th>
            <th scope="col">Action </th>
         
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.project_title}</td>
              {/* <td>{
                <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleDelete(item)}>  Delete Project </button>
              }

              </td> */}
              <td>{<>
                <Link to="/assignproject" state={item} className="btn btn-outline-secondary" style={{ color: "white" }}> Assign Project </Link>
                <Link to="/displayproject" state={item} className="btn btn-outline-secondary" style={{ color: "white", marginLeft:20 }}> Project Detail </Link></>
              }
              </td>
            </tr>
          ))}


        </tbody>
      </table> : <h1 style={{ color: "red" }}>Project Not Found!! Please Create A New Project</h1>}

    </div>
  )
}

export default ManagerProject;