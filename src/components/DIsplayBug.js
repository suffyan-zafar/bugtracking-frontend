import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
const DisplayBug = () => {
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    // get project against assign qa
    axios.get(`http://localhost:8080/api/v1/bug/displayBug/${userObject?.user_id}`)
      .then((response) => {
     
        setData(response.data.res);
      })
      .catch((res) => { console.log(res); });
  }, [userObject?.user_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleDelete = (bugObj) => {
    console.log(bugObj, "delete bug");
    axios.delete(`http://localhost:8080/api/v1/bug/deletebug/${bugObj?.bug_id}/${bugObj?.image}`)
      .then((response) => {
        console.log(response, "response  ");
        alert(response.data.message);
        setData((prevData) => prevData.filter((item) => item.bug_id !== bugObj.bug_id));

      })
      .catch((res) => { console.log(res); });
  }

  const handleImage=(image)=>{
    console.log(image,"image");
      const baseBackendUrl="http://localhost:8080";
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
                <button className="btn btn-outline-secondary" style={{ color: "white" }} onClick={() => handleImage(item)}>  View </button></>
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