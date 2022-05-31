import React, { useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Menu = () => (
  <>
    <Link to="/mycreations">
      <p>My creations</p>{' '}
    </Link>
    <Link to="/myitems">
      <p>My items</p>{' '}
    </Link>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [user, setUser] = useState(false)

  const handleLogout = () => {
    setUser(false)
  }
  const handleLogin = () => {
    setUser(true)
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          {/* <img src={logo} alt="logo" /> */}
          <img src="https://cdn.pixabay.com/photo/2021/05/19/20/34/jellyfish-6267169_960_720.png" width="32" height="32"/>
          <Link to="/">
            <h1>CryptoJelly</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder="Search Item Here" autoFocus={true} />
          <Menu />
        </div>
      </div>
      <div className="navbar-sign">
        <>
          <Link to="/create">
            <button type="button" className="primary-btn">
              Create
            </button>
          </Link>
        </>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <>
                  <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link>
                  <button type="button" className="secondary-btn">
                    Connect
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="button" className="secondary-btn">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
