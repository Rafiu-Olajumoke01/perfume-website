import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css'

export default function Banner() {
    return (
        <div className="modern-hero-banner">
            {/* Left Content Section */}
            <div className="hero-left-section">
                <div className="hero-content-box">
                    <span className="hero-badge">New Arrivals</span>
                    <h1 className="hero-main-title">
                        Elegance in <span className="hero-accent-text">Every Drop</span>
                    </h1>
                    <p className="hero-desc-text">
                        Experience the art of fine fragrance. Our collection brings together the world's most exquisite scents, crafted for those who appreciate luxury.
                    </p>
                    <div className="hero-action-btns">
                        <Link to="/stock" className="hero-btn-primary">
                            Explore Collection
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                        <Link to="/stock" className="hero-btn-outline">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="hero-right-section">
                <div className="hero-image-container">
                    <img 
                        src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80" 
                        alt="Luxury Perfume"
                        className="hero-perfume-img"
                    />
                    <div className="hero-decorative-shape"></div>
                </div>
            </div>

            <style>{`
                .modern-hero-banner {
                    width: 100%;
                    height: 80vh;
                    min-height: 650px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                    background: linear-gradient(135deg, #e8eef7 0%, #f5f7fa 50%, #dce6f2 100%);
                    position: relative;
                    overflow: hidden;
                }

                /* Left Content Section */
                .hero-left-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px;
                    position: relative;
                    z-index: 2;
                }

                .hero-content-box {
                    max-width: 550px;
                    animation: fadeSlideIn 1s ease-out;
                }

                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .hero-badge {
                    display: inline-block;
                    padding: 8px 20px;
                    background: rgba(37, 99, 235, 0.12);
                    color: #1e40af;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    border-radius: 50px;
                    margin-bottom: 20px;
                    border: 1.5px solid rgba(37, 99, 235, 0.25);
                }

                .hero-main-title {
                    font-size: 3.2rem;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;
                    margin-bottom: 25px;
                    letter-spacing: -1px;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .hero-accent-text {
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-desc-text {
                    font-size: 1.15rem;
                    color: #475569;
                    line-height: 1.7;
                    margin-bottom: 35px;
                    max-width: 480px;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }

                .hero-action-btns {
                    display: flex;
                    gap: 18px;
                    flex-wrap: wrap;
                }

                .hero-btn-primary,
                .hero-btn-outline {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 32px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                .hero-btn-primary {
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    color: white;
                    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
                }

                .hero-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 28px rgba(37, 99, 235, 0.4);
                }

                .hero-btn-outline {
                    background: rgba(255, 255, 255, 0.8);
                    color: #1e40af;
                    border: 2px solid #2563eb;
                    text-shadow: none;
                }

                .hero-btn-outline:hover {
                    background: #2563eb;
                    color: white;
                    transform: translateY(-2px);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                /* Right Image Section */
                .hero-right-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    position: relative;
                }

                .hero-image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 1.2s ease-out 0.3s both;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .hero-perfume-img {
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    object-fit: contain;
                    position: relative;
                    z-index: 2;
                    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15));
                    animation: floatImage 6s ease-in-out infinite;
                }

                @keyframes floatImage {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .hero-decorative-shape {
                    position: absolute;
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%);
                    border-radius: 50%;
                    z-index: 1;
                    animation: pulse 4s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.5;
                    }
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .modern-hero-banner {
                        grid-template-columns: 1fr;
                        height: auto;
                        min-height: auto;
                    }

                    .hero-left-section {
                        padding: 60px 40px 40px;
                    }

                    .hero-right-section {
                        padding: 20px 40px 60px;
                    }

                    .hero-main-title {
                        font-size: 2.5rem;
                    }

                    .hero-perfume-img {
                        max-width: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .hero-left-section {
                        padding: 50px 30px 30px;
                    }

                    .hero-right-section {
                        padding: 30px 30px 50px;
                    }

                    .hero-main-title {
                        font-size: 2rem;
                    }

                    .hero-desc-text {
                        font-size: 1rem;
                    }

                    .hero-action-btns {
                        flex-direction: column;
                    }

                    .hero-btn-primary,
                    .hero-btn-outline {
                        width: 100%;
                        justify-content: center;
                    }

                    .hero-perfume-img {
                        max-width: 350px;
                    }

                    .hero-decorative-shape {
                        width: 300px;
                        height: 300px;
                    }
                }

                @media (max-width: 480px) {
                    .hero-main-title {
                        font-size: 1.75rem;
                    }

                    .hero-badge {
                        font-size: 0.75rem;
                        padding: 8px 20px;
                    }

                    .hero-perfume-img {
                        max-width: 280px;
                    }
                }
            `}</style>
        </div>
    );
}