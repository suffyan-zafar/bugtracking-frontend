import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const DisplayProject = () => {
  const { userObject } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/project/displayproject/${userObject?.user_id}`)
      .then((response) => {
        setData( response.data);
      })
      .catch((res) => { console.log(res); });
  }, [])
  return (
    <div className="container" style={{marginTop:100}}>
      <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr#</th>
            <th scope="col">Manager Name</th>
            <th scope="col">Role</th>
            <th scope="col">Project Title</th>
            <th scope="col">Developer</th>
            <th scope="col">Qa Name </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index)=>(
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.role_name}</td>
            <td>{item.project_title}</td>
            <td>{item.developer}</td>
            <td>{item.qa}</td>
          </tr>
          ))}
          
         
        </tbody>
      </table>
    </div>
  )
}


export default DisplayProject;