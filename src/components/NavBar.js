import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return(

    <div className="NavBar">
    <NavLink exact to='/'>Home</NavLink>
    //changes the NavBar when the user is logged in
    {props.currentUser
      //shows this when the user is logged in
    ? (
      <div>
        <NavLink to='/user'>User</NavLink>
        <NavLink to='/questions' className="Navlink">Questions</NavLink>
        <NavLink to='/logout' className="Navlink">LogOut</NavLink>
      </div>
    ) : (
      //otherwise
      <div>
    <NavLink to='/login'>Log In</NavLink>
    <NavLink to='/signup' className="Navlink">Sign Up</NavLink>
    </div>
    )
  }
</div>
  )
}

export default NavBar
