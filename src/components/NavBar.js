import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return(

    <ul className="NavBar">
    <li><NavLink exact to='/'>Home</NavLink></li>
    {props.currentUser
    ? (
      <div>
        <li><NavLink to='/user'>User</NavLink></li>
        <li><NavLink to='/questions'>Questions</NavLink></li>
        <li><NavLink to='/logout'>LogOut</NavLink></li>
      </div>
    ) : (
      <div>
    <li><NavLink to='/login'>Log In</NavLink></li>
    <li><NavLink to='/signup'>Sign Up</NavLink></li>
    </div>
    )
  }
  </ul>
  )
}

export default NavBar
