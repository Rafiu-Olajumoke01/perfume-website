import React, { useState, useEffect, useCallback } from 'react';
import hmcImageOne from './../assets/hmc_collections1-removebg-preview.png'
import hmcImageTwo from './../assets/hmc_collections2-removebg-preview.png'
import './banner.css'
export default function Banner() {
    const [activeSection, setActiveSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [particles, setParticles] = useState([]);

    const sections = [
        {
            title: "Azure Mist",                
            subtitle: "Oceanic Elegance",       
            description: "Discover our exclusive collection of premium fragrances, crafted with the finest ingredients from around the world.",
            imageUrl: hmcImageOne,
            direction: "right",
            bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            title: "Mystique Noir",
            subtitle: "Dark Elegance",
            description: "A captivating blend of oud and amber, creating an aura of mystery and sophistication.",
            imageUrl: hmcImageTwo,
            direction: "bottom",
            bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            title: "Rose Éternelle",
            subtitle: "Timeless Romance",
            description: "Delicate rose petals dancing with vanilla, evoking memories of eternal love.",
            imageUrl: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
            direction: "left",
            bgGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
        },
        {
            title: "Citrus Aurora",
            subtitle: "Fresh Awakening",
            description: "Bright bergamot and neroli capture the essence of a new dawn, invigorating and pure.",
            imageUrl: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
            direction: "top",
            bgGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        }
    ];

    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    // Wrap handlers in useCallback to prevent unnecessary recreations
    const handleNext = useCallback(() => {
        setIsAnimating(prev => {
            if (!prev) {
                setActiveSection(current => (current + 1) % sections.length);
                setTimeout(() => setIsAnimating(false), 800);
                return true;
            }
            return prev;
        });
    }, [sections.length]);

    const handlePrev = useCallback(() => {
        setActiveSection(current => {
            if (current > 0) {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 800);
                return current - 1;
            }
            return current;
        });
    }, []);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const autoSlide = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [handleNext]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const getSlideClass = (index) => {
        const direction = sections[index].direction;
        if (index === activeSection) return 'slide-active';
        if (index < activeSection) {
            return direction === 'right' ? 'slide-out-left' :
                direction === 'left' ? 'slide-out-right' :
                    direction === 'bottom' ? 'slide-out-top' : 'slide-out-bottom';
        }
        return direction === 'right' ? 'slide-in-right' :
            direction === 'left' ? 'slide-in-left' :
                direction === 'bottom' ? 'slide-in-bottom' : 'slide-in-top';
    };

    return (
        <div className="container">
            {/* Animated Background Gradient */}
            <div 
                className="animated-bg" 
                style={{ background: sections[activeSection].bgGradient }}
            />

            {/* Floating Particles */}
            <div className="particles-container">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}
            </div>

            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`section ${getSlideClass(index)}`}
                >
                    {/* Transition Overlay */}
                    {isAnimating && index === activeSection - 1 && (
                        <div className="transition-overlay" />
                    )}
                    
                    {index === activeSection && (
                        <>
                            <div className="left-content">
                                <h1 className="title">
                                    {section.title.split('').map((char, i) => (
                                        <span 
                                            key={i} 
                                            className="title-char"
                                            style={{ animationDelay: `${i * 0.05}s` }}
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </span>
                                    ))}
                                </h1>
                                <p className="subtitle">
                                    <span className="shimmer-text">{section.subtitle}</span>
                                </p>
                                <p className="description">{section.description}</p>
                                <button className="shop-now-btn">
                                    <span className="btn-text">Shop Now</span>
                                    <span className="btn-icon">→</span>
                                </button>
                            </div>
                            <div className="right-content">
                                <div className="perfume-image-container">
                                    {/* Glow effect behind image */}
                                    <div className="perfume-glow" />
                                    
                                    <img
                                        src={section.imageUrl}
                                        alt={section.title}
                                        className="perfume-image"
                                    />
                                    
                                    {/* Rotating ring around perfume */}
                                    <div className="perfume-ring" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <div className="nav-buttons">
                <button
                    className="nav-btn"
                    onClick={handlePrev}
                    disabled={activeSection === 0}
                    aria-label="Previous fragrance"
                >
                    ←
                </button>
                <button
                    className="nav-btn"
                    onClick={handleNext}
                    disabled={activeSection === sections.length - 1}
                    aria-label="Next fragrance"
                >
                    →
                </button>
            </div>

            {/* Progress indicator */}
            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
                />
            </div>
        </div>
    );
}