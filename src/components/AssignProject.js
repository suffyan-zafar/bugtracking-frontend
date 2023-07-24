import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const AssignProject = () => {
  const { userObject } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxes2, setShowCheckboxes2] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [project, setproject] = useState([]);
  const [users, setUsers] = useState([]);
  const [qa, setQa] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/project/getproject/${userObject?.user_id}`)
      .then((response) => {
        setproject(response.data.res);
      })
      .catch((res) => { console.log(res); });

  }, [])


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

  const handleProjectTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value, "value");
    axios.get(`http://localhost:8080/api/v1/user/getDeveloper/${e.target.value}`)
      .then((response) => {
        console.log(response,"developer");
        setUsers(response.data.res)

      })
      .catch((res) => { console.log(res); });

    axios.get(`http://localhost:8080/api/v1/user/getQa/${e.target.value}`)
      .then((response) => {
        console.log(response,"qa");
        setQa(response.data.res)

      })
      .catch((res) => { console.log(res); });

  }




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedOptions, "selected");
    console.log(selectedOptions2, "selected");
    console.log(title, "selected value");


    axios.post(`http://localhost:8080/api/v1/project/assignproject`, {
      project_id: `${title}`,
      developer_id: `${selectedOptions}`,
      qa_id: `${selectedOptions2}`
    })
      .then((response) => {
        console.log(response.data, "dataa");
        alert(response.data.message);
        setSelectedOptions([]);
        setSelectedOptions2([]);
        navigate("/displayproject");
      })
      .catch((res) => { console.log(res); });

  }
  return (
    <div className="container" style={{ width: 350, marginTop: 50 }}>
      <div className="mb-4">
        <h3>Assign Project To Users!</h3>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <select name="type" id="type" style={{ width: 300, height: 35 }} onClick={handleProjectTitle}>
            <option value="">Select Project</option>
            {project.map((item, index) => <>
              <option key={index} value={item.project_id}>
                {item.project_title}</option></>
            )}
          </select>
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