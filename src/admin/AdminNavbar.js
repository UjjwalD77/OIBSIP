import React, { useState } from 'react'
import {Link, NavLink} from 'react-router-dom';
import "./AdminNavbar.css"
import { IconContext } from "react-icons";
import { FiMenu } from "react-icons/fi";
function AdminNavbar(props) {
  const [navbarOpen,setNavbarOpen] = useState(false);
  const handleNavClick = () => {
    setNavbarOpen(navbarOpen=> !navbarOpen)
  }
  const OpenNav = () => {
    return (
      <div className='divNavbarOpen' onClick={handleNavClick}>
   
        <FiMenu style={{ color: 'white', fontSize: 40 }} />
    
        <div className='divNavbarOpenInner' >
          
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/" > Dashboard </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/currentorders" > Current Orders </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/orders " > All Orders </NavLink>
        {/* <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/dashboard" > Dashboard </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/profile" > Profile </NavLink> */}
        {/* <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Register" > Register </NavLink>
        <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Login" > Login </NavLink> */}
        {/* <NavLink exact className={(navData) => navData.isActive ? "active_navbar_class" : "unactive_navbar_class" } to="/Welcome" > Welcome </NavLink> */}
        {/* <Link to="/" > Home </Link>
        <Link to="/about" > About </Link>
        <Link to="/profile" > Profile </Link> */}
      </div>
        
      </div>
    ) 
  }
  const CloseNav = () => {
    return(
      <div className='divNavbar' onClick={handleNavClick}>
        <FiMenu style={{fontSize: 40,color:'white'  }}/>
      </div>
    )
  }
  return(
    (navbarOpen||props.open ? <OpenNav/> : <CloseNav/>)
  )
}

export default AdminNavbar;