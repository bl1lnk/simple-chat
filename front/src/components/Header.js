import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from "react-router-bootstrap"
import {Navbar, Nav, Dropdown} from "react-bootstrap"

const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

    return (
        <header>
    
 
  <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
      <LinkContainer to="/">
      <Navbar.Brand><i id="chatIcon" className="fas fa-sms"></i> </Navbar.Brand>
      </LinkContainer>
    
 

    <Nav className="ml-auto">
    {userInfo ? (
      <>
         <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
           {userInfo.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
      </>
): (
  <>
    <LinkContainer to="/login">
      <Navbar.Brand >Login</Navbar.Brand>
    </LinkContainer>
     
    <LinkContainer to="/register">
      <Navbar.Brand >Register</Navbar.Brand>
    </LinkContainer>
    </>
)}
  <LinkContainer to="/contact">
      <Navbar.Brand >Contact</Navbar.Brand>
    </LinkContainer>
     
     

  

    </Nav>
   
  </Navbar>
         
        </header>
    )
}

export default Header
