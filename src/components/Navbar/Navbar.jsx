import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from './../../pages/assets/hmc_logo-removebg-preview.png'
import { MdOutlineShoppingCart } from "react-icons/md";
import './navbar.css'

function Navbar() {
  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItem);
  
  // Calculate total number of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className='navbar'>
      {/* Logo */}
      <Link to="/">
        <img src={Logo} alt="HMC Collections Logo" />
      </Link>

      {/* Navigation links */}
      <ul className="navlinks">
        <li className="nav-items">
          <Link to="/" className='active'>Home</Link>
        </li>
        <li className="nav-items">
          <Link to="/stock">Stock</Link>
        </li>
      </ul>

      {/* Cart icon */}
      <Link to="/cart" className="addToCart">
        <MdOutlineShoppingCart size={24} />
        <span className="cart-count">{totalItems}</span>
      </Link>

    </nav>
  )
}

export default Navbar