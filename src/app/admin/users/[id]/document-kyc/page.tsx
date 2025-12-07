'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import DocumentViewer from '@/components/DocumentViewer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { UserService } from '@/lib/userService';
import { EnhancedClientUser, KYCDocument } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function DocumentKYCContent() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // State for user data
  const [user, setUser] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kycDocuments, setKycDocuments] = useState<Array<{
    id: string;
    type: string;
    name: string;
    url: string | null;
    documentType?: string;
    dateAdded: string;
    filePath?: string | null;
    bucketName?: string | undefined;
  }>>([]);
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string;
    type: string;
    name: string;
    url: string | null;
    documentType?: string;
    filePath?: string | null;
    bucketName?: string | undefined;
  } | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // State for KYC status dialog
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [kycStatus, setKycStatus] = useState<'pending' | 'verified' | 'rejected' | ''>('');
  const [approvalComments, setApprovalComments] = useState<string>('');
  const [updatingKyc, setUpdatingKyc] = useState(false);
  
  useEffect(() => {
    document.title = 'Document KYC - RAZ CAPITALS';
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  // Fetch enhanced user data from database
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to fetch user data for ID:', userId);
      
      // First test if we can fetch basic user data
      const testResult = await UserService.testUserFetch(parseInt(userId));
      console.log('Test result:', testResult);
      
      if (testResult.error) {
        setError(`Test failed: ${testResult.error}`);
        return;
      }
      
      // Get enhanced user data including KYC documents
      const userData = await UserService.getEnhancedUserData(parseInt(userId));
      
      if (userData) {
        console.log('User data fetched successfully:', userData);
        setUser(userData);
        
        // Fetch KYC documents - returns array of document objects from kyc_documents table
        const documents = await UserService.getKYCDocuments(userData.user_uuid);
        console.log('KYC documents fetched:', documents);
        
        setKycDocuments(documents);
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError(`Failed to fetch user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle document view
  const handleViewDocument = async (document: {
    id: string;
    type: string;
    name: string;
    url: string | null;
    documentType?: string;
    filePath?: string | null;
    bucketName?: string | undefined;
  }) => {
    try {
      // Always generate a fresh signed URL using the correct bucket
      const pathToUse = document.filePath || document.url;
      
      if (!pathToUse || pathToUse === '' || pathToUse === '#') {
        alert(`Document: ${document.name}\nFile URL: Not available. Please ensure the document has been uploaded.`);
        return;
      }
      
      // Use the bucket name from document if available, otherwise let it be determined by document type
      const bucketToUse = document.bucketName || undefined;
      const signedUrl = await UserService.getSignedUrlForDocument(pathToUse, document.type, bucketToUse);
      
      if (signedUrl) {
        // Update the document in state with the new URL
        setKycDocuments(prev => prev.map(doc => 
          doc.id === document.id ? { ...doc, url: signedUrl } : doc
        ));
        
        setSelectedDocument({ ...document, url: signedUrl });
        setIsViewerOpen(true);
      } else {
        // Fallback to existing URL if signed URL generation fails
        if (document.url && document.url !== '' && document.url !== '#') {
          setSelectedDocument(document);
          setIsViewerOpen(true);
        } else {
          alert(`Document: ${document.name}\nFailed to load document URL. Please try again or contact support.`);
        }
      }
    } catch (error) {
      console.error('Error fetching document URL:', error);
      // Fallback to existing URL if available
      if (document.url && document.url !== '' && document.url !== '#') {
        setSelectedDocument(document);
        setIsViewerOpen(true);
      } else {
        alert(`Document: ${document.name}\nError loading document. Please try again.`);
      }
    }
  };

  // Close document viewer
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedDocument(null);
  };

  // Handle document status update
  const handleStatusUpdate = async (documentId: number, newStatus: 'verified' | 'rejected') => {
    try {
      let rejectionReason = '';
      if (newStatus === 'rejected') {
        rejectionReason = prompt('Please provide a reason for rejection:') || 'No reason provided';
        if (!rejectionReason) return; // User cancelled
      }

      const success = await UserService.updateDocumentStatus(documentId, newStatus, 'Admin', rejectionReason);
      
      if (success) {
        // Refresh user data to show updated status
        await fetchUserData();
        alert(`Document status updated to ${newStatus}`);
      } else {
        alert('Failed to update document status');
      }
    } catch (error) {
      console.error('Error updating document status:', error);
      alert('Error updating document status');
    }
  };

  // Format document type for display
  const formatDocumentType = (docType: string) => {
    switch (docType) {
      case 'id_document':
        return 'ID Document';
      case 'secondary_id':
        return 'Secondary ID';
      case 'bank_statement':
        return 'Bank Statement';
      case 'face_image':
        return 'Face Verification';
      default:
        return docType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
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

  // Handle KYC status update
  const handleKycStatusUpdate = async () => {
    if (!user || !kycStatus.trim()) return;
    
    try {
      setUpdatingKyc(true);
      console.log('🔄 [KYC UPDATE] Updating KYC status for user:', user.user_uuid);
      console.log('🔄 [KYC UPDATE] New status:', kycStatus);
      console.log('🔄 [KYC UPDATE] Comments:', approvalComments);
      
      // Update KYC status in kyc_documents table
      const success = await UserService.updateKycStatus(user.user_uuid, kycStatus as 'pending' | 'verified' | 'rejected', approvalComments);
      
      if (success) {
        console.log('✅ [KYC UPDATE] Status updated successfully');
        // Refresh user data
        await fetchUserData();
        // Close dialog and reset form
        setShowKycDialog(false);
        setKycStatus('');
        setApprovalComments('');
        alert('KYC status updated successfully!');
      } else {
        console.log('❌ [KYC UPDATE] Failed to update status');
        alert('Failed to update KYC status');
      }
    } catch (error) {
      console.error('💥 [KYC UPDATE] Error updating KYC status:', error);
      alert('Error updating KYC status');
    } finally {
      setUpdatingKyc(false);
    }
  };

  // Load previous KYC data when opening dialog
  const handleOpenKycDialog = () => {
    if (user) {
      console.log('📋 [KYC DIALOG] Loading previous data for user:', user.user_uuid);
      console.log('📋 [KYC DIALOG] Current status:', user.status);
      
      // Load current KYC status
      setKycStatus((user.status as 'pending' | 'verified' | 'rejected') || 'pending');
      
      // Load existing approval comments (if available)
      // Note: We'll need to fetch this from the database
      loadExistingApprovalComments(user.user_uuid);
      
      setShowKycDialog(true);
    }
  };

  // Load existing approval comments from database
  const loadExistingApprovalComments = async (userUuid: string) => {
    try {
      console.log('📋 [KYC DIALOG] Fetching existing approval comments for user:', userUuid);
      
      // Fetch existing approval comments from kyc_documents table
      const { data: kycRecord, error } = await supabase
        .from('kyc_documents')
        .select('approval_comments')
        .eq('user_id', userUuid)
        .single();

      if (!error && kycRecord && kycRecord.approval_comments) {
        console.log('📋 [KYC DIALOG] Found existing comments:', kycRecord.approval_comments);
        setApprovalComments(kycRecord.approval_comments);
      } else {
        console.log('📋 [KYC DIALOG] No existing comments found, using empty string');
        setApprovalComments('');
      }
    } catch (error) {
      console.error('💥 [KYC DIALOG] Error loading existing comments:', error);
      setApprovalComments('');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="document-kyc" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="document-kyc" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#0A2E1D] text-xl mb-4">{error || 'User not found'}</div>
            <div className="text-[#0A2E1D] text-sm mb-4">
              User ID: {userId} | Error: {error}
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => router.push('/admin/client-operations/new-client-list')}
                className="px-4 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors mr-2"
              >
                Back to Client List
              </button>
              <button 
                onClick={() => fetchUserData()}
                className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors mr-2"
              >
                Retry
              </button>
              <button 
                onClick={() => {
                  // Show sample data for testing
                  const sampleUser: EnhancedClientUser = {
                    id: parseInt(userId),
                    user_uuid: 'sample-uuid',
                    first_name: 'Sample',
                    last_name: 'User',
                    email: 'sample@example.com',
                    created_at: new Date().toISOString(),
                    status: 'pending',
                    phone_number: '+1234567890',
                    country_of_birth: 'Sample Country',
                    dob: '28/08/1990',
                    residential_address: 'Sample Address'
                  };
                  setUser(sampleUser);
                  setError(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show Sample Data
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
      <AdminSidebar currentPage="document-kyc" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Document KYC"
          showRefreshButton={false}
          showBackButton={true}
          backUrl="/admin/client-operations/new-client-list"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Document KYC Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-[#2D4A32] rounded-lg p-1">
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/profile`)}
              >
                Profile
              </button>
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#4A6741] text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
              >
                Document KYC
              </button>
              <button 
                className="px-4 sm:px-6 py-2 sm:py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

          {/* User Information Section */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-black rounded-2xl p-3 sm:p-4 md:p-6 max-w-md">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#9BC5A2] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-white text-base sm:text-lg font-medium">
                    {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}
                  </h3>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    user.status === 'verified' 
                      ? 'bg-green-500 text-white'
                      : user.status === 'pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {user.status || 'pending'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Documents Section */}
          <div className="bg-black rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-white text-lg sm:text-xl font-bold">KYC Documents</h2>
              <button 
                onClick={fetchUserData}
                className="px-3 sm:px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh Data</span>
              </button>
            </div>
            
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {kycDocuments.length > 0 ? (
                kycDocuments.map((doc) => (
                  <div key={doc.id} className="bg-[#2D4A32] rounded-lg p-3 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{doc.documentType || doc.name}</div>
                        <div className="text-[#9BC5A2] text-xs">{doc.name}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'verified' 
                          ? 'bg-green-500/20 text-green-400'
                          : user.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status || 'pending'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#4A6741]">
                      <div>
                        <div className="text-[#9BC5A2]">Date Added</div>
                        <div className="text-white">{formatDate(doc.dateAdded)}</div>
                      </div>
                      <div>
                        <div className="text-[#9BC5A2]">Document Type</div>
                        <div className="text-white">{doc.documentType || doc.name}</div>
                      </div>
                    </div>
                    
                    {doc.url && doc.url !== '' && doc.url !== '#' ? (
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="w-full mt-2 px-3 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Document</span>
                      </button>
                    ) : (
                      <div className="w-full mt-2 px-3 py-2 bg-[#2D4A32] text-[#9BC5A2] rounded-lg text-sm text-center">
                        No document available
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-[#2D4A32] rounded-lg p-4 text-center text-[#9BC5A2]">
                  No KYC documents uploaded yet
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">ID Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Document Name</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Date Added</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kycDocuments.length > 0 ? (
                    kycDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-3">{doc.documentType || doc.name}</td>
                        <td className="text-white py-3">{doc.name}</td>
                        <td className="text-white py-3">{formatDate(doc.dateAdded)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.status === 'verified' 
                              ? 'bg-green-500/20 text-green-400'
                              : user.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.status || 'pending'}
                          </span>
                        </td>
                        <td className="text-white py-3">
                          {doc.url && doc.url !== '' && doc.url !== '#' ? (
                            <button
                              onClick={() => handleViewDocument(doc)}
                              className="px-3 py-1.5 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] active:scale-95 transition-all text-sm flex items-center space-x-1"
                              title="View document"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>View</span>
                            </button>
                          ) : (
                            <span className="text-[#9BC5A2] text-sm">No document</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-[#9BC5A2] py-8">
                        No KYC documents uploaded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Change KYC Status Button */}
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button 
                onClick={handleOpenKycDialog}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Change KYC Status</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Status Update Dialog */}
      {showKycDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2D4A32] rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-4">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Update KYC Status</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">KYC Status</label>
                <select
                  value={kycStatus}
                  onChange={(e) => setKycStatus(e.target.value as 'pending' | 'verified' | 'rejected' | '')}
                  className="w-full px-3 sm:px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2] focus:outline-none focus:ring-2 focus:ring-[#9BC5A2] text-sm sm:text-base"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Approval Comments</label>
                <textarea
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                  placeholder="Enter approval comments..."
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2] focus:outline-none focus:ring-2 focus:ring-[#9BC5A2] resize-none text-sm sm:text-base"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
              <button
                onClick={() => {
                  setShowKycDialog(false);
                  // Reset form to current values instead of clearing
                  setKycStatus((user?.status as 'pending' | 'verified' | 'rejected') || 'pending');
                  setApprovalComments('');
                }}
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                disabled={updatingKyc}
              >
                Cancel
              </button>
              <button
                onClick={handleKycStatusUpdate}
                disabled={!kycStatus.trim() || updatingKyc}
                className="flex-1 px-3 sm:px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {updatingKyc ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
          documentUrl={selectedDocument.url || null}
          documentName={selectedDocument.name}
          documentType={selectedDocument.documentType || selectedDocument.name}
        />
      )}
    </div>
  );
}

export default function DocumentKYCPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DocumentKYCContent />
    </ProtectedRoute>
  );
}