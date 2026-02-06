import React from 'react';
import './Avatar.css';

/**
 * Avatar Component
 * Displays user profile picture with fallback to initials
 * 
 * Sizes: sm (32px), md (48px), lg (64px), xl (96px)
 */

export const Avatar = ({
  src,
  alt = '',
  size = 'md',
  name,
  className = ''
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !src || imageError;

  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {showFallback ? (
        <div className="avatar-fallback">
          {getInitials(name || alt)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="avatar-img"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

export default Avatar;
