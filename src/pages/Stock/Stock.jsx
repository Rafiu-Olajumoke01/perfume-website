import React, { useState, useEffect } from 'react';
import './stock.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemCart } from '../../store/cart/cartSlice';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://perfume-backend-4.onrender.com/api/products/');
        
        // Handle different response formats safely
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data.products && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          productsData = response.data.results;
        } else {
          console.error('Unexpected API structure:', response.data);
          productsData = [];
        }
        
        // Only get first 6 products for homepage
        setProducts(productsData.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addItemCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ? `${product.image}` : null,
      category: product.category,
      quantity: 1
    }));
    alert(`✅ ${product.name} added to cart!`);
  };

  return (
    <div className="stock-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Premium Fragrances</h2>
          <p className="hero-subtitle">Discover our exclusive collection of artisanal perfumes, crafted with the finest ingredients from around the world.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Section Header */}
        <div className="section-header">
          <h3 className="section-title">Featured Collection</h3>
          <Link to="/stock" className="see-more-link">
            See All Products
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading fragrances...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products && products.length > 0 && (
          <div className="products-grid">
            {products.map(product => (
              <Link key={product.id} className="product-card" to={`/products/${product.id}`}>
                {/* Image Container */}
                <div className="product-image-container">
                  <img
                    src={product.image ? `${product.image}` : 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80'}
                    alt={product.name}
                    className="product-image"
                  />

                  {/* Badges */}
                  <div className="product-badges">
                    {product.is_new && <span className="badge badge-new">NEW</span>}
                    {product.is_bestseller && <span className="badge badge-bestseller">BESTSELLER</span>}
                  </div>

                  {/* Stock Badge */}
                  <div className="stock-badge-container">
                    <span className={`stock-badge ${product.quantity > 30 ? 'stock-high' :
                        product.quantity > 15 ? 'stock-medium' :
                          'stock-low'
                      }`}>
                      {product.quantity} in stock
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="quick-actions">
                    <button className="quick-action-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  {/* Rating */}
                  {product.rating && (
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`star ${i < Math.floor(product.rating) ? 'star-filled' : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="product-name">{product.name}</h3>

                  {/* Category */}
                  {product.category && <p className="product-category">{product.category}</p>}

                  {/* Description */}
                  {product.description && (
                    <p className="product-description">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </p>
                  )}

                  {/* Price and Add to Cart */}
                  <div className="product-footer">
                    <div className="product-price">₦{parseFloat(product.price).toLocaleString()}</div>
                    <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Products Message */}
        {!loading && products.length === 0 && (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}