import React,{ createContext, useContext, useEffect, useState } from "react";
import jwt_decode  from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext  = createContext()

export default AuthContext

export const AuthProvider=({children})=>{
    const Navigate = useNavigate()
    let [authToken,setAuthToken] =useState(()=>localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) :null)
    let [user,setUser] =useState(()=>localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) :null)
    let [loading,setLoading] = useState(true)
    const [auth,setAuth]   = useState()

    let LoginUser=async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:9020/api/users/v1/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        let data = await response.json()
        window.alert('message : ' + data.msg);

        // let role = user.role
        setAuthToken(data)
        setUser(jwt_decode(data.accessToken))
        localStorage.setItem('accessToken',JSON.stringify(data))

        setAuth(user)

        let role = ''
        if(data.accessToken!==undefined){
            let accessData = jwt_decode(data.accessToken)
            role = accessData.role
            setAuthToken(true)
        }

        console.log('role : ' + role);
        if(role === "administrator"){           
            Navigate('/stores')
            window.location.reload(true)            
        }
        if(role==="user"){
            Navigate('/add-items')
            window.location.reload(true) 
        }
        if(!user){
            Navigate('/')
        }
    }

    //subscriptions method!
    let Subscriptions = async(e)=>{
        //to do something here...

    }

    /**
     * forgot password to generate and got  token trough an emails
     * @param {*} e 
     */
    let ForgotPassword = async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:9020/api/users/v1/forgot-password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'email':e.target.email.value})
        })
        // let data = await response.json()
        Navigate('/reset-password')
        
        // window.alert('message : ' + data.msg);
    }

    /**
     * Reset password after token got though an email is correct
     * @param {*} e 
     */
    let ResetPassword =async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:9020/api/users/v1/change-password-public',{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'accessToken':e.target.accessToken.value,'password':e.target.password.value,'confirmPassword':e.target.confirmPassword.value})
        })
        let data = await response.json()
        window.alert('message : ' + data.msg);
    }

    /**
     * New user Registrations here!
     * @param {*} e 
     */
    let RegisterNewUser=async(e)=>{
        e.preventDefault()
        const userID =0
        const status ='inactive'
        const remark =''
        const loginStatus='logOut'
        const accessToken=''
        const role ='user'
        let response = await fetch('http://localhost:9020/api/users/v1/add-new-user',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({
                'userID': userID, 'email': e.target.email.value,
                'city': e.target.city.value, 'password': e.target.password.value,
                'role': role,'accessToken':accessToken,
                'loginStatus': loginStatus, 'status': status,
                'authorizationDocument': e.target.authorizationDocument.value, 'remark': remark,
                'phoneNumber': e.target.phoneNumber.value, 'fullName': e.target.fullName.value,
            })
        })
        let data = await response.json()
        window.alert('response : ' + data.msg);
        window.location.reload(true)
    }

    let Logout=()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('accessToken')
        Navigate("/login")

        // axios.patch(`http://localhost:9020/api/users/v1/logout/${user.userID}`)
        // .then((response)=>{
        // }).catch(error=>{window.alert('error during logout : ' + error)})
    }

    let UpdateToken =async (e)=>{
        console.log("Updated Tokens Refresh Called !");
        let response = await fetch('http://localhost:9020/api/users/v1/refresh-token/',{
            method:"POST",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({'refresh':authToken.refreshToken})
        })
        console.log('refreshToken :' + authToken.tefreshToken);
        let data = await response.json()
        window.alert(data.status)
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
        auth:auth,
        authToken:authToken,
        LoginUser:LoginUser,
        RegisterNewUser:RegisterNewUser,
        Logout:Logout,
        UpdateToken:UpdateToken,
        Subscriptions:Subscriptions,
        ForgotPassword:ForgotPassword,
        ResetPassword:ResetPassword
    }

    //login path controllers
    const LoginControllerEffect = () => {
        let role = undefined
       
        if (user.role==='user') {
            Navigate('./add-items')
        }
        if (user.role==='administrator') {
            Navigate('./stores')
        }   


    }

    useEffect(()=>{
        setLoading(true)
        if(user){
            LoginControllerEffect()
        }
        if(!user){
            Navigate('/')
        }
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

