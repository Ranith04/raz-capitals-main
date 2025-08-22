'use client';

import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

interface DashboardMetricsProps {
  darkMode?: boolean;
}

export default function DashboardMetrics({ darkMode = true }: DashboardMetricsProps) {
  const { metrics, loading, error, fetchDashboardMetrics } = useDashboardMetrics();

  if (error) {
    return (
      <div className={`${darkMode ? 'bg-[#2D4A35]' : 'bg-white border border-gray-200'} rounded-lg p-4 sm:p-6`}>
        <div className="text-center py-8">
          <div className={`text-red-500 mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className={`text-sm ${darkMode ? 'text-[#A0C8A9]' : 'text-gray-600'}`}>
            Error loading metrics: {error}
          </p>
          <button 
            onClick={fetchDashboardMetrics}
            className={`mt-3 ${darkMode ? 'bg-[#A0C8A9] hover:bg-[#8BB89A] text-[#1E2E23]' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-[#2D4A35]' : 'bg-white border border-gray-200'} rounded-lg p-4 sm:p-6`}>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className={`text-base sm:text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Platform Analytics</h2>
        <button 
          onClick={fetchDashboardMetrics}
          disabled={loading}
          className={`${darkMode ? 'bg-[#A0C8A9] hover:bg-[#8BB89A] text-[#1E2E23]' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50`}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mx-auto"></div>
          <p className={`mt-2 text-sm ${darkMode ? 'text-[#A0C8A9]' : 'text-gray-600'}`}>Loading metrics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Today Registration */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.todayRegistration}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Today Registration
            </div>
          </div>

          {/* Total Registration */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalRegistration}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Total Registration
            </div>
          </div>

          {/* KYC Pending */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.kycPending}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              KYC Pending
            </div>
          </div>

          {/* Total Live Accounts */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalLiveAccounts}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Live Accounts
            </div>
          </div>

          {/* Total Demo Accounts */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalDemoAccounts}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Demo Accounts
            </div>
          </div>

          {/* Today Deposits */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalTodayDeposits}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Today Deposits
            </div>
          </div>

          {/* Today Withdrawals */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalTodayWithdrawals}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Today Withdrawals
            </div>
          </div>

          {/* This Month Deposits */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.thisMonthDeposits}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Month Deposits
            </div>
          </div>

          {/* This Month Withdrawals */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.thisMonthWithdrawals}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              Month Withdrawals
            </div>
          </div>

          {/* Total IB Clients */}
          <div className={`${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-[#1E2E23]' : 'text-gray-900'}`}>
              {metrics.totalIBClients}
            </div>
            <div className={`text-xs ${darkMode ? 'text-[#1E2E23]/70' : 'text-gray-600'}`}>
              IB Clients
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
