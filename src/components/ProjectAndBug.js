import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { displayProjectWithBugApi } from "../api/bugApi";
const ProjectAndBug = () => {
  const location = useLocation();
  const item = location.state;
  const [data, setData] = useState([]);
  const displayprojectwithbug = async () => {
    try {
      const res = await displayProjectWithBugApi({ project_id: item.project_id });
      setData(res.res);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
  }
  useEffect(() => {
    displayprojectwithbug();
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // const handleImage = (item) => {
  //   console.log(item, "item");
  //   const baseBackendUrl = "http://localhost:8080";
  //   window.open(`${baseBackendUrl}/${item.image}`, '_blank');
  // }

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
            <th scope="col">Created By</th>
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
              <td>{<> <Link to="/checkbug" className="btn btn-outline-secondary" state={item} style={{
                color: "white", marginRight: 5
              }}  >Check Bug</Link></>
              }</td>
            </tr>
          )}


        </tbody>
      </table> : <h1 style={{ color: "green" }}>You Have No New Bugs To Solve!! Wohoo</h1>}

    </div>
  )
}

export default ProjectAndBug;