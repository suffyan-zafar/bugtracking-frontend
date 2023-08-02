import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkBugApi } from "../api/bugApi";
import AuthContext from "../context/AuthContext";
const CheckBug=()=>{
  const location = useLocation();
  const [data, setData] = useState([]);
  const { userObject } = useContext(AuthContext);
  const item = location.state;


  const bugAgainstDeveloper= async()=>{
      try{
        const res= await checkBugApi({developer_id: userObject?.user_id, bug_id:item.bug_id })
        setData(res.res);  
      }catch(error){
          console.log(error);
      }
  }

  useEffect(()=>{
    bugAgainstDeveloper();
  },[])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
return (
  <div className="container" style={{ marginTop: 100 }}>
  {item.developer !== null ? <table className="table table-dark table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">Sr#</th>
        <th scope="col">Bug Title</th>
        <th scope="col">Description</th>
        <th scope="col">Type </th>
        <th scope="col">Status </th>
        <th scope="col">DeadLine </th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) =>
        <tr key={index} >
          <th scope="row">{index + 1}</th>
          <td>{item.project_name}</td>
          <td>{item.description}</td>
          <td>{item.type}</td>
          <td>{item.status}</td>
          <td>{formatDate(item.deadline)}</td>
          <td>{<> <Link to="/updatebugstatus" className="btn btn-outline-secondary" state={item} style={{
            color: "white", marginRight: 5, pointerEvents: item.status === "completed" ? "none" : "auto"
          }}  >Update Status</Link></>
          }</td>
        </tr>
      )}


    </tbody>
  </table> : <h1 style={{ color: "green" }}>You Have No New Bugs To Solve!! Wohoo</h1>}

</div>
)
}


export default CheckBug;
