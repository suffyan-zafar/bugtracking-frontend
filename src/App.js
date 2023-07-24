import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import { useState } from "react";
function App() {
  const [userObject, setUserObject] = useState(null);

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ userObject, setUserObject }}>
          <Navbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/createproject" element={<CreateProject />} />
            <Route exact path="/assignproject" element={<AssignProject />} />
            <Route exact path="/createbug" element={<CreateBug />} />
            <Route exact path="/displaybug" element={<DisplayBug />} />
            <Route exact path="/displayproject" element={<DisplayProject />} />
            <Route exact path="/projectandbug" element={<ProjectAndBug />} />
            <Route exact path="/updatebugstatus" element={<UpdateBugStatus />} />
          </Routes>
        </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
