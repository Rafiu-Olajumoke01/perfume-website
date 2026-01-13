import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemCart } from "../../store/cart/cartSlice";
import axios from "axios";
import './details.css'

export default function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch product from backend
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="not-found">
                <h2>Product not found</h2>
                <Link to="/" className="back-link">← Back to Products</Link>
            </div>
        );
    }

    const incrementQty = () => {
        if (quantity < product.quantity) setQuantity(quantity + 1);
    };

    const decrementQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        dispatch(addItemCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image ? `http://127.0.0.1:8000${product.image}` : null,
            category: product.category,  
            quantity: quantity
        }));

        setQuantity(1);
        alert(`✅ Added ${quantity} ${product.name} to cart!`);
    };

    return (
        <div className="details-page">
            <div className="details-wrapper">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <span className="breadcrumb-active">{product.name}</span>
                </div>

                <div className="details-container">
                    {/* Image section */}
                    <div className="details-image-section">
                        <div className="details-image">
                            <img 
                                src={product.image ? `http://127.0.0.1:8000${product.image}` : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'} 
                                alt={product.name} 
                            />
                            {product.quantity < 20 && (
                                <span className="stock-badge-detail">Only {product.quantity} left!</span>
                            )}
                        </div>
                    </div>

                    {/* Info section */}
                    <div className="details-info">
                        {product.category && <span className="details-category">{product.category}</span>}
                        <h1 className="details-name">{product.name}</h1>

                        {/* Rating - only show if exists */}
                        {product.rating && (
                            <div className="details-rating">
                                <div className="stars-detail">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`star-detail ${i < Math.floor(product.rating) ? 'star-filled-detail' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    ))}
                                </div>
                                <span className="rating-number">{product.rating}</span>
                            </div>
                        )}

                        <div className="details-price-section">
                            <span className="details-price">₦{parseFloat(product.price).toLocaleString()}</span>
                            <span className="price-label">/ 100ml</span>
                        </div>

                        {product.description && <p className="details-description">{product.description}</p>}

                        {/* Fragrance Notes - only show if notes exist */}
                        {product.notes && (
                            <div className="fragrance-notes">
                                <h3 className="notes-title">Fragrance Notes</h3>
                                <div className="notes-grid">
                                    {product.notes.top && (
                                        <div className="note-item">
                                            <span className="note-label">Top Notes</span>
                                            <span className="note-value">{product.notes.top}</span>
                                        </div>
                                    )}
                                    {product.notes.middle && (
                                        <div className="note-item">
                                            <span className="note-label">Middle Notes</span>
                                            <span className="note-value">{product.notes.middle}</span>
                                        </div>
                                    )}
                                    {product.notes.base && (
                                        <div className="note-item">
                                            <span className="note-label">Base Notes</span>
                                            <span className="note-value">{product.notes.base}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="quantity-section">
                            <span className="quantity-label">Quantity</span>
                            <div className="quantity-selector">
                                <button
                                    className="qty-btn"
                                    onClick={decrementQty}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="qty-display">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={incrementQty}
                                    disabled={quantity >= product.quantity}
                                >
                                    +
                                </button>
                            </div>
                            <span className="stock-info">{product.quantity} available</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="add-to-cart-detail" onClick={handleAddToCart}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                Add to Cart
                            </button>
                            <button className="wishlist-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <span>Authentic Guarantee</span>
                            </div>
                            <div className="feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}