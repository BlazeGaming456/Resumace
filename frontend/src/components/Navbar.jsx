import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo on the left */}
      <div className="text-xl font-bold">
        <Link to="/">Resumace</Link>
      </div>

      {/* Center navigation links */}
      <div className="flex space-x-8">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/features" className="hover:text-blue-500">Features</Link>
        <Link to="/pricing" className="hover:text-blue-500">Pricing</Link>
      </div>

      {/* User icon on the right */}
      <div className="text-xl">
        <Link to="/profile">
          <FaUser className="hover:text-blue-500" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;