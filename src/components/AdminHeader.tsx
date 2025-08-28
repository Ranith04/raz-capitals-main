'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AdminHeaderProps {
  title?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
  showRefreshButton?: boolean;
  refreshButtonText?: string;
  onMobileMenuToggle?: () => void;
}

export default function AdminHeader({ 
  title = "Admin Console",
  onRefresh,
  refreshing = false,
  showBackButton = false,
  backUrl = "/admin/dashboard",
  showRefreshButton = true,
  refreshButtonText = "Refresh",
  onMobileMenuToggle
}: AdminHeaderProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear local session
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // Close dropdown
      setIsDropdownOpen(false);
      
      // Redirect to homepage
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local session and redirect
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      router.push('/');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBackClick = () => {
    router.push(backUrl);
  };

  return (
    <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
      {/* Left Side - Mobile Menu, Back Button, Title, and Refresh Button */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Toggle Button - Only visible on mobile */}
        {onMobileMenuToggle && (
          <button 
            className="lg:hidden text-white hover:text-[#9BC5A2] transition-colors duration-200 p-2"
            onClick={onMobileMenuToggle}
            title="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        {/* Back Button - Only show if requested */}
        {showBackButton && (
          <button 
            onClick={handleBackClick}
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            title="Go back"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        
        {/* Page Title */}
        <div className="text-white">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        {/* Refresh Button - Only show if requested */}
        {showRefreshButton && onRefresh && (
          <button 
            onClick={onRefresh}
            className="bg-[#2D4A32] text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={refreshing}
            title={refreshing ? "Refreshing..." : "Refresh data"}
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{refreshing ? 'Refreshing...' : refreshButtonText}</span>
          </button>
        )}
      </div>

      {/* Right Side - Admin Dropdown */}
      <div className="relative admin-dropdown">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:bg-[#1a3a28] px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          onClick={toggleDropdown}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#0A2E1D] font-bold text-sm">A</span>
          </div>
          <span className="text-white font-medium hidden sm:inline">Admin</span>
          <svg 
            className={`w-4 h-4 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out origin-top-right opacity-100 scale-100"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="text-sm font-medium text-gray-900">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2 transition-all duration-150 ease-in-out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
