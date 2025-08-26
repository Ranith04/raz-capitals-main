'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useDemoAccounts } from '@/hooks/useDemoAccounts';
import { TradingAccountWithUser } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function DemoAccountsContent() {
  const router = useRouter();
  const { accounts, loading, error, refreshAccounts } = useDemoAccounts();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDemoDuration, setSelectedDemoDuration] = useState('All Durations');
  const [selectedCreationDate, setSelectedCreationDate] = useState('');

  useEffect(() => {
    document.title = 'Demo Accounts - RAZ CAPITALS';
  }, []);

  // Filter accounts based on search criteria
  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        `${account.user.first_name} ${account.user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.account_uid.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'All Status' || account.status === selectedStatus.toLowerCase();

      // Demo Duration filter - for demo accounts, we can use account creation date to calculate duration
      let matchesDemoDuration = true;
      if (selectedDemoDuration !== 'All Durations') {
        const createdDate = new Date(account.created_at);
        const now = new Date();
        const daysDiff = Math.ceil((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (selectedDemoDuration) {
          case '30 Days':
            matchesDemoDuration = daysDiff <= 30;
            break;
          case '60 Days':
            matchesDemoDuration = daysDiff > 30 && daysDiff <= 60;
            break;
          case '90 Days':
            matchesDemoDuration = daysDiff > 60 && daysDiff <= 90;
            break;
          case 'Unlimited':
            matchesDemoDuration = daysDiff > 90;
            break;
        }
      }

      // Creation Date filter
      const matchesCreationDate = selectedCreationDate === '' || 
        account.created_at.startsWith(selectedCreationDate);

      return matchesSearch && matchesStatus && matchesDemoDuration && matchesCreationDate;
    });
  }, [accounts, searchTerm, selectedStatus, selectedDemoDuration, selectedCreationDate]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All Status');
    setSelectedDemoDuration('All Durations');
    setSelectedCreationDate('');
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate expiration date (demo accounts typically expire after 30-90 days)
  const calculateExpirationDate = (createdAt: string, accountType: string) => {
    const createdDate = new Date(createdAt);
    let expirationDate;
    
    // Demo accounts typically have different expiration periods
    switch (accountType) {
      case 'demo_30':
        expirationDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        break;
      case 'demo_60':
        expirationDate = new Date(createdDate.getTime() + (60 * 24 * 60 * 60 * 1000));
        break;
      case 'demo_90':
        expirationDate = new Date(createdDate.getTime() + (90 * 24 * 60 * 60 * 1000));
        break;
      case 'demo_unlimited':
        return 'Unlimited';
      default:
        expirationDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    }
    
    return formatDate(expirationDate.toISOString());
  };

  // Calculate demo duration based on account type
  const getDemoDuration = (accountType: string) => {
    switch (accountType) {
      case 'demo_30':
        return '30 Days';
      case 'demo_60':
        return '60 Days';
      case 'demo_90':
        return '90 Days';
      case 'demo_unlimited':
        return 'Unlimited';
      default:
        return '30 Days';
    }
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'expired':
        return 'bg-red-500/20 text-red-400';
      case 'suspended':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Calculate P&L (Profit & Loss)
  const calculatePnL = (account: TradingAccountWithUser) => {
    return account.equity - account.balance;
  };

  // Calculate statistics based on filtered accounts
  const totalVirtualBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  const averageVirtualBalance = filteredAccounts.length > 0 ? totalVirtualBalance / filteredAccounts.length : 0;
  const activeDemos = filteredAccounts.filter(account => account.status === 'active').length;

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="demo-accounts" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2E1D] mx-auto mb-4"></div>
            <p className="text-[#0A2E1D] text-lg">Loading demo accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="demo-accounts" />
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
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="demo-accounts" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-medium">Admin</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Demo Accounts Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Demo Trading Accounts</h1>
            <div className="flex space-x-4">
              <button 
                onClick={refreshAccounts}
                className="px-6 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Refresh Data
              </button>
              <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
                Create Demo Account
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Demo Accounts</h3>
              <p className="text-white text-2xl font-bold">{filteredAccounts.length}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Active Demos</h3>
              <p className="text-green-400 text-2xl font-bold">{activeDemos}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Virtual Balance</h3>
              <p className="text-white text-2xl font-bold">{formatCurrency(totalVirtualBalance)}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Avg Demo Balance</h3>
              <p className="text-white text-2xl font-bold">{formatCurrency(averageVirtualBalance)}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Search Account</label>
                <input 
                  type="text" 
                  placeholder="Demo Account ID or Owner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Account Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Expired</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Demo Duration</label>
                <select 
                  value={selectedDemoDuration}
                  onChange={(e) => setSelectedDemoDuration(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                >
                  <option>All Durations</option>
                  <option>30 Days</option>
                  <option>60 Days</option>
                  <option>90 Days</option>
                  <option>Unlimited</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Creation Date</label>
                <input 
                  type="date" 
                  value={selectedCreationDate}
                  onChange={(e) => setSelectedCreationDate(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                />
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex justify-between items-center">
              <div className="text-white text-sm">
                Showing {filteredAccounts.length} of {accounts.length} demo accounts
              </div>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Demo Accounts Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Demo Trading Accounts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Demo ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Owner</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Virtual Balance</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Current Equity</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Virtual P&L</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Expires</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => {
                      const pnl = calculatePnL(account);
                      const demoDuration = getDemoDuration(account.account_type);
                      const expirationDate = calculateExpirationDate(account.created_at, account.account_type);
                      
                      return (
                        <tr key={account.id} className="border-b border-[#4A6741]/50">
                          <td className="text-white py-4">{account.account_uid}</td>
                          <td className="text-white py-4">
                            <div>
                              <div className="font-medium">{`${account.user.first_name} ${account.user.last_name}`}</div>
                              <div className="text-sm text-[#9BC5A2]">{account.user.email}</div>
                            </div>
                          </td>
                          <td className="text-white py-4">{formatCurrency(account.balance, account.currency)}</td>
                          <td className="text-white py-4">{formatCurrency(account.equity, account.currency)}</td>
                          <td className={`py-4 ${pnl > 0 ? 'text-green-400' : pnl < 0 ? 'text-red-400' : 'text-white'}`}>
                            {pnl > 0 ? '+' : ''}{formatCurrency(pnl, account.currency)}
                          </td>
                          <td className="text-white py-4">{expirationDate}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(account.status)}`}>
                              {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <button 
                                className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                                onClick={() => router.push(`/admin/trade-accounts/trade-acc-details?id=${account.account_uid}`)}
                              >
                                View
                              </button>
                              {account.status === 'active' && (
                                <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                                  Extend
                                </button>
                              )}
                              {account.status === 'active' && (
                                <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                                  Reset
                                </button>
                              )}
                              {account.status === 'expired' && (
                                <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                                  Renew
                                </button>
                              )}
                              {account.status === 'suspended' && (
                                <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-blue-900/30 text-sm">
                                  Activate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center text-white py-8">
                        {accounts.length === 0 ? 'No demo trading accounts found in the database.' : 'No accounts found matching the current filters.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoAccountsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DemoAccountsContent />
    </ProtectedRoute>
  );
}
