import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import "./navbar.css"
function Navbar() {
  return (
      <div className='divNavbar'>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/" > Home </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/custom" > Custom </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/cart " > Cart </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/dashboard" > Dashboard </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/profile" > Profile </NavLink>
        {/* <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Register" > Register </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Login" > Login </NavLink> */}
        {/* <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Welcome" > Welcome </NavLink> */}
        {/* <Link to="/" > Home </Link>
        <Link to="/about" > About </Link>
        <Link to="/profile" > Profile </Link> */}
        
      </div>
  )
}

export default Navbar;