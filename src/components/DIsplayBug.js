import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
const DisplayBug = () => {
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    // get project against assign qa
    axios.get(`http://localhost:8080/api/v1/bug/displayBug/${userObject?.user_id}`)
      .then((response) => {
        console.log(response.data, "data");
        setData(response.data);
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
      <table className="table table-dark table-hover table-bordered">
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.creater_name}</td>
              <td>{item.project_name}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{formatDate(item.deadline)}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.developer_name}</td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  )
}


export default DisplayBug;