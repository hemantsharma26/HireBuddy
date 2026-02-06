import React from 'react';
import { Button } from '../ui/Button';
import './ErrorState.css';

/**
 * Error State Component
 * Shows when an error occurs with retry option
 */

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again',
  onRetry,
  retryLabel = 'Try Again'
}) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">⚠️</div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-description">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
