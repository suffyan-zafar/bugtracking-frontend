import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
const ProjectAndBug = () => {
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {

    axios.get(`http://localhost:8080/api/v1/bug/displayprojectwithbug/${userObject?.user_id}`)
      .then((response) => {
        console.log(response.data, "data");
        setData(response.data.res);
      })
      .catch((res) => { console.log(res); });
  }, [userObject?.user_id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <div className="container" style={{ marginTop: 100 }}>
      {data.length > 0 ? <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr#</th>
            <th scope="col">Project Name</th>
            <th scope="col">Bug Title</th>
            <th scope="col">Description</th>
            <th scope="col">Type </th>
            <th scope="col">Status </th>
            <th scope="col">DeadLine </th>
            <th scope="col">Assigned By</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => 
            <tr key={index} >
              <th scope="row">{index + 1}</th>
              <td>{item.project_name}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{formatDate(item.deadline)}</td>
              <td>{item.creater_name}</td>
              <td>{<Link to="/updatebugstatus" state={item} style={{ color: "white",pointerEvents: item.status === "completed" ? "none" : "auto"
                    }}  >Update Status</Link>}</td>
            </tr>
          )}


        </tbody>
      </table> : <h1 style={{ color: "green" }}>You Have No New Bugs To Solve!! Wohoo</h1>}

    </div>
  )
}

export default ProjectAndBug;