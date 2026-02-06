import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button Component
 * 
 * Variants:
 * - primary: Main CTA (gradient background)
 * - secondary: Less prominent (outlined)
 * - tertiary: Text-only
 * - danger: Destructive actions
 * 
 * Sizes: sm, md, lg
 */

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const className = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${isFullWidth ? 'btn-full-width' : ''}
    ${isLoading ? 'btn-loading' : ''}
  `.trim();

  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {isLoading && (
        <span className="btn-spinner" />
      )}
      {!isLoading && leftIcon && (
        <span className="btn-icon-left">{leftIcon}</span>
      )}
      <span className="btn-text">{children}</span>
      {!isLoading && rightIcon && (
        <span className="btn-icon-right">{rightIcon}</span>
      )}
    </motion.button>
  );
};

export default Button;
