import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroImageStack from '../components/home/HeroImageStack';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* 
        HERO SECTION - BUMBLE PRECISION REBUILD
        Warm Yellow Gradient + Watermark + Strict 2-Column Grid
      */}
      <section className="hero-section-bumble">
        {/* Background Watermark */}
        <div className="hero-watermark">HireBuddy</div>
        
        <div className="hero-container">
          {/* LEFT COLUMN: CONTENT */}
          <div className="hero-content-col">
            <h1 className="hero-headline">
              Get things done,<br />
              with people nearby
            </h1>
            <p className="hero-subheading">
              Hire trusted people for everyday tasks —<br />
              fast, safe, and human.
            </p>
            
            <div className="hero-actions">
              {user ? (
                <button className="btn-hero-primary" onClick={() => navigate('/browse')}>
                  Browse Requests
                </button>
              ) : (
                <>
                  <button className="btn-hero-primary" onClick={() => navigate('/login')}>
                    Get Started
                  </button>
                  <button className="btn-hero-secondary" onClick={() => navigate('/how-it-works')}>
                    How it works
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* RIGHT COLUMN: STACK INTERACTION */}
          <div className="hero-vis-col">
            <HeroImageStack />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Make the first move</h2>
          <p>Whether you need help or want to help, HireBuddy makes it easy.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-img-wrapper">
               <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop" alt="Post a Request" />
            </div>
            <h3>Post a Request</h3>
            <p>Describe what you need help with. From moving furniture to tech support, our community is here.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-img-wrapper">
               <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" alt="Connect" />
            </div>
            <h3>Connect Instantly</h3>
            <p>Chat with verified locals who can help. Agree on details and get started immediately.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-img-wrapper">
               <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" alt="Get Paid" />
            </div>
            <h3>Earn Money</h3>
            <p>Turn your spare time and skills into cash. Help your neighbors and build your reputation.</p>
          </div>
        </div>
      </section>

      {/* How It Works - Step Based */}
      <section className="how-it-works-section">
        <div className="content-wrapper">
          <div className="text-content">
            <h2>How HireBuddy Works</h2>
            <div className="step-list">
              <div className="step-item">
                <span className="step-number">1</span>
                <div className="step-details">
                  <h4>Create a Request</h4>
                  <p>Share details about the task, location, and budget.</p>
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">2</span>
                <div className="step-details">
                  <h4>Review Applicants</h4>
                  <p>Check profiles and ratings to find the perfect helper.</p>
                </div>
              </div>
              <div className="step-item">
                <span className="step-number">3</span>
                <div className="step-details">
                  <h4>Get it Done</h4>
                  <p>Collaborate, complete the task, and exchange payments.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="image-content">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" 
              alt="How it Works" 
              className="rounded-image"
            />
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="trust-section">
        <h2>Join thousands of trusted neighbors</h2>
        <div className="stats-row">
            <div className="stat-block">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-block">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Tasks Done</span>
            </div>
            <div className="stat-block">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Average Rating</span>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
