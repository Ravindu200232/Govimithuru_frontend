import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope, FaUser, FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar({ cartItemCount }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Mobile menu icon (Hamburger menu) */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav links container */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaHome style={{ marginRight: '5px' }} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaShoppingCart style={{ marginRight: '5px' }} /> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaShoppingCart style={{ color: 'red', marginRight: '5px' }} />
            {cartItemCount > 0 && (
              <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaInfoCircle style={{ marginRight: '5px' }} /> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaEnvelope style={{ marginRight: '5px' }} /> Contact
          </NavLink>
        </li>
        <li>
          {username && (
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              <FaUser style={{ marginRight: '5px' }} /> {username}
            </NavLink>
          )}
        </li>
        <li>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
