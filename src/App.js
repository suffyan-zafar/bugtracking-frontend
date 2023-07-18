import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
import About from "./components/About";
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
import { useState } from "react";
function App() {
const [userObject, setUserObject]=useState(null);

  return (
    <>
      <Router>
    <AuthContext.Provider value={{userObject,setUserObject}}>
       <Navbar/> 
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/createproject" element={<CreateProject />} />
          <Route exact path="/assignproject" element={<AssignProject />} />
          <Route exact path="/createbug" element={<CreateBug />} />
          <Route exact path="/displaybug" element={<DisplayBug />} />
          <Route exact path="/displayproject" element={<DisplayProject />} />
        </Routes>
      </AuthContext.Provider>
      </Router>
    </>
  );
}

export default App;
