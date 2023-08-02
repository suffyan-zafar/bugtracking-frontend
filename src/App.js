import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from './components/Login';
import Signup from "./components/Signup";
import Navbar from './components/Navbar';
import AuthContext from "./context/AuthContext";
import CreateProject from "./components/CreateProject";
import AssignProject from "./components/AssignProject";
import CreateBug from "./components/CreateBug";
import DisplayBug from "./components/DIsplayBug";
import DisplayProject from "./components/DisplayProject";
import ProjectAndBug from "./components/ProjectAndBug";
import UpdateBugStatus from "./components/UpdateBugStatus";
import DeveloperProject from "./components/DeveloperProject";
import AssignDeveloper from "./components/AssignDeveloper";
import CheckBug from "./components/CheckBug";
import QaProject from "./components/QaProject";
import { useState } from "react";
import ManagerProject from "./components/ManagerProject";
import UnAssignedDeveloper from "./components/UnAssignedDeveloper";
import UnAssignedQa from "./components/UnAssignedQa";
function App() {
  const [userObject, setUserObject] = useState(null);
  console.log(userObject, "in app component");

  const isAuthenticated = (role) => {
    return userObject && userObject.role_name === role;
  };


  console.log(isAuthenticated("manager"), "hehehe");
  const managerRoutes = (
    <>
      <Route exact path="/createproject" element={<CreateProject />} />
      <Route exact path="/assignproject" element={<AssignProject />} />
      <Route exact path="/displayproject" element={<DisplayProject />} />
      <Route exact path="/managerproject" element={<ManagerProject />} />
      <Route exact path="/unassigneddeveloper" element={<UnAssignedDeveloper />} />
      <Route exact path="/unassignedqa" element={<UnAssignedQa />} />
    </>
  )

  const qaRoutes = (
    <>
      <Route exact path="/qaproject" element={<QaProject />} />
      <Route exact path="/createbug" element={<CreateBug />} />
      <Route exact path="/displaybug" element={<DisplayBug />} />
      <Route exact path="/assigndeveloper" element={<AssignDeveloper />} />
      <Route exact path="/updatebugstatus" element={<UpdateBugStatus />} />
    </>
  )


  const developerRoutes = (
    <>
      <Route exact path="/developerproject" element={<DeveloperProject />} />
      <Route exact path="/projectandbug" element={<ProjectAndBug />} />
      <Route exact path="/checkbug" element={<CheckBug />} />
      <Route exact path="/updatebugstatus" element={<UpdateBugStatus />} />
    </>
  )


  return (
    <>
      <Router>
        <AuthContext.Provider value={{ userObject, setUserObject }}>
          <Navbar />
          <Routes>
            {/* public routes */}
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            {/* Manager ROute */}
            {userObject && (
              <>
                {userObject.role_name === "manager" && managerRoutes}
                {userObject.role_name === "developer" && developerRoutes}
                {userObject.role_name === "qa" && qaRoutes}

              </>
            )}
            <Route path="*" element={<Login />} />

            {/* qa routes */}


            {/* developer ROutes */}



          </Routes>
          <ToastContainer />
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
