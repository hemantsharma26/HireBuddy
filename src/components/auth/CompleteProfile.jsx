import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: '',
    age: '',
    email: '',
    bio: '',
    city: '',
    area: '',
    profilePicture: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.age < 18) {
      toast.error('You must be at least 18 years old');
      return;
    }

    setLoading(true);
    try {
      const profilePayload = {
        displayName: formData.displayName,
        age: parseInt(formData.age),
        email: formData.email || undefined,
        bio: formData.bio || undefined,
        location: {
          city: formData.city,
          area: formData.area
        },
        profilePicture: formData.profilePicture || undefined
      };

      const data = await authService.completeProfile(profilePayload);
      
      toast.success('Profile created successfully!');
      login(data.token, data.user);
      navigate('/');
    } catch (error) {
      // Error handled by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-card">
        <div className="profile-header">
          <h1>Complete Your Profile</h1>
          <p>Let's get to know you better</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Display Name *</label>
            <input
              type="text"
              name="displayName"
              placeholder="Enter your name"
              value={formData.displayName}
              onChange={handleChange}
              minLength="2"
              maxLength="50"
              required
            />
          </div>

          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (Optional)</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              placeholder="e.g., Mumbai"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Area *</label>
            <input
              type="text"
              name="area"
              placeholder="e.g., Andheri"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Bio (Optional)</label>
            <textarea
              name="bio"
              placeholder="Tell us a bit about yourself..."
              value={formData.bio}
              onChange={handleChange}
              maxLength="500"
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Creating Profile...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
