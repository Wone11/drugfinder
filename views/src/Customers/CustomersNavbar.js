//import functions
import React, { useState, useEffect , useContext }     from 'react'
import { FaTimes, FaBars }                             from 'react-icons/fa'
import { IconContext }                                 from 'react-icons/lib'
import { Button }                                      from '../globalStyles'
// import {Logout}                                        from '../Helper/Auth';
import AuthContext                                     from '../Context/AuthContext'

import {
    Nav, NavLogo, NavIcon, NavMenu, NavItem, NavLinks, MobileIcon,
    NavItemBtn, NavBtnLink, NavBarContainer
} from './CustomersNavBarElements'

/**
 * AdHoc Nav bar Functions
 * @returns 
 */
const AdHocNavBar = () => {
    const [click, setClick]       = useState(false);
    const [button, setButton]     = useState(true);
    let {Logout}                  = useContext(AuthContext)

    //Functions To Handle Click Event
    const handleClick = () => setClick(!click);

    // const HandleLogout=()=>{
    //    Logout()
    // }
    const showbutton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }
    useEffect(() => {
        showbutton()
    }, [])

    window.addEventListener('resize', showbutton)

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavBarContainer>
                        <NavLogo to='/informations'>
                            <NavIcon />
                            Drug Finder
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MobileIcon>
                        <NavMenu onClick={handleClick}>
                            <NavItem>
                                <NavLinks to='/informations'>INFORMATIONS </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/add-items'>ADD PRODUCTS</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to='/change-password-customer'>CHANGE PASSWORD</NavLinks>
                            </NavItem>
                            
                            <NavItemBtn onClick={Logout}>
                                {button ? (
                                    <NavBtnLink to='/logout'>
                                        <Button primary>Logout</Button>
                                    </NavBtnLink>
                                ) : (
                                    <NavBtnLink to="/logout">
                                        <Button fontBig primary>Logout</Button>
                                    </NavBtnLink>
                                )}
                            </NavItemBtn>
                        </NavMenu>
                    </NavBarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default AdHocNavBar
