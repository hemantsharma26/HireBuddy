import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Public Restricted Route
 * Redirects authenticated users to the dashboard/browse page.
 * Used for pages like Login, Signup that logged-in users shouldn't see.
 */
const PublicRestrictedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner
  }

  return isAuthenticated ? <Navigate to="/browse" replace /> : <Outlet />;
};

export default PublicRestrictedRoute;
