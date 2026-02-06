import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMyRequests } from '../features/requests/hooks/useRequests';
import { RequestCard } from '../features/requests/components/RequestCard';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/feedback/EmptyState';
import { ErrorState } from '../components/feedback/ErrorState';
import './MyRequests.css';

/**
 * My Requests Page
 * Uses useMyRequests hook with tab switching
 * Shows user's posted and accepted requests
 */

const MyRequestsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posted'); // 'posted' or 'accepted'

  const { requests, loading, error, refetch } = useMyRequests(activeTab);

  return (
    <div className="my-requests-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="my-requests-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>My Requests</h1>
          <Button onClick={() => navigate('/create-request')}>
            + New Request
          </Button>
        </motion.div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'posted' ? 'active' : ''}`}
            onClick={() => setActiveTab('posted')}
          >
            Posted by Me
          </button>
          <button
            className={`tab ${activeTab === 'accepted' ? 'active' : ''}`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted by Me
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="requests-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Failed to load requests"
            description={error}
            onRetry={refetch}
          />
        ) : requests.length === 0 ? (
          <EmptyState
            icon={activeTab === 'posted' ? '📝' : '✋'}
            title={
              activeTab === 'posted'
                ? "You haven't posted any requests yet"
                : "You haven't accepted any requests yet"
            }
            description={
              activeTab === 'posted'
                ? 'Post your first request to get started'
                : 'Browse available requests and start helping'
            }
            actionLabel={activeTab === 'posted' ? 'Post a Request' : 'Browse Requests'}
            onAction={() => navigate(activeTab === 'posted' ? '/create-request' : '/browse')}
          />
        ) : (
          <motion.div
            className="requests-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {requests.map((request) => (
              <motion.div
                key={request._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <RequestCard request={request} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyRequestsPage;
