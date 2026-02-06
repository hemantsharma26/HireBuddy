import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 400px)' }}> {/* Reduced height to let footer fit naturally */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
