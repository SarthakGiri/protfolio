import React, { useRef, useEffect, useState } from 'react';
import './HolographicCard.css';

const HolographicCard = ({ children, className = '', intensity = 0.5 }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * 15 * intensity;
      const rotateY = (centerX - x) / centerX * 15 * intensity;
      
      setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(${isHovered ? 1.02 : 1})`,
    '--mouse-x': `${mousePosition.x}%`,
    '--mouse-y': `${mousePosition.y}%`,
  };

  return (
    <div 
      ref={cardRef}
      className={`holographic-card ${className} ${isHovered ? 'hovered' : ''}`}
      style={cardStyle}
    >
      <div className="holographic-overlay">
        <div className="holographic-shine"></div>
        <div className="holographic-grid"></div>
        <div className="holographic-beam"></div>
      </div>
      <div className="holographic-content">
        {children}
      </div>
    </div>
  );
};

export default HolographicCard;
