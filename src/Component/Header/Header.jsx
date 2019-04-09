import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import './Heder.css'
const Header = () => {

const logoutHandler=()=>{
  localStorage.clear();
}
  return (<div className='header'>
  <Navbar bg="dark" variant="dark" >
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Link style={{ marginRight: 10 }} to="/Login">Login</Link>
      <Link onClick={logoutHandler} style={{ marginRight: 10 }} to="/Login">Logout</Link>
    </Nav>
  </Navbar>
  </div>
  )
}
export default Header;