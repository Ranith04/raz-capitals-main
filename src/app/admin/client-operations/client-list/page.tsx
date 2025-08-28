'use client';

import AdminHeader from '@/components/AdminHeader';
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
  const [refreshing, setRefreshing] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedKycStatus, setSelectedKycStatus] = useState('All KYC');
  const [selectedAccountType, setSelectedAccountType] = useState('All Types');

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'Client List - RAZ CAPITALS';
    fetchClients();
  }, []);

  // Fetch clients from database
  const fetchClients = async (showRefreshingState = false) => {
    try {
      if (showRefreshingState) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const [usersData, metricsData] = await Promise.all([
        UserService.getAllUsers(),
        UserService.getClientMetrics()
      ]);
      
      setClients(usersData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      if (showRefreshingState) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="client-list" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Client List"
            onRefresh={() => fetchClients(true)}
            refreshing={refreshing}
            showBackButton={true}
            backUrl="/admin/dashboard"
            showRefreshButton={true}
            refreshButtonText="Refresh"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[#0A2E1D] text-xl">Loading clients...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        currentPage="client-list" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Client List"
          onRefresh={() => fetchClients(true)}
          refreshing={refreshing}
          showBackButton={true}
          backUrl="/admin/dashboard"
          showRefreshButton={true}
          refreshButtonText="Refresh"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Client List Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <h1 className="text-[#0A2E1D] text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">Client List</h1>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Total Clients</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.totalClients}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Active Clients</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.activeClients}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">KYC Verified</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.kycVerified}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">KYC Pending</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.kycPending}</p>
            </div>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Live Accounts</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.liveAccounts}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Demo Accounts</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{metrics.demoAccounts}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-4 mb-4">
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Search Client</label>
                <input 
                  type="text" 
                  placeholder="Enter client name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none placeholder-gray-400 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Status</label>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">KYC Status</label>
                <select 
                  value={selectedKycStatus}
                  onChange={(e) => setSelectedKycStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All KYC</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Account Type</label>
                <select 
                  value={selectedAccountType}
                  onChange={(e) => setSelectedAccountType(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Types</option>
                  <option>Live</option>
                  <option>Demo</option>
                </select>
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex flex-col xs:flex-col sm:flex-row justify-between items-start xs:items-start sm:items-center space-y-2 xs:space-y-2 sm:space-y-0">
              <div className="text-white text-xs xs:text-sm sm:text-sm">
                Showing {filteredClients.length} of {clients.length} clients
              </div>
              <button 
                onClick={clearFilters}
                className="px-3 xs:px-4 sm:px-4 py-1.5 xs:py-2 sm:py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-xs xs:text-sm sm:text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6">
            <h2 className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl font-bold mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-6">All Clients</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3 xs:space-y-3 sm:space-y-4">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div key={client.id} className="bg-[#4A6741] rounded-lg p-3 xs:p-4 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="text-white font-medium text-sm xs:text-sm sm:text-sm">ID: {client.id}</div>
                      <div className="flex flex-col space-y-1">
                        <span className={`px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 rounded-full text-xs ${getStatusBadgeStyle(client.kyc_status || 'Pending', 'kyc')}`}>
                          {client.kyc_status || 'Pending'}
                        </span>
                        <span className={`px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 rounded-full text-xs ${getStatusBadgeStyle(client.account_status || 'Active', 'account')}`}>
                          {client.account_status || 'Active'}
                        </span>
                      </div>
                    </div>
                    <div className="text-white text-xs xs:text-sm sm:text-sm">
                      <div className="font-medium">{`${client.first_name || ''} ${client.last_name || ''}`.trim() || 'N/A'}</div>
                      <div className="text-[#9BC5A9]">{client.email}</div>
                      <div className="text-[#9BC5A9]">Registered: {formatDate(client.created_at)}</div>
                      <div className="text-[#9BC5A9]">Type: {client.account_type || 'Demo'}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2 pt-1.5 xs:pt-2 sm:pt-2">
                      <button 
                        className="text-[#9BC5A9] hover:text-white transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-[#2D4A32] rounded hover:bg-[#3A5A3F] text-xs xs:text-sm sm:text-sm"
                        onClick={() => router.push(`/admin/users/${client.id}/profile`)}
                      >
                        View
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-xs xs:text-sm sm:text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 xs:py-8 sm:py-8">
                  <div className="text-[#9BC5A9] text-base xs:text-lg sm:text-lg mb-1.5 xs:mb-2 sm:mb-2">No clients found</div>
                  <div className="text-[#9BC5A9]/70 text-xs xs:text-sm sm:text-sm">Try adjusting your search criteria</div>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
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
