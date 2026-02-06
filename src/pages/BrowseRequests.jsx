import React, { useState, useEffect, useRef, useCallback } from 'react';
import { requestService } from '../services/requestService';
import './BrowseRequests.css';

const BrowseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [location, setLocation] = useState(null);
  const observer = useRef();

  // Get user location for proximity sorting
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location access denied", error);
        }
      );
    }
  }, []);

  // Fetch requests
  const fetchRequests = useCallback(async (pageNum) => {
    setLoading(true);
    try {
      const filters = {
        page: pageNum,
        limit: 10,
        ...(location ? { lat: location.lat, lng: location.lng } : {})
      };
      
      const response = await requestService.browseRequests(filters);
      const newRequests = response.data.requests;
      
      setRequests(prev => pageNum === 1 ? newRequests : [...prev, ...newRequests]);
      
      // Calculate hasMore since it might be missing from backend mapping
      const { page, limit, total } = response.pagination;
      setHasMore(page * limit < total);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchRequests(1);
  }, [fetchRequests]);

  // Infinite scroll observer
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchRequests(nextPage);
          return nextPage;
        });
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchRequests]);

  return (
    <div className="browse-page">
      {/* Hero Section */}
      <section className="browse-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Requirement Buddy</h1>
          <p>Find people who need your help or discover opportunities nearby. From small tasks to specialized jobs, everything is just a scroll away.</p>
        </div>
      </section>

      <div className="browse-container">
        <div className="list-header">
          <h2>Active Requirements</h2>
          {location && <span className="location-badge">Sorted by Proximity 📍</span>}
        </div>

        <div className="requests-grid">
          {requests.map((request, index) => (
            <div 
              key={request._id} 
              className="request-card"
              ref={index === requests.length - 1 ? lastElementRef : null}
            >
              <div className="card-header">
                <div className="user-info">
                  <img 
                    src={request.requesterId?.profilePicture || '/default-avatar.png'} 
                    alt={request.requesterId?.displayName} 
                  />
                  <span>{request.requesterId?.displayName}</span>
                </div>
                <span className={`category-tag ${request.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  {request.category}
                </span>
              </div>
              
              <h3>{request.title}</h3>
              <p className="description">{request.description}</p>
              
              <div className="card-footer">
                <div className="location">
                  <span>📍 {request.location?.city}, {request.location?.area}</span>
                </div>
                <div className="job-type">
                  <span>💼 {request.jobType}</span>
                </div>
                <div className="compensation">
                  <span>💰 {request.compensation}</span>
                </div>
              </div>
              
              <button className="btn-view-details">Apply Now</button>
            </div>
          ))}
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Finding more buddies...</span>
          </div>
        )}

        {!hasMore && requests.length > 0 && (
          <div className="end-state">
            <p>You've seen all the requirements for now! 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRequests;
