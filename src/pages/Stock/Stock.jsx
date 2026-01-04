import React, { useState } from 'react';
import './stock.css';
import { Link } from 'react-router-dom';

export default function PerfumeStockPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: "Azure Mist",
      category: "oceanic",
      description: "A refreshing oceanic fragrance with notes of sea salt, bergamot, and driftwood. Perfect for everyday elegance.",
      price: 89.99,
      stock: 24,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      rating: 4.8,
      reviews: 127,
      isNew: true
    },
    {
      id: 2,
      name: "Mystique Noir",
      category: "oriental",
      description: "An intoxicating blend of oud, amber, and dark spices. Creates an aura of mystery and sophistication.",
      price: 129.99,
      stock: 15,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
      rating: 4.9,
      reviews: 203,
      isBestseller: true
    },
    {
      id: 3,
      name: "Rose Éternelle",
      category: "floral",
      description: "Delicate rose petals dancing with vanilla and musk. Evokes memories of eternal love and romance.",
      price: 99.99,
      stock: 32,
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Citrus Aurora",
      category: "fresh",
      description: "Bright bergamot and neroli capture the essence of a new dawn. Invigorating and pure with lasting freshness.",
      price: 79.99,
      stock: 41,
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
      rating: 4.6,
      reviews: 94
    },
    {
      id: 5,
      name: "Velvet Nights",
      category: "oriental",
      description: "Rich tonka bean and warm sandalwood create an enveloping evening fragrance. Sensual and memorable.",
      price: 119.99,
      stock: 18,
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
      rating: 4.9,
      reviews: 178,
      isBestseller: true
    },
    {
      id: 6,
      name: "Cedar Summit",
      category: "woody",
      description: "Crisp cedar and vetiver with hints of leather. A masculine fragrance inspired by mountain peaks.",
      price: 94.99,
      stock: 28,
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80", 
    }
  ];

  const categories = [
    { id: 'all', name: 'All Fragrances' },
    { id: 'oceanic', name: 'Oceanic' },
    { id: 'oriental', name: 'Oriental' },
    { id: 'floral', name: 'Floral' },
    { id: 'fresh', name: 'Fresh' },
    { id: 'woody', name: 'Woody' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="stock-container">
      {/* Header */}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Premium Fragrances</h2>
          <p className="hero-subtitle">Discover our exclusive collection of artisanal perfumes, crafted with the finest ingredients from around the world.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Filters */}
        <div className="filters-section">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Count */}
        <div className="products-count">
          Showing <span className="count-number">{filteredProducts.length}</span> of {products.length} fragrances
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Link key={product.id} className="product-card" to={`/products/${product.id}`}>
              {/* Image Container */}
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                {/* Badges */}
                <div className="product-badges">
                  {product.isNew && <span className="badge badge-new">NEW</span>}
                  {product.isBestseller && <span className="badge badge-bestseller">BESTSELLER</span>}
                </div>

                {/* Stock Badge */}
                <div className="stock-badge-container">
                  <span className={`stock-badge ${product.stock > 30 ? 'stock-high' :
                      product.stock > 15 ? 'stock-medium' :
                        'stock-low'
                    }`}>
                    {product.stock} in stock
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

                {/* Name */}
                <h3 className="product-name">{product.name}</h3>

                {/* Category */}
                <p className="product-category">{product.category}</p>

                {/* Description */}
                <p className="product-description">{product.description}</p>

                {/* Price and Add to Cart */}
                <div className="product-footer">
                  <div className="product-price">${product.price}</div>
                  <button className="add-to-cart-btn">
                    
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No fragrances found</h3>
            <p className="empty-text">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}