import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { formatDate, truncateText, getCategoryLabel } from '../../../utils/helpers';
import { CATEGORIES } from '../../../utils/constants';
import './RequestCard.css';

/**
 * RequestCard Component
 * Bumble-inspired card design with hover lift
 * Used in browse lists and my requests
 */

export const RequestCard = ({ request }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/requests/${request._id}`);
  };

  return (
    <Card hoverable onClick={handleClick} className="request-card">
      {/* Header with category and job type */}
      <div className="request-card-header">
        <Badge variant="primary" size="sm">
          {getCategoryLabel(CATEGORIES, request.category)}
        </Badge>
        <span className="request-job-type">
          {request.jobType === 'in-person' ? '📍 In-Person' : '💻 Remote'}
        </span>
      </div>

      {/* Title */}
      <h3 className="request-card-title">{request.title}</h3>

      {/* Description */}
      <p className="request-card-description">
        {truncateText(request.description, 120)}
      </p>

      {/* Metadata */}
      <div className="request-card-meta">
        <span>📍 {request.location.area}, {request.location.city}</span>
        {request.compensation && (
          <span>💰 {request.compensation}</span>
        )}
      </div>

      {/* Footer with requester info */}
      <div className="request-card-footer">
        <div className="requester-info">
          <Avatar
            src={request.requester?.profilePicture}
            name={request.requester?.displayName}
            size="sm"
          />
          <span className="requester-name">{request.requester?.displayName}</span>
          {request.requester?.stats?.averageRating > 0 && (
            <span className="requester-rating">
              ⭐ {request.requester.stats.averageRating.toFixed(1)}
            </span>
          )}
        </div>
        <span className="request-time">{formatDate(request.createdAt)}</span>
      </div>

      {/* Applicants badge (if any) */}
      {request.applicantsCount > 0 && (
        <div className="applicants-badge">
          {request.applicantsCount} applicant{request.applicantsCount !== 1 ? 's' : ''}
        </div>
      )}
    </Card>
  );
};

export default RequestCard;
