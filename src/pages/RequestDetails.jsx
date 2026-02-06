import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  useRequestDetails, 
  useApplyToRequest, 
  useManageApplicants 
} from '../features/requests/hooks/useRequests';
import { useAuth } from '../store'; // Using new Zustand store
import { Button, Card, Avatar, Badge } from '../components/ui';
import { Skeleton, SkeletonText } from '../components/feedback';
import { ErrorState } from '../components/feedback';
import { formatDate, getCategoryLabel } from '../utils/helpers';
import { CATEGORIES } from '../utils/constants';
import toast from 'react-hot-toast';
import './RequestDetails.css';

/**
 * Request Details Page
 * Fully refactored to use custom hooks and new UI components
 */

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Custom hooks
  const { request, loading, error, refetch } = useRequestDetails(id);
  const { apply, loading: applying } = useApplyToRequest();
  const { acceptApplicant, rejectApplicant } = useManageApplicants();
  
  const [applyMessage, setApplyMessage] = useState('');

  // Handle actions
  const handleApply = async () => {
    if (!applyMessage.trim()) return;
    try {
      await apply(id, applyMessage);
      toast.success('Application submitted successfully!');
      setApplyMessage('');
      refetch();
    } catch (err) {
      // Error handled by hook/toast
    }
  };

  const handleAccept = async (applicantId) => {
    try {
      await acceptApplicant(id, applicantId);
      toast.success('Applicant accepted!');
      refetch();
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleReject = async (applicantId) => {
    try {
      await rejectApplicant(id, applicantId);
      toast.success('Applicant rejected');
      refetch();
    } catch (err) {
      // Error handled by hook
    }
  };

  if (loading) {
    return (
      <div className="request-details-page">
        <div className="container">
          <Skeleton height="300px" className="mb-4" />
          <SkeletonText lines={5} />
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="request-details-page">
        <ErrorState 
          title="Request not found" 
          description={error || "This request may have been removed."}
          onRetry={() => navigate('/browse')}
          retryLabel="Back to Browse"
        />
      </div>
    );
  }

  const isOwner = user && request.requester?._id === user._id;
  const hasApplied = request.applicants?.some(app => app.userId === user?._id);
  const canApply = !isOwner && !hasApplied && request.status === 'open';

  return (
    <div className="request-details-page">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="request-details-layout"
        >
          {/* Main Content */}
          <div className="request-main">
            {/* Header Card */}
            <Card className="request-header-card">
              <div className="request-header-top">
                <Badge variant="primary" size="lg">
                  {getCategoryLabel(CATEGORIES, request.category)}
                </Badge>
                <Badge variant={request.status === 'open' ? 'success' : 'neutral'}>
                  {request.status.toUpperCase()}
                </Badge>
              </div>

              <h1>{request.title}</h1>
              
              <div className="request-meta-grid">
                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <span>{request.location?.area}, {request.location?.city}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🕒</span>
                  <span>{formatDate(request.createdAt)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">💼</span>
                  <span>{request.jobType === 'remote' ? 'Remote' : 'In-Person'}</span>
                </div>
              </div>
              
              <div className="divider" />
              
              <h3>Description</h3>
              <p className="description-text">{request.description}</p>
              
              <div className="divider" />
              
              <div className="compensation-grid">
                {request.compensation && (
                  <div className="comp-item">
                    <span className="label">Compensation</span>
                    <span className="value">💰 {request.compensation}</span>
                  </div>
                )}
                {request.duration && (
                  <div className="comp-item">
                    <span className="label">Duration</span>
                    <span className="value">⏱️ {request.duration}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Application Section */}
            {canApply && (
              <Card className="apply-card">
                <h3>Apply for this Request</h3>
                <textarea
                  className="apply-textarea"
                  placeholder="Introduce yourself and explain why you're a good fit..."
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  rows={4}
                />
                <Button 
                  isFullWidth 
                  onClick={handleApply}
                  isLoading={applying}
                  disabled={!applyMessage.trim()}
                >
                  Submit Application
                </Button>
              </Card>
            )}

            {/* Applicant Management (Owner Only) */}
            {isOwner && request.applicants?.length > 0 && (
              <div className="applicants-section">
                <h3>Applicants ({request.applicants.length})</h3>
                <div className="applicants-grid">
                  {request.applicants.map((applicant) => (
                    <Card key={applicant.userId} className="applicant-card">
                      <div className="applicant-header">
                        <Avatar 
                          src={applicant.profilePicture} 
                          name={applicant.displayName}
                        />
                        <div>
                          <h4>{applicant.displayName}</h4>
                          <span className="applicant-date">{formatDate(applicant.appliedAt)}</span>
                        </div>
                      </div>
                      
                      <p className="applicant-message">"{applicant.message}"</p>
                      
                      {applicant.status === 'pending' && (
                        <div className="applicant-actions">
                          <Button 
                            size="sm" 
                            variant="primary"
                            onClick={() => handleAccept(applicant.userId)}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary" // Was 'outline' but component uses secondary
                            onClick={() => handleReject(applicant.userId)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      
                      {applicant.status !== 'pending' && (
                        <Badge variant={applicant.status === 'accepted' ? 'success' : 'error'}>
                          {applicant.status.toUpperCase()}
                        </Badge>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="request-sidebar">
            <Card className="requester-card">
              <h3>Posted by</h3>
              <div className="requester-profile">
                <Avatar 
                  size="xl"
                  src={request.requester?.profilePicture}
                  name={request.requester?.displayName}
                />
                <h4>{request.requester?.displayName}</h4>
                
                {request.requester?.stats && (
                  <div className="requester-stats">
                    <div className="stat">
                      <span className="stat-value">⭐ {request.requester.stats.averageRating?.toFixed(1) || 'New'}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{request.requester.stats.totalJobsCompleted || 0}</span>
                      <span className="stat-label">Jobs Done</span>
                    </div>
                  </div>
                )}
                
                <Button variant="secondary" isFullWidth className="mt-4">
                  View Profile
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;
