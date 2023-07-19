import { useEffect, useState,useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
const CreateBug=()=>{
  const { userObject } = useContext(AuthContext);
  const [bug,setBug]=useState({title:"", description:"",deadline:Date,type:"",status:"",image:"",bug_creater:`${userObject.user_id}`, project:0,developer:0})
  const [status, setStatus]=useState([]);
  const [project,setProject]=useState([]);
  const [developer,setDeveloper]=useState([""]);
  useEffect(()=>{
    // get project against assign qa
    axios.get(`http://localhost:8080/api/v1/bug/getuserproject/${userObject?.user_id}`)
    .then((response) => {
        setProject(response.data);
    })
    .catch((res) => { console.log(res);});
  },[userObject?.user_id])

  const handleType=(e)=>{
    console.log(e.target.value,"f");
   setBug({...bug,type:e.target.value});

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
  // get developer against selected projecct
  const onProjectChange=(e)=>{
    console.log(e.target.value,"project selected");
     setBug({...bug,project:e.target.value});
    axios.get(`http://localhost:8080/api/v1/bug/getprojectdeveloper/${e.target.value}`)
    .then((response) => {
        console.log(response.data, "data in react");
        setDeveloper(response.data)
    })
    .catch((res) => { console.log(res);});
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
      console.log(bug,"bug object");
      axios.post(`http://localhost:8080/api/v1/bug/addbug`,bug)
      .then((response) => {
         console.log(response.data);
         alert(response.data.message);
      })
      .catch((res) => { console.log(res);});
  }


  return(
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Create New Bug!</h3>
      </div>
      <form onSubmit={handleOnSubmit}>
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
            onChange={(e)=>{ setBug({...bug,title:e.target.value});}}
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
            onChange={(e)=>{ setBug({...bug,description:e.target.value});}}
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
            onChange={(e)=>{ setBug({...bug,deadline:e.target.value});}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type">Choose Type:</label>
          <select name="type" id="type" style={{width:200,  height:35,marginLeft:20}} required
            onChange={handleType}
          >
            <option value="">Select an Option</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status">Choose Status:</label>
          <select name="status" id="status" style={{width:200,  height:35,marginLeft:7}}
          required
           onChange={(e)=>{ setBug({...bug,status:e.target.value});}}
          >
             
              <option value="">Select an Option</option>
            {status.map((item, index)=>(
              <option key={index} value={item}>{item}</option>
            
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
            onChange={(e)=>{ setBug({...bug,image:e.target.value});}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="project">Choose Project:</label>
          <select name="project" id="project" style={{width:190,  height:35,marginLeft:15}} required
              onChange={onProjectChange}
          >
            <option value="">Select an Option</option>
            {project.map((item, index)=>(
            <option key={index} value={item.project_id}>{item.project_title}</option>
            ))}
    
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="developer">Choose Developer:</label>
          <select name="developer" id="developer" style={{width:180,  height:35,marginLeft:7}}
              required
              onChange={(e)=>{ setBug({...bug,developer:e.target.value});}}
          >
            <option value="">Select an Option</option>
            {developer?.map((item, index)=>(
              <option key={index} value={item.user_id}>{item.name}</option>
            ))}
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