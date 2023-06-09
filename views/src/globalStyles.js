import styled, {createGlobalStyle} from "styled-components";

 const GlobalStyle = createGlobalStyle`
 *{
     box-sizing: border-box;
     padding: 0;
     margin: 0;
     font-family     : 'Source Sans Pro' sans-serif;
 }
 `

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1300px;
margin-right: auto;
margin-left: auto;
padding-right: 20px;
padding-left: 20px;

@media screen and (max-width:960px ) { 
    padding-right: 20px;
    padding-left:  20px;  
}
`
export const Button = styled.button`
border-radius: 25px;
background: ${({primary})=>(primary ? '#4B59F7':'#0467FB')};
white-space: nowrap;
padding: ${({big})=>(big ? '12px 64px':'10px 20px')};
color:#fff;
font-size: ${({fontBig})=>(fontBig ? '20px':'16px')};
outline: none;
border:none;
cursor: pointer;
float: right;
&:hover{
    transition: all 0.3s ease-out;
    background: #fff;
    background: ${({primary})=>(primary ? '#0467FB': '#4B59F7')};
}

@media screen and (max-width:960px){
    width:100%;
}
`
export default GlobalStyle;