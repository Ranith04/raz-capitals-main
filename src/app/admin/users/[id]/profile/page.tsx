'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserService } from '@/lib/userService';
import { EnhancedClientUser } from '@/types';
import { supabase } from '@/lib/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ProfileContent() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // State for user data
  const [user, setUser] = useState<EnhancedClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for account overview data
  const [accountOverview, setAccountOverview] = useState({
    totalDeposits: 0,
    currentBalance: 0,
    totalTrades: 0,
    winRate: 0
  });
  const [overviewLoading, setOverviewLoading] = useState(true);
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<EnhancedClientUser>>({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    document.title = 'User Profile - RAZ CAPITALS';
    if (userId) {
      // Reset account overview when userId changes
      setAccountOverview({
        totalDeposits: 0,
        currentBalance: 0,
        totalTrades: 0,
        winRate: 0
      });
      setOverviewLoading(true);
      fetchUserData();
    }
  }, [userId]);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  // Fetch user data from database
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏠 [PROFILE PAGE] ==========================================');
      console.log('🏠 [PROFILE PAGE] Fetching user data for ID:', userId);
      
      // Get enhanced user data including KYC documents
      const userData = await UserService.getEnhancedUserData(parseInt(userId));
      
      console.log('🏠 [PROFILE PAGE] User data received from UserService');
      console.log('🏠 [PROFILE PAGE] KYC Status:', userData?.status);
      console.log('🏠 [PROFILE PAGE] Account Status:', userData?.account_status);
      console.log('🏠 [PROFILE PAGE] Account Type:', userData?.account_type);
      console.log('🏠 [PROFILE PAGE] Phone Number:', userData?.phone_number);
      console.log('🏠 [PROFILE PAGE] Country:', userData?.country_of_birth);
      console.log('🏠 [PROFILE PAGE] Residential Address:', userData?.residential_address);
      console.log('🏠 [PROFILE PAGE] Date of Birth:', userData?.dob);
      console.log('🏠 [PROFILE PAGE] Middle Name:', userData?.middle_name);
      console.log('🏠 [PROFILE PAGE] Complete user data:', userData);
      console.log('🏠 [PROFILE PAGE] ==========================================');
      
      if (userData) {
        setUser(userData);
        // Initialize edited user with current user data
        setEditedUser({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
          country_of_birth: userData.country_of_birth || '',
          residential_address: userData.residential_address || '',
          dob: userData.dob || ''
        });
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch account overview data (deposits, balance, trades, win rate)
  const fetchAccountOverview = async () => {
    if (!userId || !user?.user_uuid) {
      setOverviewLoading(false);
      return;
    }

    try {
      setOverviewLoading(true);
      
      const userUuid = user.user_uuid;
      
      // Step 1: Get all trading accounts for this user
      const { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('account_uid, balance, equity')
        .eq('user_id', userUuid);

      if (accountsError) {
        console.error('Error fetching trading accounts:', accountsError);
      }

      const accountIds = tradingAccounts?.map(acc => acc.account_uid) || [];
      
      // Step 2: Calculate current balance (sum of all account balances)
      const currentBalance = tradingAccounts?.reduce((sum, acc) => {
        return sum + (parseFloat(String(acc.balance || 0)));
      }, 0) || 0;

      // Step 3: Get all completed deposit transactions for these accounts
      let totalDeposits = 0;
      if (accountIds.length > 0) {
        const { data: depositTransactions, error: depositsError } = await supabase
          .from('transactions')
          .select('amount, type, status')
          .in('account_id', accountIds)
          .eq('type', 'deposit')
          .eq('status', 'completed');

        if (depositsError) {
          console.error('Error fetching deposits:', depositsError);
        } else if (depositTransactions) {
          totalDeposits = depositTransactions.reduce((sum, tx) => {
            return sum + (parseFloat(String(tx.amount || 0)));
          }, 0);
        }
      }

      // Step 4: Count total transactions (as a proxy for trades)
      // In the future, if there's a separate trades table, we should use that
      let totalTrades = 0;
      if (accountIds.length > 0) {
        const { count: tradesCount, error: tradesError } = await supabase
          .from('transactions')
          .select('*', { count: 'exact', head: true })
          .in('account_id', accountIds);

        if (tradesError) {
          console.error('Error counting trades:', tradesError);
        } else {
          totalTrades = tradesCount || 0;
        }
      }

      // Step 5: Calculate win rate
      // For now, we'll set it to 0% since we don't have a trades table with profit/loss data
      // In the future, this should calculate: (winning trades / total trades) * 100
      const winRate = 0; // Placeholder until trades table is available

      setAccountOverview({
        totalDeposits,
        currentBalance,
        totalTrades,
        winRate
      });
    } catch (error) {
      console.error('Error fetching account overview:', error);
    } finally {
      setOverviewLoading(false);
    }
  };

  // Re-fetch account overview when user data changes
  useEffect(() => {
    if (user?.user_uuid) {
      fetchAccountOverview();
    } else {
      setOverviewLoading(false);
    }
  }, [user?.user_uuid]);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="user-profile" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#0A2E1D] text-xl">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="user-profile" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#0A2E1D] text-xl mb-4">{error || 'User not found'}</div>
            <button 
              onClick={() => router.push('/admin/client-operations/new-client-list')}
              className="px-4 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
            >
              Back to Client List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use UserService formatDate method for consistent date formatting
  const formatDate = (dateString: string) => {
    return UserService.formatDate(dateString);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle edit mode toggle
  const handleEdit = () => {
    if (user) {
      setEditedUser({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        country_of_birth: user.country_of_birth || '',
        residential_address: user.residential_address || '',
        dob: user.dob || ''
      });
      setIsEditing(true);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setEditedUser({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        country_of_birth: user.country_of_birth || '',
        residential_address: user.residential_address || '',
        dob: user.dob || ''
      });
    }
  };

  // Handle save changes
  const handleSave = async () => {
    if (!user || !user.user_uuid) {
      alert('User data not available');
      return;
    }

    try {
      setSaving(true);
      
      // Prepare update data
      const updateData: any = {
        first_name: editedUser.first_name || null,
        last_name: editedUser.last_name || null,
        email: editedUser.email || null,
        phone_number: editedUser.phone_number || null,
        country_of_birth: editedUser.country_of_birth || null,
        residential_address: editedUser.residential_address || null,
        dob: editedUser.dob || null,
        updated_at: new Date().toISOString()
      };

      // Update user in database
      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('user_uuid', user.user_uuid);

      if (updateError) {
        console.error('Error updating user:', updateError);
        alert('Failed to update user information. Please try again.');
        return;
      }

      // Refresh user data
      await fetchUserData();
      
      // Exit edit mode
      setIsEditing(false);
      
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Error saving user changes:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string): string => {
    if (!dateString || dateString === 'N/A') return '';
    
    try {
      // Check if the date is in DD/MM/YYYY format
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          const day = parts[0].padStart(2, '0');
          const month = parts[1].padStart(2, '0');
          const year = parts[2];
          return `${year}-${month}-${day}`;
        }
      }
      
      // Try parsing as ISO date
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      return '';
    } catch {
      return '';
    }
  };



  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="user-profile" isMobileOpen={isMobileSidebarOpen} onMobileClose={closeMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="User Profile"
          showRefreshButton={false}
          showBackButton={true}
          backUrl="/admin/client-operations/new-client-list"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Profile Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Navigation Tabs */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-[#2D4A32] rounded-xl p-1.5 shadow-lg">
              <button 
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#4A6741] text-white rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base shadow-md hover:bg-[#5A7751]"
                onClick={() => router.push(`/admin/users/${userId}/profile`)}
              >
                Profile
              </button>
              <button 
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-[#9BC5A2] hover:text-white hover:bg-[#4A6741]/30 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/document-kyc`)}
              >
                Document KYC
              </button>
              <button 
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-[#9BC5A2] hover:text-white hover:bg-[#4A6741]/30 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                onClick={() => router.push(`/admin/users/${userId}/credit-bonus`)}
              >
                Credit Bonus
              </button>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-[#0A2E1D] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">User Profile</h1>
            <p className="text-[#2D4A32] text-sm sm:text-base">View and manage user account information</p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Personal Information & Account Status */}
            <div className="xl:col-span-8 space-y-6 lg:space-y-8">
              {/* Personal Information Card */}
              <div className="bg-[#2D4A32] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#4A6741]/20">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A6741]/30">
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-[#4A6741] text-white rounded-lg hover:bg-[#5A7751] transition-colors text-sm font-medium flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 bg-[#9BC5A2] text-[#0A2E1D] rounded-lg hover:bg-[#8FB89A] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.first_name || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg"
                        placeholder="First Name"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{user.first_name || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.last_name || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg"
                        placeholder="Last Name"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{user.last_name || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg break-all"
                        placeholder="Email Address"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium break-all">{user.email || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedUser.phone_number || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, phone_number: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg"
                        placeholder="Phone Number"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{user.phone_number || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Country</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.country_of_birth || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, country_of_birth: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg"
                        placeholder="Country"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{user.country_of_birth || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Residential Address</label>
                    {isEditing ? (
                      <textarea
                        value={editedUser.residential_address || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, residential_address: e.target.value })}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg min-h-[80px] resize-y"
                        placeholder="Residential Address"
                        rows={3}
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{user.residential_address || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={formatDateForInput(editedUser.dob || '')}
                        onChange={(e) => {
                          // Convert YYYY-MM-DD to DD/MM/YYYY format for storage
                          const dateValue = e.target.value;
                          if (dateValue) {
                            const [year, month, day] = dateValue.split('-');
                            setEditedUser({ ...editedUser, dob: `${day}/${month}/${year}` });
                          } else {
                            setEditedUser({ ...editedUser, dob: '' });
                          }
                        }}
                        className="w-full px-4 py-2 bg-[#4A6741] text-white rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none text-base sm:text-lg"
                      />
                    ) : (
                      <p className="text-white text-base sm:text-lg font-medium">{formatDate(user.dob || '') || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 block">Registration Date</label>
                    <p className="text-white text-base sm:text-lg font-medium">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-[#2D4A32] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#4A6741]/20">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A6741]/30">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">Account Status</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide block">KYC Status</label>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      user.status === 'verified' 
                        ? 'bg-[#9BC5A2]/20 text-[#9BC5A2] border border-[#9BC5A2]/30'
                        : user.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : user.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {user.status || 'pending'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide block">Account Status</label>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      user.account_status === 'Active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : user.account_status === 'Suspended'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {user.account_status || 'Active'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide block">Risk Level</label>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Medium
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Account Overview */}
            <div className="xl:col-span-4">
              <div className="bg-[#2D4A32] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#4A6741]/20 sticky top-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4A6741]/30">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">Account Overview</h3>
                </div>
                {overviewLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-[#9BC5A2]">Loading account data...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:gap-5">
                    <div className="bg-gradient-to-br from-[#4A6741]/40 to-[#4A6741]/20 rounded-xl p-5 border border-[#4A6741]/30 hover:border-[#9BC5A2]/30 transition-all duration-200">
                      <div className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">Total Deposits</div>
                      <div className="text-white font-bold text-2xl sm:text-3xl">{formatCurrency(accountOverview.totalDeposits)}</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#4A6741]/40 to-[#4A6741]/20 rounded-xl p-5 border border-[#4A6741]/30 hover:border-[#9BC5A2]/30 transition-all duration-200">
                      <div className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">Current Balance</div>
                      <div className="text-white font-bold text-2xl sm:text-3xl">{formatCurrency(accountOverview.currentBalance)}</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#4A6741]/40 to-[#4A6741]/20 rounded-xl p-5 border border-[#4A6741]/30 hover:border-[#9BC5A2]/30 transition-all duration-200">
                      <div className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">Total Trades</div>
                      <div className="text-white font-bold text-2xl sm:text-3xl">{accountOverview.totalTrades}</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#4A6741]/40 to-[#4A6741]/20 rounded-xl p-5 border border-[#9BC5A2]/30 hover:border-[#9BC5A2]/50 transition-all duration-200">
                      <div className="text-[#9BC5A2] text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2">Win Rate</div>
                      <div className="text-green-400 font-bold text-2xl sm:text-3xl">
                        {accountOverview.winRate > 0 ? `${accountOverview.winRate.toFixed(1)}%` : 'N/A'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ProfileContent />
    </ProtectedRoute>
  );
}