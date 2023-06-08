import { createContext, useEffect, useState } from "react";
import jwt_decode  from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext  = createContext()

export default AuthContext

export const AuthProvider=({children})=>{

    let [authToken,setAuthToken] =useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) :null)
    let [user,setUser] =useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) :null)
    let [loading,setLoading] = useState(true)

    const Navigate = useNavigate()

    let LoginUser=async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:9020/api/v1/users/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        let data = await response.json()
        // let role = user.role
        let accessData = jwt_decode(data.access)
        let role = accessData.role
        if(response.status===200 && role === "administrator"){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken',JSON.stringify(data))
            Navigate('/homes')
        }
        if(response.status===200 && role==="users"){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken',JSON.stringify(data))
            Navigate('/maker')
        }
        else{
            alert('something went wrong during login!')
        }
    }

    let Logout=()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        Navigate("/")
    }

    let UpdateToken =async (e)=>{
        console.log("Updated Tokens Refresh Called !");
        let response = await fetch('http://localhost:9020/api/users/refresh-token/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'refresh':authToken.refresh})
        })
        let data = await response.json()
        if(response.status===200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken',JSON.stringify(data))
        }else{
            Logout()
        }
    }

    let contextData={
        user:user,
        authToken:authToken,
        LoginUser:LoginUser,
        Logout:Logout,
        UpdateToken:UpdateToken
    }

    useEffect(()=>{
        setLoading(true)
        let fourMinutes = 1000 * 60 * 4;
        let interval=setInterval(()=>{
            if(authToken){
                UpdateToken()
            }
        },fourMinutes)
        return ()=>clearInterval(interval)
        
    },[authToken,loading]);

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}