import {useState,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { useNavigate,useLocation } from "react-router-dom";
import { GetDeveloperForUnassign } from "../api/userApi";
import { unAssignDeveloper } from "../api/userApi";
const UnAssignedDeveloper=()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [users, setUsers] = useState([]);
console.log(item, "atom");
  const handleSelectorClick = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, parseInt(option)]);
    }
  };

    const GetDeveloperApii= async()=>{
      try {
        const res = await GetDeveloperForUnassign({ project_id: item.project_id });
        setUsers(res.res);
      } catch (error) {
        console.log(error);
      }
    }



    useEffect(()=>{
      GetDeveloperApii();
    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedOptions,"opyions");
    try {
      const res = await unAssignDeveloper({ project_id: item.project_id, developer_id: selectedOptions});
      navigate("/home")
      toast.success(res.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
      setSelectedOptions([]);
      // navigate("/home");
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
        <h3>Un-Assign Developer From Project!</h3>
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
          <div onClick={handleSelectorClick} style={{ cursor: "pointer", fontSize:20 }}>Click here to select Developers</div>
          {showCheckboxes && (
            <div>
              { users.length > 0 ?  users.map((item) => (
                <div key={item.user_id}>
                  <label style={{ fontSize: 20, marginTop: 8 }}>
                    {item.name}
                  </label>
                  <input style={{ marginLeft: 20, cursor: "pointer" }}
                    type="checkbox"
                    checked={selectedOptions.includes(item.user_id)}
                    onChange={() => handleCheckboxChange(item.user_id)}
                  /> </div>
              )) : <h4 style={{color:"red" , marginTop:15}}>No Developer Found</h4>
            }
            </div>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary " style={{ marginLeft: 90 }}>
            Un-Assign Developer
          </button>
        </div>
      </form>
    </div>
  )
}

export default UnAssignedDeveloper;