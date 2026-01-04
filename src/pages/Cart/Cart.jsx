// Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeItemCart, 
  clearCart, 
  checkoutCart,
  incrementQuantity,
  decrementQuantity
} from './../../store/cart/cartSlice';

import './cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.cartItem);
  
  // Debug: Let's see what's in the cart
  console.log("Cart Items from Redux:", cartItems);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some fragrances to get started</p>
            <Link to='/' className="continue-shopping">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                  </div>

                  <div className="item-quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => dispatch(removeItemCart(item.id))}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                className="checkout-btn" 
                onClick={() => {
                  dispatch(checkoutCart());
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </button>
              
              <Link className="continue-btn" to='/'>Continue Shopping</Link>
              
              <button 
                className="clear-cart-btn" 
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}