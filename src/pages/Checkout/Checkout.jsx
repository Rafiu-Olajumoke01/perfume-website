import React, { useState } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkoutCart } from "../../store/cart/cartSlice";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate totals - CONVERT PRICE TO NUMBER
  const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare order data - CONVERT PRICES TO NUMBERS
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        delivery_address: formData.deliveryAddress,
        items: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price), // Convert to number
          total: parseFloat(item.price) * item.quantity // Calculate as number
        })),
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total_amount: parseFloat(total.toFixed(2)),
        status: "pending"
      };

      console.log("Sending order data:", orderData); // Debug log

      // Send to backend
      const response = await axios.post('http://127.0.0.1:8000/api/orders/create/', orderData);

      console.log("Order created:", response.data);

      // Clear the cart after successful order
      dispatch(checkoutCart());

      // Navigate to payment page with order ID
      navigate('/payment', { state: { orderId: response.data.id } });

    } catch (error) {
      console.error('Full Error Object:', error);
      console.error('Error Response:', error.response);
      console.error('Error Data:', error.response?.data);

      // Show detailed error message
      const errorMessage = error.response?.data?.error
        || error.response?.data?.message
        || error.response?.data?.detail
        || JSON.stringify(error.response?.data)
        || "Failed to create order. Please try again.";

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout Page</h2>

        <div className="checkout-wrapper">
          {/* ===== LEFT: BILLING DETAILS ===== */}
          <div className="checkout-form">
            <h3 className="section-title">Billing Details</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="House number, street, city, state"
                  required
                />
              </div>

              <button
                type="submit"
                className="proceed-btn"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>

          {/* ===== RIGHT: ORDER SUMMARY ===== */}
          <div className="order-summary">
            <h3 className="section-title">Order Summary</h3>

            {!cartItems || cartItems.length === 0 ? (
              <div className="empty-checkout">
                <p>No items in cart</p>
                <Link to="/" className="back-to-shop">Go Shopping</Link>
              </div>
            ) : (
              <>
                <div className="summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="summary-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">x{item.quantity}</span>
                      </div>
                      <span className="item-price">₦{(parseFloat(item.price) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <hr className="divider" />

                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>₦{shipping.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (8%)</span>
                    <span>₦{tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="divider" />

                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="total-price">₦{total.toLocaleString()}</span>
                </div>

                <div className="secure-note">
                  <span>🔒</span> Secure checkout. Your information is encrypted.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
