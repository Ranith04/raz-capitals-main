'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function DemoAccountsContent() {
  const router = useRouter();
  
  // Sample demo accounts data
  const [accounts] = useState([
    {
      id: '#DEMO001',
      owner: 'John Trader',
      virtualBalance: 100000.00,
      currentEquity: 112340.00,
      virtualPnL: 12340.00,
      expires: '2025-02-15',
      status: 'Active',
      demoDuration: '90 Days',
      creationDate: '2024-11-15'
    },
    {
      id: '#DEMO002',
      owner: 'Lisa Wang',
      virtualBalance: 50000.00,
      currentEquity: 47650.00,
      virtualPnL: -2350.00,
      expires: '2025-01-28',
      status: 'Active',
      demoDuration: '60 Days',
      creationDate: '2024-11-28'
    },
    {
      id: '#DEMO003',
      owner: 'Robert Smith',
      virtualBalance: 100000.00,
      currentEquity: 100000.00,
      virtualPnL: 0.00,
      expires: '2025-01-10',
      status: 'Expired',
      demoDuration: '30 Days',
      creationDate: '2024-12-10'
    },
    {
      id: '#DEMO004',
      owner: 'Anna Wilson',
      virtualBalance: 200000.00,
      currentEquity: 187920.00,
      virtualPnL: -12080.00,
      expires: '2025-03-20',
      status: 'Active',
      demoDuration: 'Unlimited',
      creationDate: '2024-09-20'
    },
    {
      id: '#DEMO005',
      owner: 'David Wilson',
      virtualBalance: 75000.00,
      currentEquity: 78900.00,
      virtualPnL: 3900.00,
      expires: '2025-02-01',
      status: 'Suspended',
      demoDuration: '90 Days',
      creationDate: '2024-11-01'
    },
    {
      id: '#DEMO006',
      owner: 'Emma Davis',
      virtualBalance: 150000.00,
      currentEquity: 145600.00,
      virtualPnL: -4400.00,
      expires: '2025-01-15',
      status: 'Active',
      demoDuration: '60 Days',
      creationDate: '2024-11-15'
    },
    {
      id: '#DEMO007',
      owner: 'Michael Chen',
      virtualBalance: 300000.00,
      currentEquity: 312000.00,
      virtualPnL: 12000.00,
      expires: '2025-04-01',
      status: 'Active',
      demoDuration: 'Unlimited',
      creationDate: '2024-10-01'
    },
    {
      id: '#DEMO008',
      owner: 'Sarah Johnson',
      virtualBalance: 25000.00,
      currentEquity: 25200.00,
      virtualPnL: 200.00,
      expires: '2025-01-05',
      status: 'Expired',
      demoDuration: '30 Days',
      creationDate: '2024-12-05'
    }
  ]);

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
        account.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'All Status' || account.status === selectedStatus;

      // Demo Duration filter
      const matchesDemoDuration = selectedDemoDuration === 'All Durations' || account.demoDuration === selectedDemoDuration;

      // Creation Date filter
      const matchesCreationDate = selectedCreationDate === '' || account.creationDate === selectedCreationDate;

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400';
      case 'Expired':
        return 'bg-red-500/20 text-red-400';
      case 'Suspended':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Calculate statistics based on filtered accounts
  const totalVirtualBalance = filteredAccounts.reduce((sum, account) => sum + account.virtualBalance, 0);
  const averageVirtualBalance = filteredAccounts.length > 0 ? totalVirtualBalance / filteredAccounts.length : 0;
  const activeDemos = filteredAccounts.filter(account => account.status === 'Active').length;

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Create Demo Account
            </button>
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
                    filteredAccounts.map((account) => (
                      <tr key={account.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-4">{account.id}</td>
                        <td className="text-white py-4">{account.owner}</td>
                        <td className="text-white py-4">{formatCurrency(account.virtualBalance)}</td>
                        <td className="text-white py-4">{formatCurrency(account.currentEquity)}</td>
                        <td className={`py-4 ${account.virtualPnL > 0 ? 'text-green-400' : account.virtualPnL < 0 ? 'text-red-400' : 'text-white'}`}>
                          {account.virtualPnL > 0 ? '+' : ''}{formatCurrency(account.virtualPnL)}
                        </td>
                        <td className="text-white py-4">{formatDate(account.expires)}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(account.status)}`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                              onClick={() => router.push('/admin/trade-accounts/trade-acc-details')}
                            >
                              View
                            </button>
                            {account.status === 'Active' && (
                              <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                                Extend
                              </button>
                            )}
                            {account.status === 'Active' && (
                              <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                                Reset
                              </button>
                            )}
                            {account.status === 'Expired' && (
                              <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                                Renew
                              </button>
                            )}
                            {account.status === 'Suspended' && (
                              <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                                Activate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center text-white py-8">
                        No demo accounts found matching the current filters.
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
