import React   ,{useContext}           from 'react'
import { Navigate,Route } from "react-router-dom";
import AuthContext        from '../Context/AuthContext';

const ProtectedRoutes = props=> {
    let {user}    = useContext(AuthContext)
    console.log('');
    if(user.role==="administrator"){
       return <Route {...props} />
    }
  return  < Navigate to='/' />
}

export default ProtectedRoutes