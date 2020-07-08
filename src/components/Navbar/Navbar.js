import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  const { theme, toggleTheme } = props
  return (
    <div className="navbar__wrapper">
      <div className="container">
        <nav className="nav__elements">
          <div className="logo__wrapper">
            <Link to='/' className="logo">Where in the world?</Link>
          </div>
          <div className="switch" onClick={() => toggleTheme()}>
            {theme === 'light' ? (
              <i className="far fa-moon"></i>
            ) : (
                <i className="fas fa-moon"></i>
              )}
            <span className="mode" > Dark Mode</span>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
