import { useEffect, useState,useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
const CreateBug=()=>{
  const [status, setStatus]=useState([]);
  const [feature,setFeature]=useState("");
  const [project,setProject]=useState([]);
  const { userObject } = useContext(AuthContext);
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/v1/bug/getUserProject/${userObject?.user_id}`)
    .then((response) => {
        console.log(response.data, "data in react");
        setProject(response.data);
    })
    .catch((res) => { console.log(res);});
  },[])

  const handleType=(e)=>{
    console.log(e.target.value,"f");
    setFeature(e.target.value);

    if(e.target.value==="feature"){
      console.log("in if");
      setStatus(["new","started","completed"]);
    }
    else if(e.target.value==="bug"){
      setStatus(["new","started","resolved"]);
    }
    else{
      setStatus([]);
    }
  }


  return(
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Create New Bug!</h3>
      </div>
      <form >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Bug Title"
            required
           
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter Bug Description"
            required
 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deadline" >Bug DeadLine</label>
          <input 
            type="date"
            className="form-control"
            id="deadline"
            placeholder="Enter Bug Deadline"
            required
 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Type:</label>
          <select name="type" id="type" style={{width:200,  height:35,marginLeft:20}}
            onChange={handleType}
          >
            <option value="">Select an Option</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Status:</label>
          <select name="type" id="type" style={{width:200,  height:35,marginLeft:7}}

          >
             
              <option value="">Select an Option</option>
            {status.map((item)=>(
              <option value={item}>{item}</option>
            
            ))}
            
    
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Enter Bug image"
            required
 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Project:</label>
          <select name="type" id="type" style={{width:190,  height:35,marginLeft:15}}

          >
            <option value="">Select an Option</option>
            {project.map((item)=>(

            <option value={item.project_id}>{item.project_title}</option>
            ))}
    
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Developer:</label>
          <select name="type" id="type" style={{width:180,  height:35,marginLeft:7}}

          >
            <option value="">Select an Option</option>
            <option value="feature">Suffyan</option>
            <option value="bug">Ali</option>
          </select>
        </div>
      
        <div className="mb-3">
          <button className="btn btn-primary " style={{ marginLeft: 120 }}>
            Create Bug
          </button>
        </div>
      </form>
    </div>
  )
  }
  
  
  export default CreateBug;