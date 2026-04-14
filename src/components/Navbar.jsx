import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Shield } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <Package size={20} className="text-white scale-75 md:scale-100" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-green-400 transition-all duration-300">SagarSpace</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1 mx-8 text-sm">
          <a href="/" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/80 font-bold transition-colors">
            Home
          </a>
          <a href="/#projects" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/80 font-bold transition-colors">
            Projects
          </a>
          <a href="/#connect" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/80 font-bold transition-colors">
            Contact Me
          </a>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          {token ? (
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/admin/dashboard" className="text-xs md:text-sm font-bold text-gray-300 hover:text-white px-2 md:px-4 py-2 hover:bg-gray-800 rounded-xl transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs md:text-sm font-bold px-3 md:px-5 py-2 rounded-xl transition-colors border border-red-500/20">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="flex items-center space-x-1.5 md:space-x-2 text-xs md:text-sm font-bold text-white bg-gray-800 hover:bg-blue-600 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors border border-gray-700 shadow-lg cursor-pointer">
              <Shield size={16} className="md:scale-100 scale-90" />
              <span className="hidden sm:inline">Admin Portal</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
