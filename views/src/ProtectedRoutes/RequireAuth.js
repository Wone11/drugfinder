import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

export const RequireAuth=({children})=>{
    const {auth} = useContext(AuthContext)
    const Navigate = useNavigate()
    if(!auth){
       return Navigate('/login')
    }
    return children
}