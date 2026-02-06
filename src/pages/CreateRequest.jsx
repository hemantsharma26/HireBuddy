import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCreateRequest } from '../features/requests/hooks/useRequests';
import { Button } from '../components/ui/Button';
import { CATEGORIES, JOB_TYPES } from '../utils/constants';
import toast from 'react-hot-toast';
import './CreateRequest.css';

/**
 * Create Request Page
 * Uses useCreateRequest hook
 * Clean form with validation
 */

import { useAuth } from '../contexts/AuthContext';
import './CreateRequest.css';

/**
 * Create Request Page (Buddy Hire)
 * Publicly visible drafting page
 */

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { loading, createRequest } = useCreateRequest();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    jobType: 'in-person',
    city: '',
    area: '',
    compensation: '',
    duration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to post a request');
      navigate('/login', { state: { from: '/create-request', formData } });
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        jobType: formData.jobType,
        location: {
          city: formData.city,
          area: formData.area
        },
        compensation: formData.compensation || undefined,
        duration: formData.duration || undefined
      };

      const result = await createRequest(payload);
      toast.success('Request posted successfully!');
      navigate(`/requests/${result.request._id}`);
    } catch (error) {
      if (error.response?.data?.flaggedWords) {
        toast.error(`Content contains prohibited words: ${error.response.data.flaggedWords.join(', ')}`);
      }
    }
  };

  return (
    <div className="create-request-page">
      {/* Hero Section */}
      <section className="create-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Buddy Hire</h1>
          <p>Tell us what you need, and we'll help you find the perfect buddy for the job. Effortless, reliable, and local.</p>
        </div>
      </section>

      <div className="container">
        <motion.div
          className="create-request-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="form-intro">
            <h2>Post a Request</h2>
            <p>Describe your requirement below</p>
          </div>

          <form onSubmit={handleSubmit} className="create-request-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g., Need medicine pickup from pharmacy"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe what you need help with..."
                value={formData.description}
                onChange={handleChange}
                maxLength={1000}
                rows={5}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="jobType">Job Type *</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  {JOB_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="e.g., Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="area">Area *</label>
                <input
                  id="area"
                  type="text"
                  name="area"
                  placeholder="e.g., Andheri"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="compensation">Compensation (Optional)</label>
                <input
                  id="compensation"
                  type="text"
                  name="compensation"
                  placeholder="e.g., ₹200"
                  value={formData.compensation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (Optional)</label>
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  placeholder="e.g., 30 minutes"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                disabled={loading}
              >
                Post Request
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateRequestPage;
