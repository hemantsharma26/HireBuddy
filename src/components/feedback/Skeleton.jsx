import React from 'react';
import './Skeleton.css';

/**
 * Skeleton Loader
 * Shows loading placeholder while content loads
 */

export const Skeleton = ({
  width,
  height,
  borderRadius = '8px',
  className = ''
}) => {
  const style = {
    width,
    height,
    borderRadius
  };

  return <div className={`skeleton ${className}`} style={style} />;
};

/**
 * Preset Skeleton Components
 */

export const SkeletonText = ({ lines = 3 }) => (
  <div className="skeleton-text">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} height="16px" width={i === lines - 1 ? '60%' : '100%'} />
    ))}
  </div>
);

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card-header">
      <Skeleton width="60px" height="24px" />
      <Skeleton width="80px" height="24px" />
    </div>
    <Skeleton height="24px" width="80%" />
    <SkeletonText lines={2} />
    <div className="skeleton-card-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Skeleton width="32px" height="32px" borderRadius="50%" />
        <Skeleton width="100px" height="16px" />
      </div>
      <Skeleton width="80px" height="16px" />
    </div>
  </div>
);

export default Skeleton;
