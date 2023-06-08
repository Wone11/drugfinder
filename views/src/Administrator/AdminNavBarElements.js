
import styled from  'styled-components';
import { Container} from '../globalStyles';
import {Link}  from 'react-router-dom'
import Logo from '../Logo/Drug.png';
// import {FaUserDoctor}  from 'react-icons/fa'


 export const Nav = styled.nav `
 background:#194d33;
 height:70px;
 display:flex;
 justify-content:center;
 align-items:center;
 font-size:1rem;
 position:sticky;
 top:0;
 z-index:999;
 font-family: 'Noto Serif', serif;
  
 `
 export const NavBarContainer = styled(Container)`
 display:flex;
 justify-content:space-between;
 height:70px;

 ${Container}

 `
 export const NavLogo  = styled(Link)`
 color: #fff;
 /* justify-self: flex-start; */
 cursor: pointer;
 text-decoration :none ;
 font-size:1.4rem;
 display:flex;
 align-items:center;
 margin-right:4rem;

 font-family: 'Noto Serif', serif;
 `
 export const NavIcon  = styled.img`
 background-image: url(${Logo}); 
 margin-right:1rem;
 width: 50px;
 height:50px;
 border-radius: 50%;

 &:hover {
     position:absolute;
     transition: all 0.3s ease 0.6s;
     width:200px;
     height:200px;
}
 `

 export const MobileIcon = styled.div`
 display:none;

 @media screen and(max-width:960px){
     display: block;
     position: absolute;
     top: 0;
     right: 0;
     transform: translate(-100%,60%);
     font-size: 1.8rem;
     cursor: pointer;
 }
 `
 export const NavMenu = styled.ul`
 display: flex;
 align-items: center;
 list-style: none;
 text-align: center;

 @media screen and (max-width:960px){
     display: flex;
     flex-direction: column;
     width: 100%;
     height: 90vh;
     position: absolute;
     top: 80px;
     left: ${({click})=>(click? 0 :'100%')};
     opecity:0;
     transition: all 0.5s ease-in-out;
     background:#101522;
 }
 `
export const NavItem  = styled.li `
height:70px;
border-bottom: 1px solid transparent;

&:hover{
    border-bottom:2px solid #4b59f7 ;
}

@media screen and (max-widht:960px){
    width: 100%;

  &:hover{
    border: none;
  }
}  
`
export const NavLinks   = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding:0.5rem 1rem;
height:100%;
font-size: 17px;
font-family: 'roboto sanis', serif;

@media screen and (max-width:960px){
  text-align:center;
  padding :2rem;
  width:100%;
  display: table;

  &:hover{
    color: #4b59f7;
    transition:all 0.3s ease;

  }
}
`

export const NavItemBtn = styled.li`
padding-left: 2rem;
font-size: 2px;
 @media screen and (max-width:960px) {
   display   :flex ;
   justify-content: center;
   float: right;
   align-items: center;
   width: 100%;
   height: 120px;
 }
`
export const NavBtnLink = styled(Link)`
display: flex;
/* justify-content: center; */
float: right;
align-items: center;
text-decoration: none;
padding: 6px 12px;
height: 100%;
width: 100%;
border: none;
outline: none;
`