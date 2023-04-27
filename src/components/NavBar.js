import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <Navbar
      bg='light'
      expand='lg'
      style={{
        marginBottom: 48,
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          style={{
            fontWeight: 'bold',
          }}
        >
          NatStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/category/tech'>
              Tecnología
            </Nav.Link>
            <Nav.Link as={Link} to='/category/woman'>
              Ropa Mujeres
            </Nav.Link>
            <Nav.Link as={Link} to='/category/man'>
              Ropa Hombres
            </Nav.Link>
          </Nav>
          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
