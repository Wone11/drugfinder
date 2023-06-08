import React            from 'react'
import {BiChevronsDown} from "react-icons/bi"; 
import {animateScroll as scroll} from 'react-scroll';
import {
    AnimatedIcon,
    Container,
    ContainerUp,
    Form,
    FormContent,
    FormH1,
    FormH2,
    FormWrap,
    Icon,
    Text,
    } from './ContactUsElements'

function Contact() {

 const ScrollToDowns =()=>{
     scroll.scrollToBottom();

 }
    return (
        <>
            <ContainerUp>
                <FormWrap>
                    <FormContent>
                        <AnimatedIcon>
                            <FormH2>STAY IN TOUCH AND CONTACT US!</FormH2>
                            <BiChevronsDown onClick ={ScrollToDowns} />
                        </AnimatedIcon>
                    </FormContent>
                </FormWrap>
            </ContainerUp>
            <Container>
                <FormWrap>
                    <Icon to='/'>Home</Icon>
                    <FormContent>
                        <Form >
                            <FormH1>We are every where </FormH1>
                            <hr></hr>
                            <Text> Around: Ethiopia</Text>
                            <Text> Phone: +251 90909090</Text>
                            <Text> Fax: +2513333333333</Text>
                            <Text> Email: +eeigs@gmail.com</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
            <br></br>
        </>
    )
}
export default Contact
