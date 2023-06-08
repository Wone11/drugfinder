import styled,{keyframes} from 'styled-components';
import {Link} from 'react-router-dom';
import background from './Home';
import ContactBg from './contactus.svg';

export const Container = styled.div `
min-height:760px;
bottom:0;
left:300px;
right:0;
top:0;
z-index:0;
overflow:hidden;
display:grid;
grid-template-columns:1fr;
grid-template-rows:1000px;
background-image : url(${background});
@media screen and (max-width:768px){
    grid-template-columns: 1fr; 
}

background :lenear-gradient (
    108deg,
    rgba(1, 147, 68,1 )0%,
    rgba(10, 201, 122,1 )100%,
);
`;

export const ContainerUp = styled.div `
min-height:760px;
bottom:0.3rem;
left:0;
right:0;
top:0;
z-index:0;
overflow:hidden;
display:grid;
grid-template-columns:1fr;
grid-template-rows:400px;
background-image : url(${ContactBg});

@media screen and (max-width:768px){
    grid-template-columns: 1fr; 
}

background :lenear-gradient (
    108deg,
    rgba(1, 147, 68,1 )0%,
    rgba(10, 201, 122,1 )100%,
);
`;

export const FormWrap = styled.div `
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
@media screen and (max-width:768px){
    height:60%;
}
`;

export const Icon = styled(Link) `
margin-left:32px;
margin-top:32px;
text-decoration:none;
color:#fff;
font-weight: 700;
font-size: 32px;

@media screen and (max-width :768px){
    margin-left: 16px;
    margin-top:8px;
}
`;

export const FormContent = styled.div `
height:100%;
display:flex;
flex-direction:column;
justify-content:center;

@media screen and (max-width:768px){
    padding :10px;
}
`;

export const Form = styled.form `
background: #aeaeae;
max-width:600px;
height:auto;
width:100%;
z-index:1;
display:grid;
margin : 0 auto;
padding: 80px 32px;
box-shadow : 0 1px 3px rgba(0,0,0,0.9);

@media screen and (max-width:768px){
    padding : 32px 32px;
}
`;

export const FormH1 = styled.h1 `
color:#fff;
font-size:20px;
font-weight:400;
text-align:center;

`;

export const FormH2 = styled.h1 `
color:#ff0083;
font-size:42px;
font-weight:700;
text-align:center;
margin-top:10px;

@media screen and (max-width:960px){
font-size:16px;
text-align:center;
}
`;

export const FormLabel = styled.label `
margin-bottom:8px;
font-size:14px;
color:#fff;

`;

export const FormInput = styled.input `
padding : 16px 16px;
margin-bottom:32px;
border: none ;
border-radius: 4px;
`;

export const TextAreaInput = styled.textarea `
padding : 16px 16px;
margin-bottom:32px;
border: none ;
border-radius: 4px;
`;

export const FormButton = styled.button `
background : #01bf71;
padding: 16px 0;
border: none;
border-radius:4px;
color:#fff;
font-size:20px;
cursor:pointer;
`;

export const Text = styled.span `
text-align: center;
margin-top:24px;
color: #fff;
padding: 8px 16px;
height:60px;
font-size:18px;
font-style:normal;
`;
const rotate = keyframes`
  from {
    transform: rotate(10deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export const AnimatedIcon = styled(Link) `
margin-left:800px;
margin-top:1000px;
text-decoration:none;
color:#311b92;
font-weight: 700;
font-size: 48px;
display: inline-block;
  animation: ${rotate} 8s linear infinite;
  padding: 0;
  font-size: 4rem;

@media screen and (max-width :960px){
    margin-left: 200px;
    margin-top:1000px;
}
`;
