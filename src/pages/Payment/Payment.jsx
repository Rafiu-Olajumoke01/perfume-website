import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const PaymentPage = ({ checkoutData }) => {
  const navigate = useNavigate(); // For redirecting
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (checkoutData && checkoutData.items) {
      const total = checkoutData.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    }
  }, [checkoutData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment of ₦${totalAmount.toLocaleString()} processed! (Demo)`);

    // Redirect to homepage after payment
    navigate('/'); // <-- assuming '/' is your homepage route
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="header">
          <h1>Secure Payment</h1>
          <span className="lock-icon">🔒</span>
        </div>

        <div className="content">
          {/* Payment Form */}
          <div className="form-section">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength="5"
                    required
                  />
                </div>

                <div className="form-group half">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="pay-button">
                Pay ₦{totalAmount.toLocaleString()}
              </button>
            </form>

            <p className="security-note">
              Your payment information is encrypted and secure.
            </p>
          </div>

          {/* Order Summary */}
          <div className="summary-section">
            <h2>Order Summary</h2>
            {checkoutData && checkoutData.items ? (
              checkoutData.items.map((item, index) => (
                <div className="summary-item" key={index}>
                  <span>
                    {item.product_name} x {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No items in your order</p>
            )}
            <div className="summary-item total">
              <span>Total</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>
            <div className="trusted-badges">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
