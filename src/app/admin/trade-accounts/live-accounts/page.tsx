'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import AdminPageSkeleton from '@/components/AdminPageSkeleton';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTradingAccounts } from '@/hooks/useTradingAccounts';
import {
    calculateAverageBalance,
    calculatePnL,
    calculateTotalBalance,
    countAccountsByStatus,
    formatCurrency,
    getAccountTypeDisplayName,
    getStatusBadgeStyle
} from '@/utils/tradingCalculations';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function LiveAccountsContent() {
  const router = useRouter();
  const { accounts, loading, error, refreshAccounts } = useTradingAccounts();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedAccountType, setSelectedAccountType] = useState('All Types');
  const [selectedBalanceRange, setSelectedBalanceRange] = useState('All Ranges');

  useEffect(() => {
    document.title = 'Live Accounts - RAZ CAPITALS';
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Filter accounts based on search criteria
  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        `${account.user.first_name} ${account.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.account_uid.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'All Status' || account.status === selectedStatus.toLowerCase();

      // Account Type filter
      const matchesAccountType = selectedAccountType === 'All Types' || account.account_type === selectedAccountType.toLowerCase();

      // Balance Range filter
      let matchesBalanceRange = true;
      if (selectedBalanceRange !== 'All Ranges') {
        switch (selectedBalanceRange) {
          case '$0 - $1,000':
            matchesBalanceRange = account.balance >= 0 && account.balance <= 1000;
            break;
          case '$1,000 - $10,000':
            matchesBalanceRange = account.balance > 1000 && account.balance <= 10000;
            break;
          case '$10,000 - $50,000':
            matchesBalanceRange = account.balance > 10000 && account.balance <= 50000;
            break;
          case '$50,000+':
            matchesBalanceRange = account.balance > 50000;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesAccountType && matchesBalanceRange;
    });
  }, [accounts, searchTerm, selectedStatus, selectedAccountType, selectedBalanceRange]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All Status');
    setSelectedAccountType('All Types');
    setSelectedBalanceRange('All Ranges');
  };

  // Calculate statistics based on filtered accounts
  const totalBalance = calculateTotalBalance(filteredAccounts);
  const averageBalance = calculateAverageBalance(filteredAccounts);
  const activeAccounts = countAccountsByStatus(filteredAccounts, 'active');

  // Show skeleton immediately for better UX - don't block the entire UI
  const showSkeleton = loading && accounts.length === 0;

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="live-accounts" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Live Trading Accounts"
            onRefresh={refreshAccounts}
            refreshing={false}
            showRefreshButton={true}
            refreshButtonText="Refresh Data"
            showBackButton={true}
            backUrl="/admin/dashboard"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-[#0A2E1D] text-lg mb-4">{error}</p>
              <button 
                onClick={refreshAccounts}
                className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
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
        currentPage="live-accounts" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Live Trading Accounts"
          onRefresh={refreshAccounts}
          refreshing={loading}
          showRefreshButton={true}
          refreshButtonText="Refresh Data"
          showBackButton={true}
          backUrl="/admin/dashboard"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Show skeleton for initial load, content otherwise */}
        {showSkeleton ? (
          <AdminPageSkeleton />
        ) : (
          /* Live Accounts Content */
          <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Page Title */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-[#0A2E1D] text-2xl sm:text-3xl font-bold">Live Trading Accounts</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2">Total Live Accounts</h3>
              <p className="text-white text-xl sm:text-2xl font-bold">{filteredAccounts.length}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2">Active Accounts</h3>
              <p className="text-green-400 text-xl sm:text-2xl font-bold">{activeAccounts}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2">Total Balance</h3>
              <p className="text-white text-xl sm:text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs sm:text-sm font-medium mb-2">Average Balance</h3>
              <p className="text-white text-xl sm:text-2xl font-bold">{formatCurrency(averageBalance)}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Search Account</label>
                <input 
                  type="text" 
                  placeholder="Account ID or Owner name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Account Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Account Type</label>
                <select 
                  value={selectedAccountType}
                  onChange={(e) => setSelectedAccountType(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base"
                >
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Premium</option>
                  <option>VIP</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Balance Range</label>
                <select 
                  value={selectedBalanceRange}
                  onChange={(e) => setSelectedBalanceRange(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-3 sm:px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-sm sm:text-base"
                >
                  <option>All Ranges</option>
                  <option>$0 - $1,000</option>
                  <option>$1,000 - $10,000</option>
                  <option>$10,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-white text-xs sm:text-sm">
                Showing {filteredAccounts.length} of {accounts.length} accounts
              </div>
              <button 
                onClick={clearFilters}
                className="w-full sm:w-auto px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-xs sm:text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Live Accounts Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6">
            <h2 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Live Trading Accounts</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => {
                  const pnl = calculatePnL(account);
                  return (
                    <div key={account.id} className="bg-[#4A6741] rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{account.account_uid}</div>
                          <div className="text-[#9BC5A2] text-xs">{`${account.user.first_name} ${account.user.last_name}`}</div>
                          <div className="text-[#9BC5A2] text-xs">{account.user.email}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(account.status)}`}>
                          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-[#9BC5A2] text-xs">Type</div>
                          <div className="text-white">{getAccountTypeDisplayName(account.account_type)}</div>
                        </div>
                        <div>
                          <div className="text-[#9BC5A2] text-xs">Leverage</div>
                          <div className="text-white">{account.levarage}:1</div>
                        </div>
                        <div>
                          <div className="text-[#9BC5A2] text-xs">Balance</div>
                          <div className="text-white">{formatCurrency(account.balance, account.currency)}</div>
                        </div>
                        <div>
                          <div className="text-[#9BC5A2] text-xs">P&L</div>
                          <div className={`${pnl > 0 ? 'text-green-400' : pnl < 0 ? 'text-red-400' : 'text-white'}`}>
                            {pnl > 0 ? '+' : ''}{formatCurrency(pnl, account.currency)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-[#9BC5A2]/30">
                        <button 
                          className="w-full text-[#9BC5A2] hover:text-white transition-colors px-3 py-2 bg-[#2D4A32] rounded hover:bg-[#3A5A3F] text-sm"
                          onClick={() => router.push(`/admin/trade-accounts/trade-acc-details?id=${account.account_uid}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-white py-8">
                  {accounts.length === 0 ? 'No live trading accounts found in the database.' : 'No accounts found matching the current filters.'}
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Owner</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Balance</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Equity</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">P&L</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Leverage</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => {
                      const pnl = calculatePnL(account);
                      return (
                        <tr key={account.id} className="border-b border-[#4A6741]/50">
                          <td className="text-white py-4">{account.account_uid}</td>
                          <td className="text-white py-4">
                            <div>
                              <div className="font-medium">{`${account.user.first_name} ${account.user.last_name}`}</div>
                              <div className="text-sm text-[#9BC5A2]">{account.user.email}</div>
                            </div>
                          </td>
                          <td className="text-white py-4">{getAccountTypeDisplayName(account.account_type)}</td>
                          <td className="text-white py-4">{formatCurrency(account.balance, account.currency)}</td>
                          <td className="text-white py-4">{formatCurrency(account.equity, account.currency)}</td>
                          <td className={`py-4 ${pnl > 0 ? 'text-green-400' : pnl < 0 ? 'text-red-400' : 'text-white'}`}>
                            {pnl > 0 ? '+' : ''}{formatCurrency(pnl, account.currency)}
                          </td>
                          <td className="text-white py-4">{account.levarage}:1</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(account.status)}`}>
                              {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <button 
                              className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                              onClick={() => router.push(`/admin/trade-accounts/trade-acc-details?id=${account.account_uid}`)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center text-white py-8">
                        {accounts.length === 0 ? 'No live trading accounts found in the database.' : 'No accounts found matching the current filters.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default function LiveAccountsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <LiveAccountsContent />
    </ProtectedRoute>
  );
}
