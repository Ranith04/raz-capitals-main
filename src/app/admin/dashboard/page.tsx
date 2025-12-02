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

  // Navigation handlers for KPI cards
  const handleCardClick = (route: string) => {
    router.push(route);
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
            {/* Today Registration */}
            <div 
              onClick={() => handleCardClick('/admin/client-operations/new-client-list')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Today Registration</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.todayRegistration}</span>
            </div>

            {/* Total Registration */}
            <div 
              onClick={() => handleCardClick('/admin/client-operations/client-list')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total Registration</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalRegistration}</span>
            </div>

            {/* KYC Pending */}
            <div 
              onClick={() => handleCardClick('/admin/client-operations/client-list')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">KYC Pending</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.kycPending}</span>
            </div>

            {/* Total Live Accounts */}
            <div 
              onClick={() => handleCardClick('/admin/trade-accounts/live-accounts')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total Live Accounts</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalLiveAccounts}</span>
            </div>

            {/* Total Demo Accounts */}
            <div 
              onClick={() => handleCardClick('/admin/trade-accounts/demo-accounts')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total Demo Accounts</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalDemoAccounts}</span>
            </div>

            {/* Total Today Deposits */}
            <div 
              onClick={() => handleCardClick('/admin/fund-operations/deposit-fund')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total Today Deposits</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalTodayDeposits}</span>
            </div>

            {/* Total Today Withdrawal */}
            <div 
              onClick={() => handleCardClick('/admin/fund-operations/withdraw-fund')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total Today Withdrawal</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalTodayWithdrawals}</span>
            </div>

            {/* This Month Deposit */}
            <div 
              onClick={() => handleCardClick('/admin/fund-operations/deposit-fund')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">This Month Deposit</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.thisMonthDeposits}</span>
            </div>

            {/* This Month Withdrawal */}
            <div 
              onClick={() => handleCardClick('/admin/fund-operations/withdraw-fund')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">This Month Withdrawal</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.thisMonthWithdrawals}</span>
            </div>

            {/* Total IB Clients */}
            <div 
              onClick={() => handleCardClick('/admin/client-operations/client-list')}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 p-5 flex items-center justify-between cursor-pointer active:scale-[0.98]"
            >
              <span className="text-gray-700 font-medium text-sm sm:text-base">Total IB Clients</span>
              <span className="text-[#0A2E1D] font-bold text-xl sm:text-2xl">{metrics.totalIBClients}</span>
            </div>
          </div>
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
