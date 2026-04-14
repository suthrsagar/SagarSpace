import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Package, Shield } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <Package size={22} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-green-400 transition-all duration-300">SagarSpace</span>
        </Link>
        
        <div className="hidden md:flex items-center bg-[#1A1F26] rounded-2xl px-5 py-2.5 flex-grow max-w-xl mx-8 border border-gray-800 shadow-inner focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <Search size={18} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search for applications, updates..." 
            className="bg-transparent border-none outline-none w-full ml-3 text-sm text-gray-200 placeholder-gray-500 font-medium"
          />
        </div>

        <div className="flex items-center space-x-6">
          {token ? (
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-sm font-bold text-gray-300 hover:text-white px-4 py-2 hover:bg-gray-800 rounded-xl transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors border border-red-500/20">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="flex items-center space-x-2 text-sm font-bold text-white bg-gray-800 hover:bg-blue-600 px-5 py-2.5 rounded-xl transition-colors border border-gray-700 shadow-lg cursor-pointer">
              <Shield size={16} />
              <span>Admin Portal</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
