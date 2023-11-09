import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../store/actions'

const Navbar = ({ auth, logout }) => {
  return (
    <div className='navbar'>
      <div className="container">
          <ul className='navbar-container'>
            <li><Link className='navbar-item' to="/">Home</Link></li>
            <li><Link className='navbar-item' to="/register">Register</Link></li>
            <li><Link className='navbar-item' to="/login">Login</Link></li>
            <li><Link className='navbar-item' to="/poll/new">Create Poll</Link></li>
            <li>
              <a className='navbar-item' onClick={logout}>Logout</a>
            </li>
          </ul>
          {
            auth.isAuthenticated && (<p className='navbar-user'>Logged in as {auth.user.username}</p>)
          }
      </div>
    </div>
  )
}

export default connect(store => ({auth: store.auth}), { logout })(Navbar)