import React from 'react'
import { NavLink } from 'react-router-dom'


const NavBar = () => (
  <nav>
    <NavbarAuth />
  </nav>
)

const NavbarAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search" exact>Search</NavLink>
    </li>
    <li>
      <NavLink to="/recipe/add" exact>Add Recipe</NavLink>
    </li>
    <li>
      <NavLink to="/profile" exact>Profile</NavLink>
    </li>
    <li>
      <button>Signout</button>
    </li>
  </ul>
)

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search" exact>Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin" exact>Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup" exact>Signup</NavLink>
    </li>
  </ul>
)
export default NavBar