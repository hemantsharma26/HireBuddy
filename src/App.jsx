import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import OTPLogin from './components/auth/OTPLogin';
import CompleteProfile from './components/auth/CompleteProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRestrictedRoute from './components/auth/PublicRestrictedRoute';
import HomePage from './pages/HomePage';
import BrowseRequestsPage from './pages/BrowseRequests';
import CreateRequestPage from './pages/CreateRequest';
import RequestDetailsPage from './pages/RequestDetails';
import MyRequestsPage from './pages/MyRequests';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          
          <Routes>
            {/* Main Layout routes (includes Navbar) */}
            <Route element={<MainLayout />}>
              
              {/* Public Routes (Accessible by everyone) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/how-it-works" element={<HomePage />} /> {/* Mapping to home for now */}
              <Route path="/browse" element={<BrowseRequestsPage />} />
              <Route path="/create-request" element={<CreateRequestPage />} />

              {/* Public Restricted Routes (Only for Guests - e.g. Login) */}
              <Route element={<PublicRestrictedRoute />}>
                <Route path="/login" element={<OTPLogin />} />
              </Route>

              {/* Protected Routes (Only for Auth Users) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/requests/:id" element={<RequestDetailsPage />} />
                <Route path="/my-requests" element={<MyRequestsPage />} />
                <Route path="/complete-profile" element={<CompleteProfile />} />
              </Route>

            </Route>

            {/* Redirect all unknown routes to home (or 404 page) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
