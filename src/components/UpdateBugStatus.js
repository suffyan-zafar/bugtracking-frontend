import { useEffect, useState,useContext } from "react";
import { useLocation,Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
const UpdateBugStatus=()=>{
  const { userObject } = useContext(AuthContext);
  const location = useLocation();
  const [status, setStatus]=useState(["new","started","completed"]);
  const [status2, setStatus2]=useState(["new","started","resolved"]);
  const [selected, setSelected]=useState("");

  
  const item=location.state;

  useEffect(()=>{
    if(item.type==="feature"){
      console.log("in if");
      setStatus(status.filter((items)=>{ return items!==item.status}))
    }
    else{
      setStatus2(status2.filter((items)=>{ return items!==item.status}))
    }
  },[])
  console.log(location,"in update status component");
 
  const onSubmit=(e)=>{
    e.preventDefault();

    console.log(selected, "value");
    console.log(userObject.user_id, "user" );
    console.log(item.type,"type");
    axios.post(`http://localhost:8080/api/v1/bug/updatebugstatus`,{
      status:selected,
      user_id:userObject.user_id,
      type:item.type
    })
    .then((response) => {
       console.log(response.data);
       alert(response.data.message);
    })
    .catch((res) => { console.log(res);});

  }
  return(
    <div className="container" style={{ width: 350, marginTop: 50 }}>
    <div className="mb-4">
      <h3>Update Status Of Project!</h3>
    </div>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
         Project Name
        </label>
        <input
          type="text"
          className="form-control"
          readOnly
          value={item.project_name}
     
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Project Type
        </label>
        <input
          type="text"
          className="form-control"
          readOnly
          value={item.type}
          
        />
      </div>

      <div className="mb-3">
        <label htmlFor="type">Choose status:</label>
        <select name="status" id="status" style={{width:200,  height:35,marginLeft:10}}
        onChange={(e)=>{setSelected(e.target.value)}}
        >
          <option value="">Select an Option</option>
          {item.type==="feature" ? status.map((item , index)=>(<option key={index} value={item}>{item}</option>))  :
          status2.map((item,index)=>(<option key={index}  value={item}>{item}</option>))
          }
         
      
        </select>
      </div>
      <div className="mb-3">
        <button className="btn btn-outline-secondary" style={{ marginLeft: 40 }}>
          Update Status
        </button>
        <Link to="/projectandbug"  className="btn btn-outline-secondary"  style={{marginLeft:10}}>Back</Link>
      </div>
    </form>
  </div>
  )
}

export default UpdateBugStatus