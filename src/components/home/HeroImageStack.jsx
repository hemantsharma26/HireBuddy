import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated Unsplash Images for Bumble/Community Vibe
const HERO_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
    label: "Community",
    color: "#FFD54F" 
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
    label: "Friendship",
    color: "#ff8c00" 
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop",
    label: "Together",
    color: "#4ade80" 
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop",
    label: "Support",
    color: "#667eea" 
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    label: "Helping",
    color: "#f87171"
  }
];

const HeroImageStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle images infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Slower cycle for better viewing

    return () => clearInterval(interval);
  }, []);

  // Animation Variants based on "Stack Depth"
  // "30% image dikhana chahiye" -> Offset X significantly
  const variants = {
    front: {
      zIndex: 10,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    second: {
      zIndex: 9,
      x: 60, // 30% offsetish
      scale: 0.92,
      filter: "blur(2px)", // Slight blur
      opacity: 0.9,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    third: {
      zIndex: 8,
      x: 120, // More offset
      scale: 0.85,
      filter: "blur(6px)", // Medium blur
      opacity: 0.7,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    fourth: {
      zIndex: 7,
      x: 180,
      scale: 0.8,
      filter: "blur(12px)", // Heavy blur
      opacity: 0.4,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    hidden: {
      zIndex: 0,
      x: 200,
      scale: 0.7,
      filter: "blur(20px)",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div style={{ position: 'relative', width: '400px', height: '550px', display: 'flex', alignItems: 'center' }}>
      {HERO_IMAGES.map((img, index) => {
        // Calculate relative position based on currentIndex
        // 0 -> Front, 1 -> Second, etc.
        let position = (index - currentIndex + HERO_IMAGES.length) % HERO_IMAGES.length;
        
        let variantName = 'hidden';
        if (position === 0) variantName = 'front';
        else if (position === 1) variantName = 'second';
        else if (position === 2) variantName = 'third';
        else if (position === 3) variantName = 'fourth';

        return (
          <motion.div
            key={img.id}
            initial="hidden" // Start hidden for smooth entry
            animate={variantName}
            variants={variants}
            style={{
              position: 'absolute',
              width: '350px', 
              height: '500px',
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
              backgroundColor: 'white',
              left: 0, 
              border: '4px solid white' // Clean border
            }}
          >
            <img 
              src={img.url} 
              alt={img.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Minimal Pill Label (Vertical) */}
            <div style={{
              position: 'absolute',
              top: '40px',
              right: '20px',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              backgroundColor: img.color,
              color: 'black',
              padding: '16px 8px',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {img.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroImageStack;
