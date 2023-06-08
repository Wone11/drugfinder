import {setCookies,deleteCookie,getCookie}                    from './Cookies';
import {setlocalStorage,deleteLocalStorage,getLocalStorage}   from './LocalStorage'

export const setAuthentication =(token,user)=>{
    setCookies('token',token)
    setlocalStorage('user',user)
}

export const isAuthenticated =() =>{
    if(getCookie('token') && getLocalStorage('user')){
        return getLocalStorage('user')
    }else{
        return false
    }
}

export const Logout=next=>{
    deleteCookie('token')
    deleteLocalStorage('user')

    next();
}