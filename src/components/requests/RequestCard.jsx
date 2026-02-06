import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, truncateText, getCategoryLabel } from '../../utils/helpers';
import { CATEGORIES } from '../../utils/constants';
import './RequestCard.css';

const RequestCard = ({ request }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/requests/${request._id}`);
  };

  return (
    <div className="request-card" onClick={handleClick}>
      <div className="request-card-header">
        <div className="request-category">
          {getCategoryLabel(CATEGORIES, request.category)}
        </div>
        <div className="request-job-type">
          {request.jobType === 'in-person' ? '📍 In-Person' : '💻 Remote'}
        </div>
      </div>

      <h3 className="request-title">{request.title}</h3>
      
      <p className="request-description">
        {truncateText(request.description, 120)}
      </p>

      <div className="request-meta">
        <div className="request-location">
          📍 {request.location.area}, {request.location.city}
        </div>
        {request.compensation && (
          <div className="request-compensation">
            💰 {request.compensation}
          </div>
        )}
      </div>

      <div className="request-footer">
        <div className="request-requester">
          <img 
            src={request.requester?.profilePicture || '/default-avatar.png'} 
            alt={request.requester?.displayName}
            className="requester-avatar"
          />
          <span>{request.requester?.displayName}</span>
          {request.requester?.stats?.averageRating > 0 && (
            <span className="requester-rating">
              ⭐ {request.requester.stats.averageRating.toFixed(1)}
            </span>
          )}
        </div>
        <div className="request-time">
          {formatDate(request.createdAt)}
        </div>
      </div>

      {request.applicantsCount > 0 && (
        <div className="request-applicants-badge">
          {request.applicantsCount} applicant{request.applicantsCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
