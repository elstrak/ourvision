// src/components/CustomCursor/CustomCursor.js
import React, { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState(null);
  const [isOnRedBackground, setIsOnRedBackground] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor only after mouse has moved
    const showCursor = () => setIsVisible(true);
    window.addEventListener('mousemove', showCursor, { once: true });

    // Update cursor position with mouse movement
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Check if element is on red background
    const checkBackground = (e) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // Check if we're in the hero section or contact page
        const isInHero = element.closest('.hero') !== null;
        const isInContactPage = element.closest('.contact-page') !== null;
        
        // If we're in either the hero or contact page, set background to red
        if (isInHero || isInContactPage) {
          setIsOnRedBackground(true);
          return;
        }
        
        // Check background color for other elements
        const computedStyle = window.getComputedStyle(element);
        const bgColor = computedStyle.backgroundColor;
        
        // Check if background is red (#E53935 or rgb(229, 57, 53))
        setIsOnRedBackground(
          bgColor === 'rgb(229, 57, 53)' || 
          bgColor === '#e53935'
        );
      }
    };

    // Check for hover on specific elements
    const checkHoverElements = (e) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      
      if (element) {
        // Check if hovering over hero title
        if (element.closest('.hero-title')) {
          setIsHovering(true);
          setHoverType('hero-title');
        } 
        // Check if hovering over trend or testimonial item
        else if (element.closest('.trend-item') || element.closest('.testimonial-item')) {
          setIsHovering(true);
          setHoverType('article');
        }
        // Check if hovering over contact phone
        else if (element.closest('.contact-phone')) {
          setIsHovering(true);
          setHoverType('phone');
        }
        // Check if hovering over contact email
        else if (element.closest('.contact-email')) {
          setIsHovering(true);
          setHoverType('email');
        }
        else {
          setIsHovering(false);
          setHoverType(null);
        }
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', checkBackground);
    document.addEventListener('mousemove', checkHoverElements);

    return () => {
      // Clean up event listeners
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', checkBackground);
      document.removeEventListener('mousemove', checkHoverElements);
      window.removeEventListener('mousemove', showCursor);
    };
  }, []);

  // Apply cursor position with a slight delay for the following effect
  useEffect(() => {
    if (!cursorRef.current) return;
    
    let animationId;
    let currentX = position.x;
    let currentY = position.y;
    
    const animate = () => {
      // Calculate the distance between current position and target position
      const dx = position.x - currentX;
      const dy = position.y - currentY;
      
      // Move the cursor a fraction of the way to the target (creates lag effect)
      currentX += dx * 0.2;
      currentY += dy * 0.2;
      
      // Apply the position
      cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    return () => {
      // Clean up animation
      cancelAnimationFrame(animationId);
    };
  }, [position]);

  // Determine cursor class based on context
  const getCursorClass = () => {
    let classes = 'custom-cursor';
    
    if (!isVisible) {
      classes += ' cursor-hidden';
    }
    
    if (isHovering) {
      if (hoverType === 'hero-title') {
        classes += ' cursor-rectangle cursor-black';
      } else if (hoverType === 'article') {
        classes += ' cursor-rectangle cursor-red';
      } else if (hoverType === 'email') {
        classes += ' cursor-rectangle cursor-black';
      } else if (hoverType === 'phone') {
        classes += ' cursor-rectangle cursor-black';
      }
    } else {
      classes += ' cursor-circle';
      classes += isOnRedBackground ? ' cursor-white' : ' cursor-red';
    }
    
    return classes;
  };

  return (
    <div ref={cursorRef} className={getCursorClass()}>
      {isHovering && hoverType === 'hero-title' && <span className="cursor-text">с 2022</span>}
      {isHovering && hoverType === 'article' && <span className="cursor-text">читать</span>}
      {isHovering && hoverType === 'email' && <span className="cursor-text">написать</span>}
      {isHovering && hoverType === 'phone' && <span className="cursor-text">позвонить</span>}
    </div>
  );
};

export default CustomCursor;