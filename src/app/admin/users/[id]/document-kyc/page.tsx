'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserService } from '@/lib/userService';
import { EnhancedClientUser, KYCDocument } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function DocumentKYCContent() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  // State for user data
  const [user, setUser] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Document KYC - RAZ CAPITALS';
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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

  // Handle document click to view
  const handleDocumentClick = (documentUrl: string, documentName: string) => {
    if (documentUrl && documentUrl !== '#') {
      // Open document in new tab
      window.open(documentUrl, '_blank');
    } else {
      // If no URL, show alert
      alert(`Document: ${documentName}\nFile path: ${documentUrl || 'Not available'}`);
    }
  };

  // Handle document status update
  const handleStatusUpdate = async (documentId: number, newStatus: 'approved' | 'rejected') => {
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
      case 'id_proof':
        return 'ID Proof';
      case 'address_proof':
        return 'Address Proof';
      case 'income_proof':
        return 'Income Proof';
      case 'bank_statement':
        return 'Bank Statement';
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

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="document-kyc" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="document-kyc" />
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
                    kyc_status: 'Pending',
                    city: 'Sample City',
                    pincode: '12345',
                    address: 'Sample Address',
                    phone: '+1234567890',
                    country: 'Sample Country',
                    date_of_birth: '1990-01-01',
                    kyc_documents: [
                      {
                        id: 1,
                        user_id: 'sample-uuid',
                        document_type: 'id_proof',
                        document_name: 'Sample ID Document',
                        file_path: '/sample/path',
                        file_url: '#',
                        status: 'pending',
                        uploaded_at: new Date().toISOString(),
                      },
                      {
                        id: 2,
                        user_id: 'sample-uuid',
                        document_type: 'address_proof',
                        document_name: 'Sample Address Document',
                        file_path: '/sample/path',
                        file_url: '#',
                        status: 'pending',
                        uploaded_at: new Date().toISOString(),
                      }
                    ]
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
      <AdminSidebar currentPage="document-kyc" />

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

        {/* Document KYC Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#2D4A32] rounded-lg p-1">
              <button 
                className="px-6 py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/profile`)}
              >
                Profile
              </button>
              <button 
                className="px-6 py-3 bg-[#4A6741] text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
              >
                Document KYC
              </button>
              <button 
                className="px-6 py-3 text-[#9BC5A2] hover:text-white rounded-md font-medium transition-colors"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

          {/* User Information and Address Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: User Information */}
            <div className="bg-black rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#9BC5A2] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium">
                    {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.kyc_status === 'Approved' 
                      ? 'bg-green-500 text-white'
                      : user.kyc_status === 'Pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {user.kyc_status || 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Address Section */}
            <div className="bg-black rounded-2xl p-6">
              <h3 className="text-white text-lg font-medium mb-4">Address</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#9BC5A2]">CITY:</span>
                  <span className="text-white">{user.city || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9BC5A2]">PINCODE:</span>
                  <span className="text-white">{user.pincode || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9BC5A2]">Address:</span>
                  <span className="text-white">{user.address || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Proof Verification / Documents Section */}
          <div className="bg-black rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-xl font-bold">Address Proof Verification</h2>
              <div className="flex space-x-2">
                {(!user.kyc_documents || user.kyc_documents.length === 0) && (
                  <button 
                    onClick={async () => {
                      try {
                        const success = await UserService.createKYCDocuments(userId, user.user_uuid);
                        if (success) {
                          alert('KYC documents created successfully! Refreshing data...');
                          await fetchUserData();
                        } else {
                          alert('Failed to create KYC documents');
                        }
                      } catch (error) {
                        console.error('Error creating KYC documents:', error);
                        alert('Error creating KYC documents');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Create KYC Documents</span>
                  </button>
                )}
                <button 
                  onClick={fetchUserData}
                  className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Proof Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Document Type</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Document</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Upload Date</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.kyc_documents && user.kyc_documents.length > 0 ? (
                    user.kyc_documents.map((doc: KYCDocument) => (
                      <tr key={doc.id} className="border-b border-[#4A6741]/50">
                        <td className="text-white py-3">
                          {doc.document_type === 'id_proof' ? 'Id proof' : 'Id proof'}
                        </td>
                        <td className="text-white py-3">
                          {formatDocumentType(doc.document_type)}
                        </td>
                        <td className="py-3">
                          <div 
                            className="w-16 h-12 bg-[#2D4A32] rounded border border-[#9BC5A2] flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-colors"
                            onClick={() => handleDocumentClick(doc.file_url || doc.file_path, doc.document_name)}
                            title={`Click to view ${doc.document_name}`}
                          >
                            <svg className="w-6 h-6 text-[#9BC5A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </td>
                        <td className="text-white py-3">{formatDate(doc.uploaded_at)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            doc.status === 'approved' 
                              ? 'bg-green-500/20 text-green-400'
                              : doc.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {doc.status === 'approved' ? 'Approved' : doc.status === 'pending' ? 'Pending' : 'Rejected'}
                          </span>
                        </td>
                        <td className="text-white py-3">
                          <button 
                            onClick={() => handleStatusUpdate(doc.id, 'approved')}
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors mr-2"
                            title="Approve Document"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                            title="Reject Document"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Fallback to default documents if no KYC documents found
                    <>
                      <tr className="border-b border-[#4A6741]/50">
                        <td className="text-white py-3">Id proof</td>
                        <td className="text-white py-3">ID Proof</td>
                        <td className="py-3">
                          <div className="w-16 h-12 bg-[#2D4A32] rounded border border-[#9BC5A2] flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#9BC5A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </td>
                        <td className="text-white py-3">{formatDate(user.created_at)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.kyc_status === 'Approved' 
                              ? 'bg-green-500/20 text-green-400'
                              : user.kyc_status === 'Pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.kyc_status || 'Pending'}
                          </span>
                        </td>
                        <td className="text-white py-3">
                          <span className="text-[#9BC5A2] text-sm">No actions available</span>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="text-white py-3">Id proof</td>
                        <td className="text-white py-3">Address Proof</td>
                        <td className="py-3">
                          <div className="w-16 h-12 bg-[#2D4A32] rounded border border-[#9BC5A2] flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#9BC5A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </td>
                        <td className="text-white py-3">{formatDate(user.created_at)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.kyc_status === 'Approved' 
                              ? 'bg-green-500/20 text-green-400'
                              : user.kyc_status === 'Pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.kyc_status || 'Pending'}
                          </span>
                        </td>
                        <td className="text-white py-3">
                          <span className="text-[#9BC5A2] text-sm">No actions available</span>
                        </td>
                      </tr>
                    </>
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

export default function DocumentKYCPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DocumentKYCContent />
    </ProtectedRoute>
  );
}