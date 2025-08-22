'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { AuthService } from '@/lib/authService';
import { clearUserSession } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AdminDashboardContent() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Get dashboard metrics from the hook
  const { 
    metrics, 
    loading, 
    error, 
    fetchDashboardMetrics,
    refreshMetric 
  } = useDashboardMetrics();
  
  useEffect(() => {
    document.title = 'Admin Dashboard - RAZ CAPITALS';
  }, []);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest('.admin-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await AuthService.signOut();
      
      // Clear local session
      clearUserSession();
      
      // Close dropdown
      setIsDropdownOpen(false);
      
      // Redirect to homepage instead of signin page
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local session and redirect
      clearUserSession();
      router.push('/');
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="dashboard" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0A2E1D] mx-auto mb-4"></div>
            <p className="text-[#0A2E1D] text-lg font-medium">Loading Dashboard Metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="dashboard" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Error Loading Dashboard</p>
              <p>{error}</p>
            </div>
            <button 
              onClick={fetchDashboardMetrics}
              className="bg-[#0A2E1D] text-white px-4 py-2 rounded hover:bg-[#1a3a28] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          {/* Blue Icon Box in Header */}
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/users/1/profile')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          {/* Admin Dropdown */}
          <div className="relative admin-dropdown">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-[#1a3a28] px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              onClick={toggleDropdown}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0A2E1D] font-bold text-sm">A</span>
              </div>
              <span className="text-white font-medium">Admin</span>
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

        {/* Refresh Button */}
        <div className="bg-[#0A2E1D] px-4 pb-2">
          <button 
            onClick={fetchDashboardMetrics}
            className="bg-[#2D4A32] text-white px-4 py-2 rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh Metrics</span>
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-0 overflow-y-auto">
          {/* Today Registration */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Today Registration</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.todayRegistration}</span>
          </div>

          {/* Total Registration */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total Registration</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalRegistration}</span>
          </div>

          {/* KYC Pending */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">KYC Pending</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.kycPending}</span>
          </div>

          {/* Total Live Accounts */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total Live Accounts</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalLiveAccounts}</span>
          </div>

          {/* Total Demo Accounts */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total Demo Accounts</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalDemoAccounts}</span>
          </div>

          {/* Total Today Deposits */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total Today Deposits</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalTodayDeposits}</span>
          </div>

          {/* Total Today Withdrawal */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total Today Withdrawal</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalTodayWithdrawals}</span>
          </div>

          {/* This Month Deposit */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">This Month Deposit</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.thisMonthDeposits}</span>
          </div>

          {/* This Month Withdrawal */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">This Month Withdrawal</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.thisMonthWithdrawals}</span>
          </div>

          {/* Total IB Clients */}
          <div className="bg-[#2D4A32] rounded-2xl px-4 py-3 grid grid-cols-3 items-center h-16 -mb-2">
            <span className="text-white font-medium text-base">Total IB Clients</span>
            <span className="text-white text-lg text-center">:</span>
            <span className="text-white font-bold text-xl text-right">{metrics.totalIBClients}</span>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="absolute bottom-6 right-6">
          <button 
            className="w-12 h-12 bg-[#0A2E1D] rounded-full flex items-center justify-center text-white hover:bg-[#1a3a28] transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
