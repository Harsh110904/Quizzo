import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-neutral-900">Quizzo</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {!isLanding && (
              <Link 
                to="/" 
                className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200"
              >
                Home
              </Link>
            )}
            {isLanding ? (
              <Link to="/upload" className="btn-primary">
                Get Started
              </Link>
            ) : (
              <Link to="/upload" className="btn-secondary">
                New Quiz
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;