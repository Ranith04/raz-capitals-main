'use client';

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
        
        console.log('=== FINAL TRANSFORMED DATA ===');
        console.log('Transformed issues:', transformedIssues);
        console.log('Setting issues state...');
        
        setIssues(transformedIssues);
        
        console.log('Issues state updated successfully');
      }
    } catch (err) {
      console.error('=== UNEXPECTED ERROR IN FETCH ===');
      console.error('Error type:', typeof err);
      console.error('Error message:', (err as any)?.message);
      console.error('Full error object:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      console.log('=== FETCH COMPLETED ===');
      console.log('Setting loading to false');
      setLoading(false);
      console.log('=== FETCHING ISSUES COMPLETED ===');
    }
  };

  // Filter issues based on search and filter criteria
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = !searchTerm || 
      issue.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.account_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'All Priorities' || issue.priority === priorityFilter;
    const matchesType = typeFilter === 'All Types' || issue.type === typeFilter.toLowerCase().replace(' ', '_');
    
    const matchesDate = !dateFilter || issue.created_at.startsWith(dateFilter);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesDate;
  });

  // Calculate statistics
  const totalTickets = issues.length;
  const openTickets = issues.filter(issue => issue.status === 'Open').length;
  const inProgressTickets = issues.filter(issue => issue.status === 'In_Progress').length;
  const resolvedTickets = issues.filter(issue => issue.status === 'Resolved').length;
  const avgResponseTime = '2.4h'; // This could be calculated from actual data

  const handleRefresh = () => {
    fetchIssues();
  };

  const handleCreateTicket = () => {
    // TODO: Implement create ticket functionality
    console.log('Create ticket clicked');
  };

  const handleViewTicket = (issue: Issue) => {
    console.log('=== MODAL OPENING ===');
    console.log('Opening modal for ticket:', issue);
    console.log('Ticket ID:', issue.id);
    console.log('Current status:', issue.status);
    console.log('Current priority:', issue.priority);
    
    setSelectedTicket(issue);
    setUpdateStatus(issue.status || '');
    setUpdatePriority(issue.priority || '');
    setIsModalOpen(true);
    
    console.log('Modal state set to open');
  };

  const handleCloseModal = () => {
    console.log('=== MODAL CLOSING ===');
    console.log('Closing modal');
    console.log('Current selected ticket:', selectedTicket);
    console.log('Current update status:', updateStatus);
    console.log('Current update priority:', updatePriority);
    
    setIsModalOpen(false);
    setSelectedTicket(null);
    setUpdateStatus('');
    setUpdatePriority('');
    
    console.log('Modal state reset');
  };

  const handleUpdateTicket = async () => {
    console.log('=== TICKET UPDATE PROCESS STARTED ===');
    console.log('Selected ticket:', selectedTicket);
    
    if (!selectedTicket) {
      console.error('No ticket selected for update');
      return;
    }

    // Validate ticket ID
    if (!selectedTicket.id || isNaN(selectedTicket.id)) {
      console.error('Invalid ticket ID:', selectedTicket.id);
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
        console.error('=== ERROR HANDLING ===');
        console.error('Error updating ticket:', updateError);
        
        // Provide more specific error messages based on error type
        if (updateError.code === 'PGRST204') {
          console.error('Database schema error detected');
          alert('Database schema error: One or more fields do not exist in the database. Please contact support.');
        } else if (updateError.code === 'PGRST116') {
          console.error('Database connection error detected');
          alert('Database connection error: Please check your internet connection and try again.');
        } else {
          console.error('Generic error detected');
          alert(`Failed to update ticket: ${updateError.message || 'Please try again.'}`);
        }
        return;
      }

      console.log('=== SUCCESS - UPDATING LOCAL STATE ===');
      console.log('API call successful, no errors returned');
      console.log('Response data received:', updateResponse);

      // Update local state
      console.log('=== UPDATING LOCAL STATE ===');
      console.log('Previous issues count:', issues.length);
      console.log('Finding issue with ID:', selectedTicket.id);
      
      setIssues(prevIssues => {
        console.log('Previous issues state:', prevIssues);
        
        const updatedIssues = prevIssues.map(issue => {
          if (issue.id === selectedTicket.id) {
            console.log('Found matching issue:', issue);
            const updatedIssue = { 
              ...issue, 
              status: updateStatus || issue.status, 
              priority: updatePriority || issue.priority
            };
            console.log('Updated issue:', updatedIssue);
            return updatedIssue;
          }
          return issue;
        });
        
        console.log('New issues state:', updatedIssues);
        return updatedIssues;
      });

      console.log('=== SUCCESS COMPLETE ===');
      console.log('Local state updated successfully');
      console.log('Showing success alert to user');
      
      alert('Ticket updated successfully!');
      
      console.log('=== CLOSING MODAL ===');
      handleCloseModal();
    } catch (err: unknown) {
      console.error('=== UNEXPECTED ERROR CAUGHT ===');
      console.error('Error type:', typeof err);
      console.error('Error constructor:', (err as any)?.constructor?.name);
      console.error('Error message:', (err as any)?.message);
      console.error('Error stack:', (err as any)?.stack);
      console.error('Full error object:', err);
      
      if (err instanceof Error) {
        console.error('Standard Error object detected');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      } else if (typeof err === 'string') {
        console.error('String error detected:', err);
      } else if (err && typeof err === 'object') {
        console.error('Object error detected');
        console.error('Error keys:', Object.keys(err as object));
        console.error('Error values:', Object.values(err as object));
      }
      
      alert(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Please try again.'}`);
    } finally {
      console.log('=== FINALLY BLOCK EXECUTING ===');
      console.log('Setting isUpdating to false');
      setIsUpdating(false);
      console.log('=== TICKET UPDATE PROCESS COMPLETED ===');
    }
  };

  const handleReplyTicket = (issue: Issue) => {
    // TODO: Implement reply functionality
    console.log('Reply to ticket:', issue);
  };

  const handleAssignTicket = (issue: Issue) => {
    // TODO: Implement assign functionality
    console.log('Assign ticket:', issue);
  };

  const handleEscalateTicket = (issue: Issue) => {
    // TODO: Implement escalate functionality
    console.log('Escalate ticket:', issue);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="support-tickets" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading support tickets...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="support-tickets" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-600 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="support-tickets" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-start">
          {/* Left Side - Document Icon and Refresh Button */}
          <div className="flex items-center space-x-3">
            {/* Document Icon Button */}
            <div 
              className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            
            {/* Refresh Button */}
            <button 
              onClick={handleRefresh}
              className="bg-[#2D4A32] text-white px-4 py-2 rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2"
            >
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

        {/* Support Tickets Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Support Tickets</h1>
            <button 
              onClick={handleCreateTicket}
              className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
            >
              Create New Ticket
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Total Tickets</h3>
              <p className="text-white text-2xl font-bold">{totalTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Open Tickets</h3>
              <p className="text-red-400 text-2xl font-bold">{openTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">In Progress</h3>
              <p className="text-yellow-400 text-2xl font-bold">{inProgressTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Resolved</h3>
              <p className="text-green-400 text-2xl font-bold">{resolvedTickets}</p>
            </div>
            <div className="bg-[#2D4A32] rounded-2xl p-6 text-center">
              <h3 className="text-[#9BC5A2] text-sm font-medium mb-2">Avg Response</h3>
              <p className="text-white text-2xl font-bold">{avgResponseTime}</p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-[#2D4A32] rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Search</label>
                <input 
                  type="text" 
                  placeholder="Ticket ID, User, Subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
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
                <label className="text-white text-sm font-medium mb-2 block">Priority</label>
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                >
                  <option>All Priorities</option>
                  <option>critical</option>
                  <option>high</option>
                  <option>medium</option>
                  <option>low</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Type</label>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                >
                  <option>All Types</option>
                  <option>Technical Issue</option>
                  <option>Account Problem</option>
                  <option>Trading Issue</option>
                  <option>Payment Problem</option>
                </select>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Date</label>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Support Tickets Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Recent Support Tickets</h2>
            
            {filteredIssues.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#9BC5A2] text-lg">No issues found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#4A6741]">
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Ticket ID</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">User</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Subject</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Type</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Priority</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Created</th>
                      <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue) => (
                      <tr key={issue.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-4">#{issue.id.toString().padStart(6, '0')}</td>
                        <td className="text-white py-4">{issue.user_name}</td>
                        <td className="text-white py-4">{issue.subject || 'No subject'}</td>
                        <td className="text-white py-4">
                          {issue.type ? issue.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown'}
                        </td>
                        <td className="py-4">
                          {issue.priority && (
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              issue.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                              issue.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              issue.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          {issue.status && (
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              issue.status === 'Open' ? 'bg-red-500/20 text-red-400' :
                              issue.status === 'In_Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                              issue.status === 'Awaiting_Response' ? 'bg-yellow-500/20 text-yellow-400' :
                              issue.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {formatStatusForDisplay(issue.status)}
                            </span>
                          )}
                        </td>
                        <td className="text-white py-4">
                          {new Date(issue.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleViewTicket(issue)}
                              className="text-[#9BC5A2] hover:text-white transition-colors px-3 py-1 bg-[#4A6741] rounded hover:bg-[#3A5A3F] text-sm"
                            >
                              View
                            </button>
                            {issue.status === 'Open' && (
                              <button 
                                onClick={() => handleAssignTicket(issue)}
                                className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm"
                              >
                                Assign
                              </button>
                            )}
                            {issue.status === 'Awaiting_Response' && (
                              <button 
                                onClick={() => handleReplyTicket(issue)}
                                className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm"
                              >
                                Reply
                              </button>
                            )}
                            {issue.priority === 'critical' && issue.status === 'Open' && (
                              <button 
                                onClick={() => handleEscalateTicket(issue)}
                                className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm"
                              >
                                Escalate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Update Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2D4A32] rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl font-bold">
                Update Ticket #{selectedTicket.id.toString().padStart(6, '0')}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-[#9BC5A2] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Ticket Info */}
              <div className="bg-[#4A6741] rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Ticket Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#9BC5A2]">User:</span>
                    <span className="text-white ml-2">{selectedTicket.user_name}</span>
                  </div>
                  <div>
                    <span className="text-[#9BC5A2]">Subject:</span>
                    <span className="text-white ml-2">{selectedTicket.subject || 'No subject'}</span>
                  </div>
                  <div>
                    <span className="text-[#9BC5A2]">Type:</span>
                    <span className="text-white ml-2">
                      {selectedTicket.type ? selectedTicket.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9BC5A2]">Status:</span>
                    <span className="text-white ml-2">
                      {formatStatusForDisplay(selectedTicket.status)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#9BC5A2]">Created:</span>
                    <span className="text-white ml-2">
                      {new Date(selectedTicket.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Update Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Status
                    {updateStatus && updateStatus !== selectedTicket.status && (
                      <span className="text-yellow-400 ml-2">(Modified)</span>
                    )}
                  </label>
                  <select 
                    value={updateStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as Issue['status'];
                      console.log('=== STATUS FIELD CHANGED ===');
                      console.log('Previous status:', updateStatus);
                      console.log('New status:', newStatus);
                      console.log('Original ticket status:', selectedTicket.status);
                      setUpdateStatus(newStatus);
                    }}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                      updateStatus && updateStatus !== selectedTicket.status
                        ? 'bg-yellow-500/20 text-white border-yellow-400'
                        : 'bg-[#4A6741] text-white border-[#9BC5A2]/30 focus:border-[#9BC5A2]'
                    }`}
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
                  <label className="text-white text-sm font-medium mb-2 block">
                    Priority
                    {updatePriority && updatePriority !== selectedTicket.priority && (
                      <span className="text-yellow-400 ml-2">(Modified)</span>
                    )}
                  </label>
                  <select 
                    value={updatePriority}
                    onChange={(e) => {
                      const newPriority = e.target.value as Issue['priority'];
                      console.log('=== PRIORITY FIELD CHANGED ===');
                      console.log('Previous priority:', updatePriority);
                      console.log('New priority:', newPriority);
                      console.log('Original ticket priority:', selectedTicket.priority);
                      setUpdatePriority(newPriority);
                    }}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
                      updatePriority && updatePriority !== selectedTicket.priority
                        ? 'bg-yellow-500/20 text-white border-yellow-400'
                        : 'bg-[#4A6741] text-white border-[#9BC5A2]/30 focus:border-[#9BC5A2]'
                    }`}
                  >
                    <option value="">Select Priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>


              </div>

              {/* Update Summary */}
              {(updateStatus !== selectedTicket.status || updatePriority !== selectedTicket.priority) && (
                <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-2">Update Summary</h4>
                  <div className="text-sm text-white space-y-1">
                    {updateStatus !== selectedTicket.status && (
                      <div>Status: <span className="text-yellow-400">{selectedTicket.status || 'Not set'}</span> → <span className="text-green-400">{updateStatus}</span></div>
                    )}
                    {updatePriority !== selectedTicket.priority && (
                      <div>Priority: <span className="text-yellow-400">{selectedTicket.priority || 'Not set'}</span> → <span className="text-green-400">{updatePriority}</span></div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTicket}
                  disabled={isUpdating || (!updateStatus && !updatePriority) || (updateStatus === selectedTicket.status && updatePriority === selectedTicket.priority)}
                  className="px-6 py-2 bg-[#9BC5A2] text-[#0A2E1D] rounded-lg hover:bg-[#8AB592] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0A2E1D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Ticket</span>
                  )}
                </button>
              </div>
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
