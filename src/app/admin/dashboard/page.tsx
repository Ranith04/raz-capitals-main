'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AdminDashboardContent() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="dashboard" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Admin Dashboard"
            onRefresh={fetchDashboardMetrics}
            refreshing={loading}
            showRefreshButton={true}
            refreshButtonText="Refresh Metrics"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0A2E1D] mx-auto mb-4"></div>
              <p className="text-[#0A2E1D] text-lg font-medium">Loading Dashboard Metrics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="dashboard" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Admin Dashboard"
            onRefresh={fetchDashboardMetrics}
            refreshing={false}
            showRefreshButton={true}
            refreshButtonText="Refresh Metrics"
            onMobileMenuToggle={toggleMobileSidebar}
          />
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
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        currentPage="dashboard" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Admin Dashboard"
          onRefresh={fetchDashboardMetrics}
          refreshing={loading}
          showRefreshButton={true}
          refreshButtonText="Refresh Metrics"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Statistics Grid */}
        <div className="flex-1 p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-x-6 lg:gap-y-0 overflow-y-auto">
          {/* Today Registration */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Today Registration</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.todayRegistration}</span>
          </div>

          {/* Total Registration */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total Registration</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalRegistration}</span>
          </div>

          {/* KYC Pending */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">KYC Pending</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.kycPending}</span>
          </div>

          {/* Total Live Accounts */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total Live Accounts</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalLiveAccounts}</span>
          </div>

          {/* Total Demo Accounts */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total Demo Accounts</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalDemoAccounts}</span>
          </div>

          {/* Total Today Deposits */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total Today Deposits</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalTodayDeposits}</span>
          </div>

          {/* Total Today Withdrawal */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total Today Withdrawal</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalTodayWithdrawals}</span>
          </div>

          {/* This Month Deposit */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">This Month Deposit</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.thisMonthDeposits}</span>
          </div>

          {/* This Month Withdrawal */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">This Month Withdrawal</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.thisMonthWithdrawals}</span>
          </div>

          {/* Total IB Clients */}
          <div className="bg-[#2D4A32] rounded-2xl px-2 xs:px-3 sm:px-3 md:px-4 lg:px-4 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 grid grid-cols-3 items-center h-12 xs:h-14 sm:h-14 md:h-16 lg:h-16 lg:-mb-2">
            <span className="text-white font-medium text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base">Total IB Clients</span>
            <span className="text-white text-sm xs:text-lg sm:text-lg md:text-lg lg:text-lg text-center">:</span>
            <span className="text-white font-bold text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl text-right">{metrics.totalIBClients}</span>
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
