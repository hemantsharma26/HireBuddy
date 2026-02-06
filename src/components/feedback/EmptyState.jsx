import React from 'react';
import { Button } from '../ui/Button';
import './EmptyState.css';

/**
 * Empty State Component
 * Shows when no data is available with optional CTA
 */

export const EmptyState = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
  children
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-description">{description}</p>}
      {children}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
