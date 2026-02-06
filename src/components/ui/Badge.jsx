import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * Small label for categories, statuses, etc.
 * 
 * Variants: primary, success, warning, error, neutral
 */

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
