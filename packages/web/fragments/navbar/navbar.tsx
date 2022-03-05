import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

function AppNavbar() {
  return (
    < >
      <Navbar bg="dark" variant="dark" expand="lg" sticky='top'>
        <Container>
          <Link href="/" passHref><Navbar.Brand>Daily ワトリ</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
              <Link href="/" passHref><Nav.Link>Link</Nav.Link></Link>
              <NavDropdown title="Requests" id="nav-request">
                <Link href="/requests/" passHref><NavDropdown.Item>Action</NavDropdown.Item></Link>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link as="div"><Link href="/auth/login" passHref><Button variant='success'><FontAwesomeIcon icon={faUser} /> Mod Login</Button></Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </ >
  )
}

export default AppNavbar
