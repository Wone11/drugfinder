import React  ,{useContext}            from 'react'
import { Navigate,Route } from "react-router-dom";
import AuthContext        from '../Context/AuthContext';
// import jwtDecode          from 'jwt-decode';

const ProtectedRoutes = props=> {
    let {user}    = useContext(AuthContext)

    // let token = jwtDecode(UpdateToken)
    if(user.role==="user"){
       return <Route {...props} />
    }
  return  < Navigate to='/' />
}

export default ProtectedRoutes