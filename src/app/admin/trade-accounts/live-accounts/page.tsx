'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function LiveAccountsContent() {
  const router = useRouter();
  
  // Sample live accounts data
  const [accounts] = useState([
    {
      id: '#LIVE001',
      owner: 'Abdul Khadar Ishak',
      accountType: 'Premium',
      balance: 25450.00,
      equity: 24780.00,
      pnl: 2340.00,
      status: 'Active'
    },
    {
      id: '#LIVE002',
      owner: 'Sarah Johnson',
      accountType: 'Standard',
      balance: 8920.00,
      equity: 9145.00,
      pnl: 1225.00,
      status: 'Active'
    },
    {
      id: '#LIVE003',
      owner: 'Michael Chen',
      accountType: 'VIP',
      balance: 156750.00,
      equity: 154120.00,
      pnl: -2630.00,
      status: 'Active'
    },
    {
      id: '#LIVE004',
      owner: 'Emma Davis',
      accountType: 'Standard',
      balance: 3200.00,
      equity: 3200.00,
      pnl: 0.00,
      status: 'Inactive'
    },
    {
      id: '#LIVE005',
      owner: 'David Wilson',
      accountType: 'Premium',
      balance: 45600.00,
      equity: 46800.00,
      pnl: 1200.00,
      status: 'Suspended'
    },
    {
      id: '#LIVE006',
      owner: 'Lisa Wang',
      accountType: 'Standard',
      balance: 12500.00,
      equity: 11800.00,
      pnl: -700.00,
      status: 'Active'
    },
    {
      id: '#LIVE007',
      owner: 'Robert Smith',
      accountType: 'VIP',
      balance: 89000.00,
      equity: 89500.00,
      pnl: 500.00,
      status: 'Pending'
    },
    {
      id: '#LIVE008',
      owner: 'Anna Brown',
      accountType: 'Standard',
      balance: 6800.00,
      equity: 6800.00,
      pnl: 0.00,
      status: 'Inactive'
    }
  ]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedAccountType, setSelectedAccountType] = useState('All Types');
  const [selectedBalanceRange, setSelectedBalanceRange] = useState('All Ranges');

  useEffect(() => {
    document.title = 'Live Accounts - RAZ CAPITALS';
  }, []);

  // Filter accounts based on search criteria
  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        account.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'All Status' || account.status === selectedStatus;

      // Account Type filter
      const matchesAccountType = selectedAccountType === 'All Types' || account.accountType === selectedAccountType;

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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400';
      case 'Inactive':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Suspended':
        return 'bg-red-500/20 text-red-400';
      case 'Pending':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Calculate statistics based on filtered accounts
  const totalBalance = filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  const averageBalance = filteredAccounts.length > 0 ? totalBalance / filteredAccounts.length : 0;
  const activeAccounts = filteredAccounts.filter(account => account.status === 'Active').length;

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="live-accounts" />

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

        {/* Live Accounts Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Live Trading Accounts</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Create New Account
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Live Accounts</h3>
              <p className="text-white text-2xl font-bold">{filteredAccounts.length}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Active Accounts</h3>
              <p className="text-green-400 text-2xl font-bold">{activeAccounts}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Balance</h3>
              <p className="text-white text-2xl font-bold">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Average Balance</h3>
              <p className="text-white text-2xl font-bold">{formatCurrency(averageBalance)}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Search Account</label>
                <input 
                  type="text" 
                  placeholder="Account ID or Owner name..."
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
                  <option>Inactive</option>
                  <option>Suspended</option>
                  <option>Pending</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Account Type</label>
                <select 
                  value={selectedAccountType}
                  onChange={(e) => setSelectedAccountType(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                >
                  <option>All Types</option>
                  <option>Standard</option>
                  <option>Premium</option>
                  <option>VIP</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Balance Range</label>
                <select 
                  value={selectedBalanceRange}
                  onChange={(e) => setSelectedBalanceRange(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
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
            <div className="flex justify-between items-center">
              <div className="text-white text-sm">
                Showing {filteredAccounts.length} of {accounts.length} accounts
              </div>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Live Accounts Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Live Trading Accounts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account ID</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Owner</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Account Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Balance</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Equity</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">P&L</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <tr key={account.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-4">{account.id}</td>
                        <td className="text-white py-4">{account.owner}</td>
                        <td className="text-white py-4">{account.accountType}</td>
                        <td className="text-white py-4">{formatCurrency(account.balance)}</td>
                        <td className="text-white py-4">{formatCurrency(account.equity)}</td>
                        <td className={`py-4 ${account.pnl > 0 ? 'text-green-400' : account.pnl < 0 ? 'text-red-400' : 'text-white'}`}>
                          {account.pnl > 0 ? '+' : ''}{formatCurrency(account.pnl)}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(account.status)}`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                              onClick={() => router.push('/admin/users/1/profile')}
                            >
                              View
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center text-white py-8">
                        No accounts found matching the current filters.
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

export default function LiveAccountsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <LiveAccountsContent />
    </ProtectedRoute>
  );
}
