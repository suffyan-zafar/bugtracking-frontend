import React, {useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext';

import { Link, useNavigate } from "react-router-dom";
const Home=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/home")
        }
        else{
            navigate("/login")
        }
    },[]);
    const userObject = useContext(AuthContext);
    console.log(userObject.userObject?.email, "safsa");
    return(
        <div>
            <h3> Wellcome To {userObject.userObject?.role_name} DashBoard {userObject.userObject?.name}!!!</h3>
        </div>
    )
}


export default Home;