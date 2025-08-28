'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Issue type definition matching the database schema
interface Issue {
  id: number;
  created_at: string;
  account_id: string;
  subject?: string;
  type?: 'technical_issue' | 'account_problem' | 'trading_issue' | 'payment_problem';
  priority?: 'critical' | 'high' | 'medium' | 'low';
  status?: 'Open' | 'In_Progress' | 'Awaiting_Response' | 'Resolved' | 'Closed';
  // Additional fields that might be in the database
  user_name?: string;
  user_email?: string;
}

function SupportTicketsContent() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  
  // Helper function to format status for display
  const formatStatusForDisplay = (status: string | undefined) => {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [dateFilter, setDateFilter] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Issue | null>(null);
  const [updateStatus, setUpdateStatus] = useState<Issue['status'] | ''>('');
  const [updatePriority, setUpdatePriority] = useState<Issue['priority'] | ''>('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Support Tickets - RAZ CAPITALS';
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    console.log('=== FETCHING ISSUES STARTED ===');
    try {
      setLoading(true);
      setError(null);
      
      console.log('Making API call to fetch issues...');
      // Fetch all issues from the issues table
      const { data, error: fetchError } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('=== API RESPONSE RECEIVED ===');
      console.log('Raw data received:', data);
      console.log('Data type:', typeof data);
      console.log('Data length:', data?.length);
      console.log('Fetch error:', fetchError);
      
      if (fetchError) {
        console.error('=== FETCH ERROR DETAILS ===');
        console.error('Error code:', fetchError.code);
        console.error('Error message:', fetchError.message);
        console.error('Error details:', fetchError.details);
        console.error('Full error object:', fetchError);
        setError('Failed to fetch issues. Please try again.');
        return;
      }

      if (data) {
        console.log('=== TRANSFORMING DATA ===');
        console.log('Raw data before transformation:', data);
        
        // Transform the data to match our interface and add user information
        const transformedIssues = data.map((issue: any) => {
          console.log('Processing issue:', issue);
          const transformed = {
            id: issue.id,
            created_at: issue.created_at,
            account_id: issue.account_id,
            subject: issue.subject,
            type: issue.type,
            priority: issue.priority,
            status: issue.status,
            // Extract user information from account_id or related tables
            user_name: issue.account_id || 'Unknown User',
            user_email: issue.account_id ? `${issue.account_id}@example.com` : 'No email'
          };
          console.log('Transformed issue:', transformed);
          return transformed;
        });
        
        console.log('=== TRANSFORMATION COMPLETED ===');
        console.log('Transformed issues:', transformedIssues);
        console.log('Transformed issues length:', transformedIssues.length);
        
        setIssues(transformedIssues);
      } else {
        console.log('No data received from API');
        setIssues([]);
      }
    } catch (error) {
      console.error('=== FETCH ERROR ===');
      console.error('Error fetching issues:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      console.log('=== FETCHING ISSUES COMPLETED ===');
    }
  };

  const handleRefresh = () => {
    fetchIssues();
  };

  const handleCreateTicket = () => {
    // Implement create ticket functionality
    alert('Create ticket functionality to be implemented');
  };

  const handleUpdateTicket = async () => {
    if (!selectedTicket || !selectedTicket.id) {
      console.error('No ticket selected or invalid ticket ID');
      alert('Invalid ticket ID. Please refresh and try again.');
      return;
    }

    console.log('Ticket ID validation passed:', selectedTicket.id);

    // Validate that we have values to update
    if (!updateStatus && !updatePriority) {
      console.error('No fields selected for update');
      alert('Please select at least one field to update.');
      return;
    }

    console.log('Fields to update - Status:', updateStatus, 'Priority:', updatePriority);
    console.log('Status validation values:', ['Open', 'In_Progress', 'Awaiting_Response', 'Resolved', 'Closed']);

    // Validate status value if provided
    if (updateStatus && !['Open', 'In_Progress', 'Awaiting_Response', 'Resolved', 'Closed'].includes(updateStatus)) {
      console.error('Invalid status value:', updateStatus);
      alert('Invalid status value. Please select a valid status.');
      return;
    }

    // Validate priority value if provided
    if (updatePriority && !['critical', 'high', 'medium', 'low'].includes(updatePriority)) {
      console.error('Invalid priority value:', updatePriority);
      alert('Invalid priority value. Please select a valid priority.');
      return;
    }

    console.log('Field validation passed');

    // Check if any fields have actually changed
    const hasStatusChanged = updateStatus && updateStatus !== selectedTicket.status;
    const hasPriorityChanged = updatePriority && updatePriority !== selectedTicket.priority;
    
    console.log('Change detection:');
    console.log('- Status changed:', hasStatusChanged, `(${selectedTicket.status} → ${updateStatus})`);
    console.log('- Priority changed:', hasPriorityChanged, `(${selectedTicket.priority} → ${updatePriority})`);
    
    if (!hasStatusChanged && !hasPriorityChanged) {
      console.error('No changes detected');
      alert('No changes detected. Please modify at least one field before updating.');
      return;
    }

    console.log('Change validation passed');

    try {
      setIsUpdating(true);
      console.log('=== API REQUEST STARTED ===');
      
      // Only include fields that have values
      const updateData: any = {};
      if (updateStatus) updateData.status = updateStatus;
      if (updatePriority) updateData.priority = updatePriority;
      
      console.log('=== REQUEST DETAILS ===');
      console.log('API Endpoint: supabase.from("issues").update()');
      console.log('Table: issues');
      console.log('Update data:', updateData);
      console.log('Where clause: id =', selectedTicket.id);
      console.log('Data type:', typeof updateData);
      console.log('Data keys:', Object.keys(updateData));
      console.log('Data values:', Object.values(updateData));
      
      console.log('=== CURRENT TICKET STATE ===');
      console.log('Ticket ID:', selectedTicket.id);
      console.log('Current status:', selectedTicket.status);
      console.log('Current priority:', selectedTicket.priority);
      console.log('New status:', updateStatus);
      console.log('New priority:', updatePriority);
      
      console.log('=== MAKING API CALL ===');
      const startTime = Date.now();
      
      const { data: updateResponse, error: updateError } = await supabase
        .from('issues')
        .update(updateData)
        .eq('id', selectedTicket.id);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log('=== API RESPONSE RECEIVED ===');
      console.log('Response time:', responseTime + 'ms');
      console.log('Response data:', updateResponse);
      console.log('Response error:', updateError);
      console.log('Response type:', typeof updateResponse);
      console.log('Error type:', typeof updateError);
      
      if (updateError) {
        console.error('=== API ERROR DETAILS ===');
        console.error('Error code:', updateError.code);
        console.error('Error message:', updateError.message);
        console.error('Error details:', updateError.details);
        console.error('Error hint:', updateError.hint);
        console.error('Full error object:', updateError);
      }

      if (updateError) {
        console.error('=== UPDATE FAILED ===');
        alert('Failed to update ticket. Please try again.');
        return;
      }

      console.log('=== UPDATE SUCCESSFUL ===');
      console.log('Update response:', updateResponse);
      
      // Update local state
      setIssues(prevIssues => 
        prevIssues.map(issue => 
          issue.id === selectedTicket.id 
            ? { 
                ...issue, 
                status: updateStatus || issue.status,
                priority: updatePriority || issue.priority
              }
            : issue
        )
      );
      
      // Close modal and reset form
      setIsModalOpen(false);
      setSelectedTicket(null);
      setUpdateStatus('');
      setUpdatePriority('');
      
      alert('Ticket updated successfully!');
      
    } catch (error) {
      console.error('=== UPDATE ERROR ===');
      console.error('Error updating ticket:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsUpdating(false);
      console.log('=== UPDATE COMPLETED ===');
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Calculate statistics
  const totalTickets = issues.length;
  const openTickets = issues.filter(issue => issue.status === 'Open').length;
  const inProgressTickets = issues.filter(issue => issue.status === 'In_Progress').length;
  const resolvedTickets = issues.filter(issue => issue.status === 'Resolved').length;
  const avgResponseTime = '2.5h'; // Placeholder

  // Filter issues based on search and filters
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === '' || 
      issue.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.account_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || issue.priority === priorityFilter;
    const matchesType = typeFilter === 'All Types' || issue.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="support-tickets" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Support Tickets"
            onRefresh={handleRefresh}
            refreshing={loading}
            showBackButton={true}
            backUrl="/admin/dashboard"
            showRefreshButton={true}
            refreshButtonText="Refresh"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-[#0A2E1D] text-xl">Loading support tickets...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="support-tickets" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Support Tickets"
            onRefresh={handleRefresh}
            refreshing={false}
            showBackButton={true}
            backUrl="/admin/dashboard"
            showRefreshButton={true}
            refreshButtonText="Refresh"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-red-600 text-xl">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        currentPage="support-tickets" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Support Tickets"
          onRefresh={handleRefresh}
          refreshing={loading}
          showBackButton={true}
          backUrl="/admin/dashboard"
          showRefreshButton={true}
          refreshButtonText="Refresh"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Support Tickets Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 space-y-4 lg:space-y-0">
            <h1 className="text-[#0A2E1D] text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold">Support Tickets</h1>
            <button 
              onClick={handleCreateTicket}
              className="px-3 xs:px-4 sm:px-4 md:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
            >
              Create New Ticket
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Total Tickets</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{totalTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Open Tickets</h3>
              <p className="text-red-400 text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{openTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">In Progress</h3>
              <p className="text-yellow-400 text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{inProgressTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Resolved</h3>
              <p className="text-green-400 text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{resolvedTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-2 xs:p-3 sm:p-3 md:p-4 lg:p-6 text-center col-span-2 xs:col-span-2 sm:col-span-1">
              <h3 className="text-[#9BC5A2] text-xs xs:text-xs sm:text-xs md:text-sm lg:text-sm font-medium mb-1 xs:mb-1.5 sm:mb-2">Avg Response</h3>
              <p className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl font-bold">{avgResponseTime}</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6 mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8">
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-4 mb-4">
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Search</label>
                <input 
                  type="text" 
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none placeholder-gray-400 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                />
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In_Progress</option>
                  <option>Awaiting_Response</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Priority</label>
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Priorities</option>
                  <option>critical</option>
                  <option>high</option>
                  <option>medium</option>
                  <option>low</option>
                </select>
              </div>
              <div>
                <label className="text-white text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm font-medium mb-1.5 xs:mb-2 block">Type</label>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-2 xs:px-3 sm:px-3 md:px-3 lg:px-4 py-1.5 xs:py-2 sm:py-2 md:py-2 lg:py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base"
                >
                  <option>All Types</option>
                  <option>technical_issue</option>
                  <option>account_problem</option>
                  <option>trading_issue</option>
                  <option>payment_problem</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="bg-[#2D4A32] rounded-2xl p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6">
            <h2 className="text-white text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl font-bold mb-3 xs:mb-4 sm:mb-4 md:mb-5 lg:mb-6">Recent Tickets</h2>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3 xs:space-y-3 sm:space-y-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <div key={issue.id} className="bg-[#4A6741] rounded-lg p-3 xs:p-4 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="text-white font-medium text-sm xs:text-sm sm:text-sm">#{issue.id}</div>
                      <span className={`px-1.5 xs:px-2 sm:px-2 py-0.5 xs:py-1 sm:py-1 rounded-full text-xs ${
                        issue.status === 'Open' 
                          ? 'bg-red-500/20 text-red-400'
                          : issue.status === 'In_Progress'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : issue.status === 'Resolved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {formatStatusForDisplay(issue.status)}
                      </span>
                    </div>
                    <div className="text-white text-xs xs:text-sm sm:text-sm">
                      <div className="font-medium">{issue.subject || 'No Subject'}</div>
                      <div className="text-[#9BC5A9]">User: {issue.user_name}</div>
                      <div className="text-[#9BC5A9]">Type: {issue.type?.replace(/_/g, ' ') || 'Unknown'}</div>
                      <div className="text-[#9BC5A9]">Priority: {issue.priority || 'Unknown'}</div>
                      <div className="text-[#9BC5A9]">Created: {new Date(issue.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2 pt-1.5 xs:pt-2 sm:pt-2">
                      <button 
                        className="text-[#9BC5A9] hover:text-white transition-colors px-2 xs:px-3 sm:px-3 py-1 xs:py-1 sm:py-1 bg-[#2D4A32] rounded hover:bg-[#3A5A3F] text-xs xs:text-sm sm:text-sm"
                        onClick={() => {
                          setSelectedTicket(issue);
                          setIsModalOpen(true);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 xs:py-8 sm:py-8">
                  <div className="text-[#9BC5A9] text-base xs:text-lg sm:text-lg mb-1.5 xs:mb-2 sm:mb-2">No tickets found</div>
                  <div className="text-[#9BC5A9]/70 text-xs xs:text-sm sm:text-sm">Try adjusting your search criteria</div>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A9] font-medium py-3">ID</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Subject</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">User</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Type</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Priority</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Created</th>
                    <th className="text-left text-[#9BC5A9] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
                      <tr key={issue.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-4">#{issue.id}</td>
                        <td className="text-white py-4">{issue.subject || 'No Subject'}</td>
                        <td className="text-white py-4">{issue.user_name}</td>
                        <td className="text-white py-4">{issue.type?.replace(/_/g, ' ') || 'Unknown'}</td>
                        <td className="text-white py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            issue.priority === 'critical' 
                              ? 'bg-red-500/20 text-red-400'
                              : issue.priority === 'high'
                              ? 'bg-orange-500/20 text-orange-400'
                              : issue.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {issue.priority || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            issue.status === 'Open' 
                              ? 'bg-red-500/20 text-red-400'
                              : issue.status === 'In_Progress'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : issue.status === 'Resolved'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {formatStatusForDisplay(issue.status)}
                          </span>
                        </td>
                        <td className="text-white py-4">{new Date(issue.created_at).toLocaleDateString()}</td>
                        <td className="py-4">
                          <button 
                            className="text-[#9BC5A9] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                            onClick={() => {
                              setSelectedTicket(issue);
                              setIsModalOpen(true);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-8">
                        <div className="text-[#9BC5A9] text-lg mb-2">No tickets found</div>
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

      {/* Update Ticket Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2D4A32] rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">Update Ticket #{selectedTicket.id}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select 
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value as Issue['status'])}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="Open">Open</option>
                  <option value="In_Progress">In Progress</option>
                  <option value="Awaiting_Response">Awaiting Response</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Priority</label>
                <select 
                  value={updatePriority}
                  onChange={(e) => setUpdatePriority(e.target.value as Issue['priority'])}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A9]/30 focus:border-[#9BC5A9] focus:outline-none"
                >
                  <option value="">Select Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedTicket(null);
                  setUpdateStatus('');
                  setUpdatePriority('');
                }}
                className="flex-1 px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTicket}
                disabled={isUpdating || (!updateStatus && !updatePriority)}
                className="flex-1 px-4 py-2 bg-[#9BC5A9] text-[#0A2E1D] rounded-lg hover:bg-[#8AB59A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SupportTicketsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <SupportTicketsContent />
    </ProtectedRoute>
  );
}
