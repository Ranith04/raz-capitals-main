'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ClientUser, UserService } from '@/lib/userService';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function NewClientListContent() {
  const router = useRouter();
  
  // State for real client data
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedKycStatus, setSelectedKycStatus] = useState('All Status');

  // Approval states
  const [approvingClient, setApprovingClient] = useState<string | null>(null);
  const [rejectingClient, setRejectingClient] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedClientForRejection, setSelectedClientForRejection] = useState<ClientUser | null>(null);

  // Notification states
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = 'New Client List - RAZ CAPITALS';
    fetchClients(false);
  }, []);

  // Fetch clients from database
  const fetchClients = async (showRefreshingState = true) => {
    try {
      if (showRefreshingState) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const usersData = await UserService.getUsersWithKYC();
      setClients(usersData);
      if (showRefreshingState) {
        showNotification('success', 'Client list refreshed successfully');
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      if (showRefreshingState) {
        showNotification('error', 'Failed to fetch clients. Please try again.');
      }
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

      // Date filter
      const matchesDate = selectedDate === '' || client.created_at?.includes(selectedDate);

      // KYC Status filter
      const matchesKycStatus = selectedKycStatus === 'All Status' || client.kyc_status === selectedKycStatus;

      return matchesSearch && matchesDate && matchesKycStatus;
    });
  }, [clients, searchTerm, selectedDate, selectedKycStatus]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate('');
    setSelectedKycStatus('All Status');
  };

  // Handle KYC approval
  const handleApproveKYC = async (client: ClientUser) => {
    if (!client.user_uuid) {
      showNotification('error', 'Error: Client UUID not found');
      return;
    }

    if (confirm(`Are you sure you want to approve KYC for ${client.first_name} ${client.last_name}?`)) {
      try {
        setApprovingClient(client.user_uuid);
        const success = await UserService.approveUserKYC(client.user_uuid, 'Admin');
        
        if (success) {
          // Update the local state to reflect the change
          setClients(prevClients => 
            prevClients.map(c => 
              c.user_uuid === client.user_uuid 
                ? { ...c, kyc_status: 'Approved' }
                : c
            )
          );
          showNotification('success', `KYC approved successfully for ${client.first_name} ${client.last_name}`);
        } else {
          showNotification('error', 'Failed to approve KYC. Please try again.');
        }
      } catch (error) {
        console.error('Error approving KYC:', error);
        showNotification('error', 'An error occurred while approving KYC. Please try again.');
      } finally {
        setApprovingClient(null);
      }
    }
  };

  // Handle KYC rejection
  const handleRejectKYC = async (client: ClientUser) => {
    if (!client.user_uuid) {
      alert('Error: Client UUID not found');
      return;
    }

    setSelectedClientForRejection(client);
    setShowRejectionModal(true);
  };

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
  };

  // Submit KYC rejection
  const submitRejection = async () => {
    if (!selectedClientForRejection || !rejectionReason.trim()) {
      showNotification('error', 'Please provide a rejection reason');
      return;
    }

    try {
      setRejectingClient(selectedClientForRejection.user_uuid);
      const success = await UserService.rejectUserKYC(
        selectedClientForRejection.user_uuid, 
        rejectionReason.trim(), 
        'Admin'
      );
      
      if (success) {
        // Update the local state to reflect the change
        setClients(prevClients => 
          prevClients.map(c => 
            c.user_uuid === selectedClientForRejection.user_uuid 
              ? { ...c, kyc_status: 'Rejected' }
              : c
          )
        );
        showNotification('success', `KYC rejected for ${selectedClientForRejection.first_name} ${selectedClientForRejection.last_name}`);
        setShowRejectionModal(false);
        setRejectionReason('');
        setSelectedClientForRejection(null);
      } else {
        showNotification('error', 'Failed to reject KYC. Please try again.');
      }
    } catch (error) {
      console.error('Error rejecting KYC:', error);
      showNotification('error', 'An error occurred while rejecting KYC. Please try again.');
    } finally {
      setRejectingClient(null);
    }
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
          currentPage="new-client-list" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading clients...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        currentPage="new-client-list" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="New Client List"
          onRefresh={fetchClients}
          refreshing={refreshing}
          showBackButton={true}
          backUrl="/admin/dashboard"
          showRefreshButton={true}
          refreshButtonText="Refresh"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* New Client List Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Notification */}
          {notification && (
            <div className={`mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 sm:p-4 rounded-lg ${
              notification.type === 'success' 
                ? 'bg-green-900/20 text-green-400 border border-green-500/30' 
                : 'bg-red-900/20 text-red-400 border border-red-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs xs:text-sm sm:text-sm lg:text-base">{notification.message}</span>
                <button 
                  onClick={() => setNotification(null)}
                  className="text-current hover:opacity-70 transition-opacity"
                >
                  <svg className="w-4 xs:w-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <h1 className="text-[#0A2E1D] text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">New Client List</h1>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-4 mb-4">
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
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Registration Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">KYC Status</label>
                <select 
                  value={selectedKycStatus}
                  onChange={(e) => setSelectedKycStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
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

          {/* New Clients Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6">
            <h2 className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl font-bold mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-6">Recent New Clients</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3 xs:space-y-3 sm:space-y-4">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div key={client.id} className="bg-[#4A6741] rounded-lg p-3 xs:p-4 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="text-white font-medium text-sm xs:text-sm sm:text-sm">ID: {client.id}</div>
                      <span className={`px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 rounded-full text-xs ${
                        client.kyc_status === 'Pending' 
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : client.kyc_status === 'Approved'
                          ? 'bg-[#9BC5A9]/20 text-[#9BC5A9]'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {client.kyc_status || 'Pending'}
                      </span>
                    </div>
                    <div className="text-white text-xs xs:text-sm sm:text-sm">
                      <div className="font-medium">{`${client.first_name || ''} ${client.last_name || ''}`.trim() || 'N/A'}</div>
                      <div className="text-[#9BC5A9]">{client.email}</div>
                      <div className="text-[#9BC5A9]">Registered: {formatDate(client.created_at)}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2 pt-1.5 xs:pt-2 sm:pt-2">
                      <button 
                        className="text-[#9BC5A9] hover:text-white transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-[#2D4A32] rounded hover:bg-[#3A5A3F] text-xs xs:text-sm sm:text-sm"
                        onClick={() => router.push(`/admin/users/${client.id}/profile`)}
                      >
                        View
                      </button>
                      {client.kyc_status === 'Pending' && (
                        <>
                          <button 
                            className="text-green-400 hover:text-green-300 transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-green-900/20 rounded hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm sm:text-sm"
                            onClick={() => handleApproveKYC(client)}
                            disabled={approvingClient === client.user_uuid}
                          >
                            {approvingClient === client.user_uuid ? 'Approving...' : 'Approve'}
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-300 transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-red-900/20 rounded hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm sm:text-sm"
                            onClick={() => handleRejectKYC(client)}
                            disabled={rejectingClient === client.user_uuid}
                          >
                            {rejectingClient === client.user_uuid ? 'Rejecting...' : 'Reject'}
                          </button>
                        </>
                      )}
                      {client.kyc_status === 'Rejected' && (
                        <button 
                          className="text-green-400 hover:text-green-300 transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-green-900/20 rounded hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed text-xs xs:text-sm sm:text-sm"
                          onClick={() => handleApproveKYC(client)}
                          disabled={approvingClient === client.user_uuid}
                        >
                          {approvingClient === client.user_uuid ? 'Approving...' : 'Approve'}
                        </button>
                      )}
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
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            client.kyc_status === 'Pending' 
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : client.kyc_status === 'Approved'
                              ? 'bg-[#9BC5A9]/20 text-[#9BC5A9]'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {client.kyc_status || 'Pending'}
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
                            {client.kyc_status === 'Pending' && (
                              <>
                                <button 
                                  className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => handleApproveKYC(client)}
                                  disabled={approvingClient === client.user_uuid}
                                >
                                  {approvingClient === client.user_uuid ? 'Approving...' : 'Approve'}
                                </button>
                                <button 
                                  className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 bg-red-900/20 rounded hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                  onClick={() => handleRejectKYC(client)}
                                  disabled={rejectingClient === client.user_uuid}
                                >
                                  {rejectingClient === client.user_uuid ? 'Rejecting...' : 'Reject'}
                                </button>
                              </>
                            )}
                            {client.kyc_status === 'Rejected' && (
                              <button 
                                className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleApproveKYC(client)}
                                disabled={approvingClient === client.user_uuid}
                              >
                                {approvingClient === client.user_uuid ? 'Approving...' : 'Approve'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <div className="text-[#9BC5A9] text-lg mb-2">No clients found</div>
                        <div className="text-[#9BC5A9]/70 text-sm">Try adjusting your search criteria</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2D4A32] rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">Reject KYC</h3>
            <p className="text-[#9BC5A9] mb-4">
              Please provide a reason for rejecting KYC for {selectedClientForRejection?.first_name} {selectedClientForRejection?.last_name}
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none placeholder-gray-400 mb-4 resize-none"
              rows={3}
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                  setSelectedClientForRejection(null);
                }}
                className="flex-1 px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                disabled={!rejectionReason.trim() || rejectingClient === selectedClientForRejection?.user_uuid}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rejectingClient === selectedClientForRejection?.user_uuid ? 'Rejecting...' : 'Reject KYC'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NewClientListPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <NewClientListContent />
    </ProtectedRoute>
  );
}
