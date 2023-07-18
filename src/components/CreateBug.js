import { useState } from "react";

const CreateBug=()=>{
  const [status, setStatus]=useState(["new","started","completed"]);
  const [status2, setStatus2]=useState(["new","started","resolved"]);
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
            {status2.forEach((item)=>{
              <>
              <option value="">Select an Option</option>
            <option value={item}>{item}</option>
            </>
            })}
            
    
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter Bug image"
            required
 
          />
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
          <label htmlFor="type">Choose Project:</label>
          <select name="type" id="type" style={{width:190,  height:35,marginLeft:15}}

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