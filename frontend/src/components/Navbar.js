import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Convert path to breadcrumb links
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter((p) => p);
    const breadcrumbs = [];
  
    // Always show Home link as the root
    breadcrumbs.push(
      <span key="home" className="text-gray-500 capitalize">
        <Link to="/" className="hover:underline text-blue-700">Home</Link>
      </span>
    );
  
    let currentPath = '';
    paths.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push(
        <span key={index} className="text-gray-500 capitalize">
          <span className="mx-2">/</span>
          <Link to={currentPath} className="hover:underline text-blue-700">
            {segment}
          </Link>
        </span>
      );
    });
  
    return breadcrumbs;
  };
  

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Breadcrumb */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-extrabold text-indigo-600">
              MobileComm Website
            </Link>
            <div className="text-sm">{generateBreadcrumbs()}</div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {email && (
              <span className="text-gray-600 font-medium hidden sm:inline">
                {email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
