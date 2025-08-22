'use client';

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

  useEffect(() => {
    document.title = 'New Client List - RAZ CAPITALS';
    fetchClients();
  }, []);

  // Fetch clients from database
  const fetchClients = async () => {
    try {
      setLoading(true);
      const usersData = await UserService.getUsersWithKYC();
      setClients(usersData);
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

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="new-client-list" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading clients...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="new-client-list" />

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

        {/* New Client List Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-[#0A2E1D] text-3xl font-bold mb-8">New Client List</h1>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-4">
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
                <label className="text-white text-sm font-medium mb-2 block">Registration Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">KYC Status</label>
                <select 
                  value={selectedKycStatus}
                  onChange={(e) => setSelectedKycStatus(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
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

          {/* New Clients Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent New Clients</h2>
            
            <div className="overflow-x-auto">
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
                              <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30">
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-white py-8">
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

export default function NewClientListPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <NewClientListContent />
    </ProtectedRoute>
  );
}
