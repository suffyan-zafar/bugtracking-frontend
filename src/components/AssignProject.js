import {useState,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

import { useNavigate,useLocation } from "react-router-dom";
import { GetDeveloperApi, GetQaApi } from "../api/userApi";
import { assignProjectApi } from "../api/projectApi";
const AssignProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxes2, setShowCheckboxes2] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [users, setUsers] = useState([]);
  const [qa, setQa] = useState([]);
  const [title, setTitle] = useState("");


  const handleSelectorClick = () => {
    setShowCheckboxes(!showCheckboxes);
    setSelectedOptions([]);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, parseInt(option)]);
    }
  };
  const handleSelectorClick2 = () => {
    setShowCheckboxes2(!showCheckboxes2);
    setSelectedOptions2([]);
  };
  const handleCheckboxChange2 = (option) => {
    if (selectedOptions2.includes(option)) {
      setSelectedOptions2(selectedOptions2.filter((item) => item !== option));
    } else {
      setSelectedOptions2([...selectedOptions2, parseInt(option)]);
    }
  }

    const GetDeveloperApii= async()=>{
      try {
        const res = await GetDeveloperApi({ project_id: item.project_id });
        setUsers(res.res);
      } catch (error) {
        console.log(error);
      }
    }

    const GetQaApii= async()=>{

    try {
      const res = await GetQaApi({ project_id:  item.project_id});
      setQa(res.res);
    } catch (error) {
      console.log(error);
    }
    }

    useEffect(()=>{
      GetDeveloperApii();
      GetQaApii();
    },[])

  // const handleProjectTitle = async (e) => {
  //   setTitle(e.target.value);
  //   console.log(e.target.value, "value");
  //   try {
  //     const res = await GetDeveloperApi({ project_id: e.target.value });
  //     console.log(
  //       "asdas"
  //     );
  //     setUsers(res.res);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   try {
  //     const res = await GetQaApi({ project_id: e.target.value });
  //     setQa(res.res);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    try {
      const res = await assignProjectApi({ project_id: item.project_id, developer_id: selectedOptions, qa_id: selectedOptions2 });
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setSelectedOptions([]);
      setSelectedOptions2([]);
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
   
    }
  }
  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Assign Project To Users!</h3>
      </div>
      <form onSubmit={handleSubmit} >
      
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            readOnly
            value={item.project_title}
          />
        </div>

        <div>
          <div onClick={handleSelectorClick} style={{ cursor: "pointer" }}>Click here to select Developers</div>
          {showCheckboxes && (

            <div>

              {users.map((item) => (
                <div key={item.user_id}>
                  <label style={{ fontSize: 20, marginTop: 8 }}>
                    {item.name}
                  </label>
                  <input style={{ marginLeft: 20, cursor: "pointer" }}
                    type="checkbox"
                    checked={selectedOptions.includes(item.user_id)}
                    onChange={() => handleCheckboxChange(item.user_id)}
                  /> </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div onClick={handleSelectorClick2} style={{ cursor: "pointer", marginTop: 20 }}>Click here to select QA</div>
          {showCheckboxes2 && (
            <div>
              {qa.map((item) => (
                <div key={item.user_id}>
                  <label style={{ fontSize: 20, marginTop: 8 }}>
                    {item.name}
                  </label>
                  <input style={{ marginLeft: 20, cursor: "pointer" }}
                    type="checkbox"
                    checked={selectedOptions2.includes(item.user_id)}
                    onChange={() => handleCheckboxChange2(item.user_id)}
                  /> </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary " style={{ marginLeft: 90 }}>
            Assign Project
          </button>
        </div>
      </form>
    </div>
  )
}


export default AssignProject;