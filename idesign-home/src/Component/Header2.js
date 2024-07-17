import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

const Header2 = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <MainHeader>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary border-bottom">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>iDESIGN</Navbar.Brand>
                    <Navbar.Brand as={Link} to={'/'}>iDESIGN</Navbar.Brand>
                    <Navbar.Brand as={Link} to={'/'}>iDESIGN</Navbar.Brand>
                    <Navbar.Brand as={Link} to={'/'}>iDESIGN</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto gap-3">
                            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link as={Link} to={'/about-us'}>About us</Nav.Link>
                            <Nav.Link as={Link} to={'/contect-us'}>Contect us</Nav.Link>
                            <Nav.Link as={Link} to={'/history'}>History</Nav.Link>
                        </Nav>
                        <Nav>
                            <Link to={'/'}>
                                <img src='./Image/user.jpg' alt='user-pic' />
                            </Link>
                            <NavDropdown className='d-flex align-items-center fs-5' title="Welcome user" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={handleShow}>Sign up</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/profile'}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/'}>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* login */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className='single-section-box' type='text' placeholder='enter your email' />
                    <input className='single-section-box' type='text' placeholder='enter password'/>
                    <button className='last-btn-modal'>Sign Up</button>
                </Modal.Body>
            </Modal>
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

    // login form css

`;

export default Header2
