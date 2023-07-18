import React, {useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext';


import {  useNavigate } from "react-router-dom";
const Home=()=>{
    const userObject = useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/home")
        }
        else{
            navigate("/login")
        }
    },[]);
    return(
        <div>
            <h3> Wellcome To {userObject.userObject?.role_name} DashBoard {userObject.userObject?.name}!!!</h3>
        </div>
    )
}


export default Home;