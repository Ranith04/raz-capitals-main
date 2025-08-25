'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ClientUser, UserService } from '@/lib/userService';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function ClientListContent() {
  const router = useRouter();
  
  // State for real client data
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [metrics, setMetrics] = useState({
    totalClients: 0,
    activeClients: 0,
    kycVerified: 0,
    kycPending: 0,
    liveAccounts: 0,
    demoAccounts: 0
  });
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedKycStatus, setSelectedKycStatus] = useState('All KYC');
  const [selectedAccountType, setSelectedAccountType] = useState('All Types');

  useEffect(() => {
    document.title = 'Client List - RAZ CAPITALS';
    fetchClients();
  }, []);

  // Fetch clients from database
  const fetchClients = async () => {
    try {
      setLoading(true);
      const [usersData, metricsData] = await Promise.all([
        UserService.getAllUsers(),
        UserService.getClientMetrics()
      ]);
      
      setClients(usersData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter clients based on search criteria
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const fullName = `${client.first_name || ''} ${client.last_name || ''}`.toLowerCase();
      
      // Search filter
      const matchesSearch = searchTerm === '' || 
        fullName.includes(searchTerm.toLowerCase()) ||
        client.id.toString().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatus === 'All Status' || client.account_status === selectedStatus;

      // KYC Status filter
      const matchesKycStatus = selectedKycStatus === 'All KYC' || client.kyc_status === selectedKycStatus;

      // Account Type filter
      const matchesAccountType = selectedAccountType === 'All Types' || client.account_type === selectedAccountType;

      return matchesSearch && matchesStatus && matchesKycStatus && matchesAccountType;
    });
  }, [clients, searchTerm, selectedStatus, selectedKycStatus, selectedAccountType]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All Status');
    setSelectedKycStatus('All KYC');
    setSelectedAccountType('All Types');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status: string, type: 'kyc' | 'account') => {
    if (type === 'kyc') {
      switch (status) {
        case 'Approved':
          return 'bg-[#9BC5A2]/20 text-[#9BC5A2]';
        case 'Pending':
          return 'bg-yellow-500/20 text-yellow-400';
        case 'Rejected':
          return 'bg-red-500/20 text-red-400';
        default:
          return 'bg-gray-500/20 text-gray-400';
      }
    } else {
      switch (status) {
        case 'Active':
          return 'bg-green-500/20 text-green-400';
        case 'Inactive':
          return 'bg-gray-500/20 text-gray-400';
        case 'Suspended':
          return 'bg-red-500/20 text-red-400';
        default:
          return 'bg-gray-500/20 text-gray-400';
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="client-list" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading clients...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="client-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-start">
          {/* Left Side - Document Icon and Refresh Button */}
          <div className="flex flex-col space-y-2">
            {/* Document Icon Button */}
                      <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
            
            {/* Refresh Button */}
            <button className="bg-[#2D4A32] text-white px-4 py-2 rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Right Side - Admin Section */}
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

        {/* Client List Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-[#0A2E1D] text-3xl font-bold mb-8">Client List</h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Clients</h3>
              <p className="text-white text-2xl font-bold">{metrics.totalClients}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Active Clients</h3>
              <p className="text-white text-2xl font-bold">{metrics.activeClients}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">KYC Verified</h3>
              <p className="text-white text-2xl font-bold">{metrics.kycVerified}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">KYC Pending</h3>
              <p className="text-white text-2xl font-bold">{metrics.kycPending}</p>
            </div>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Live Accounts</h3>
              <p className="text-white text-2xl font-bold">{metrics.liveAccounts}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Demo Accounts</h3>
              <p className="text-white text-2xl font-bold">{metrics.demoAccounts}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Search Client</label>
                <input 
                  type="text" 
                  placeholder="Enter client name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">KYC Status</label>
                <select 
                  value={selectedKycStatus}
                  onChange={(e) => setSelectedKycStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option>All KYC</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Account Type</label>
                <select 
                  value={selectedAccountType}
                  onChange={(e) => setSelectedAccountType(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option>All Types</option>
                  <option>Live</option>
                  <option>Demo</option>
                </select>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex justify-between items-center">
              <div className="text-white text-sm">
                Showing {filteredClients.length} of {clients.length} clients
              </div>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">All Clients</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Client ID</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Name</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Email</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Registration Date</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">KYC Status</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Account Status</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Account Type</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-4">{client.id}</td>
                        <td className="text-white py-4">{`${client.first_name || ''} ${client.last_name || ''}`.trim() || 'N/A'}</td>
                        <td className="text-white py-4">{client.email}</td>
                        <td className="text-white py-4">{formatDate(client.created_at)}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(client.kyc_status || 'Pending', 'kyc')}`}>
                            {client.kyc_status || 'Pending'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeStyle(client.account_status || 'Active', 'account')}`}>
                            {client.account_status || 'Active'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-white text-sm">
                            {client.account_type || 'Demo'}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="text-[#9BC5A9] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F]"
                              onClick={() => router.push(`/admin/users/${client.id}/profile`)}
                            >
                              View
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center text-white py-8">
                        No clients found matching the current filters.
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

export default function ClientListPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ClientListContent />
    </ProtectedRoute>
  );
}
