import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

/**
 * Card Component
 * Bumble-inspired card with soft shadows and hover lift
 * 
 * Props:
 * - hoverable: Enable hover lift effect
 * - onClick: Click handler (makes card interactive)
 * - noPadding: Remove default padding
 */

export const Card = ({
  children,
  hoverable = false,
  onClick,
  noPadding = false,
  className = '',
  ...props
}) => {
  const cardClass = `
    card 
    ${onClick ? 'card-clickable' : ''} 
    ${noPadding ? 'card-no-padding' : ''}
    ${className}
  `.trim();

  const hoverAnimation = hoverable || onClick ? {
    y: -6,
    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.15)'
  } : {};

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      whileHover={hoverAnimation}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
