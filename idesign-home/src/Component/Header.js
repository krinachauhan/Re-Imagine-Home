import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const Header = () => {

  const navigate = useNavigate('')

  const logOut = () => {
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem("id")
    navigate('/')
  }

  return (
    <MainHeader>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary border-bottom">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>iDESIGN</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto gap-3">
              <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
              <Nav.Link as={Link} to={'/about-us'}>About us</Nav.Link>
              <Nav.Link as={Link} to={'/contact-us'}>Contact us</Nav.Link>
              <Nav.Link as={Link} to={'/history'}>History</Nav.Link>
            </Nav>
            <Nav>
              <Link to={'/'}>
                <img src='./Image/user.jpg' alt='user-pic' />
              </Link>
              {
                (localStorage.getItem("firstName")) ?
                <NavDropdown className='d-flex align-items-center fs-5' title={localStorage.getItem("firstName")+ " " + localStorage.getItem("lastName")} id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/profile'}>Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/password'}>Change Passoword</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              :
              <NavDropdown className='d-flex align-items-center fs-5' title="Welcome user" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to={'/login'}>Sign in</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/profile'}>Profile</NavDropdown.Item>
              </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainHeader>
  )
}

const MainHeader = styled.header`

  img {
    width: 47px;
    height: 47px;
    margin: 2px;
    border-radius: 74px;
  }

`;

export default Header
