import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    Navbar 
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
    </div>
  )
}

export default Navbar
