import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { deleteBugApi, displayBugApi } from "../api/bugApi";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const DisplayBug = () => {
  const location = useLocation();
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const item = location.state;
  const displayBug = async () => {
    try {
      const res = await displayBugApi({ user_id: userObject?.user_id, project_id: item.project_id});
      setData(res.res);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    
    }
  }
  useEffect(() => {
    // get project against assign qa
    displayBug();
  }, []);

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleDelete = async (bugObj) => {
    try {
      const res = await deleteBugApi({ bug_id: bugObj?.bug_id, image: bugObj?.image });
      toast.error(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setData((prevData) => prevData.filter((item) => item.bug_id !== bugObj.bug_id));
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
  }

  const handleImage = (image) => {
    const baseBackendUrl = "http://localhost:8080";
    window.open(`${baseBackendUrl}/${image.image}`, '_blank');
  }

  return (
    <div className="container" style={{ marginTop: 100 }}>
      {data?.length > 0 ? <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr#</th>
            <th scope="col">Creater Name</th>
            <th scope="col">Project Name</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">DeadLine </th>
            <th scope="col">Type </th>
            <th scope="col">Status </th>
            <th scope="col">Developer Name </th>
            <th scope="col">Actions </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.creater_name}</td>
              <td>{item.project_name}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{formatDate(item.deadline)}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.developer_name}</td>
              <td>{<><Link to="/updatebugstatus" state={item} className="btn btn-outline-secondary" style={{ color: "white" }}>Update Status</Link>
                <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleDelete(item)}>  Delete </button>
                <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleImage(item)}>  View </button>
                <Link to="/assigndeveloper" state={item} className="btn btn-outline-secondary"style={{
                color: "white", marginRight: 5, pointerEvents: item.developer_name === null ? "auto" : "none"
              }}>Assign Developer</Link></>
              }

              </td>
            </tr>
          ))}


        </tbody>
      </table> : <h1 style={{ color: "red" }}>Bug Not Found!! Please Create A New Bug</h1>}

    </div>
  )
}


export default DisplayBug;