// src/layouts/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import AmazonNavbar from '../components/AmazonNavbar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* The Navbar is the ONLY component that is part of the static layout now. */}
      <AmazonNavbar />

      {/* The main content area where different pages will appear */}
      <main className="flex-grow container mx-auto p-4">
        {/* The Outlet will render MainPart, ProductsList, or ProductPage depending on the URL */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;