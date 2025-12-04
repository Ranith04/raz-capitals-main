'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { getUserTradingId } from '@/utils/getUserTradingId';
import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { TradingAccount } from '@/types';
import { getKycStatusByUserId } from '@/lib/kycService';

interface UserProfile {
  id: number;
  user_uuid: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  country_of_birth?: string;
  residential_address?: string;
  city?: string;
  zip?: string;
  created_at: string;
  kyc_status?: string;
  account_status?: string;
}

interface ProfileDetails {
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified';
  kycLevel: 'Level 1' | 'Level 2' | 'Level 3';
  customerGroup: string | null;
  riskProfile: string | null;
  ibMemberStatus: string | null;
}

function SettingsPageContent() {
  const searchParams = useSearchParams();
  const { activeAccount, loading: accountLoading } = useActiveAccount();
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [tradingId, setTradingId] = useState<string | null>(null);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    verificationStatus: 'unverified',
    kycLevel: 'Level 1',
    customerGroup: null,
    riskProfile: null,
    ibMemberStatus: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalEquity, setTotalEquity] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // Form state for controlled inputs
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    dob: '',
    phone_number: '',
    country_of_birth: '',
    city: '',
    zip: '',
    residential_address: '',
  });

  // Security section state
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [securityFormData, setSecurityFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [updatingSecurity, setUpdatingSecurity] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Set active tab from URL parameter - check on mount and when URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    console.log('🔍 Tab parameter from URL:', tabParam);
    if (tabParam && ['profile', 'withdraw-accounts', 'security', 'kyc', 'agreements', 'tools'].includes(tabParam)) {
      console.log('✅ Setting active tab to:', tabParam);
      setActiveTab(tabParam);
    } else if (!tabParam) {
      // If no tab param, default to profile
      setActiveTab('profile');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchUserData();
  }, [activeAccount]); // Refetch when active account changes

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Wait for active account to load
      if (accountLoading) {
        setLoading(false);
        return;
      }

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          // If session user ID is not a UUID, try to find the user in users table
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('user_uuid', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
        setError('Failed to load user profile.');
      } else if (profileData) {
        setUserProfile(profileData);
        // Initialize form data with user profile values
        setFormData({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          gender: profileData.gender || '',
          dob: formatDOB(profileData.dob) || '',
          phone_number: profileData.phone_number || '',
          country_of_birth: profileData.country_of_birth || '',
          city: profileData.city || '',
          zip: profileData.zip || '',
          residential_address: profileData.residential_address || '',
        });
        // Initialize security form data
        setSecurityFormData({
          email: profileData.email || '',
          password: '',
          confirmPassword: '',
        });
      }

      // Fetch trading accounts (for display purposes)
      const { data: accountsData, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
      } else if (accountsData) {
        setAccounts(accountsData);
      }

      // Use active account from context
      if (activeAccount) {
        setTradingId(activeAccount.account_uid);
        setTotalBalance(activeAccount.balance || 0);
        setTotalEquity(activeAccount.equity || 0);
        setWalletBalance(activeAccount.free_margin || 0);
      } else {
        // Fallback: Fetch Trading ID using the shared utility function
        const tradingIdValue = await getUserTradingId();
        if (tradingIdValue) {
          setTradingId(tradingIdValue);
          
          // Fetch balance for the selected account only
          const { data: selectedAccount, error: accountError } = await supabase
            .from('tradingAccounts')
            .select('balance, equity, free_margin, currency')
            .eq('account_uid', tradingIdValue)
            .single();

          if (!accountError && selectedAccount) {
            setTotalBalance(selectedAccount.balance || 0);
            setTotalEquity(selectedAccount.equity || 0);
            setWalletBalance(selectedAccount.free_margin || 0);
          } else {
            setTotalBalance(0);
            setTotalEquity(0);
            setWalletBalance(0);
          }
        } else {
          setTotalBalance(0);
          setTotalEquity(0);
          setWalletBalance(0);
        }
      }

      // Fetch KYC status using active trading account's user_id
      if (activeAccount?.user_id) {
        // Use the shared function to get KYC status
        const kycStatus = await getKycStatusByUserId(activeAccount.user_id);
        
        let verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified' = kycStatus === 'verified' ? 'verified' : 'unverified';
        let kycLevel: 'Level 1' | 'Level 2' | 'Level 3' = kycStatus === 'verified' ? 'Level 2' : 'Level 1';

        // Update profile details state
        setProfileDetails({
          verificationStatus,
          kycLevel,
          customerGroup: null, // These fields don't exist in database yet
          riskProfile: null,
          ibMemberStatus: null,
        });
      } else if (userId) {
        // Fallback: use userId if no active account
        const kycStatus = await getKycStatusByUserId(userId);
        
        let verificationStatus: 'verified' | 'pending' | 'rejected' | 'unverified' = kycStatus === 'verified' ? 'verified' : 'unverified';
        let kycLevel: 'Level 1' | 'Level 2' | 'Level 3' = kycStatus === 'verified' ? 'Level 2' : 'Level 1';

        // Update profile details state
        setProfileDetails({
          verificationStatus,
          kycLevel,
          customerGroup: null,
          riskProfile: null,
          ibMemberStatus: null,
        });
      }
    } catch (err) {
      console.error('Exception while fetching user data:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDOB = (dob?: string): string => {
    if (!dob) return '';
    // Handle different date formats
    try {
      const date = new Date(dob);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return dob;
    }
  };

  const parseDOB = (dobString: string): string | null => {
    if (!dobString || dobString.trim() === '') return null;
    
    // Handle dd-mm-yyyy format
    const parts = dobString.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      // Return in ISO format (yyyy-mm-dd)
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    // Try to parse as date and return ISO format
    try {
      const date = new Date(dobString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch {
      // If parsing fails, return null
    }
    
    return null;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          // If session user ID is not a UUID, try to find the user in users table
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('User not found. Please log in again.');
        setSaving(false);
        return;
      }

      // Extract form data from state
      const updateData: any = {
        first_name: formData.first_name.trim() || null,
        last_name: formData.last_name.trim() || null,
        gender: formData.gender.trim() || null,
        phone_number: formData.phone_number.trim() || null,
        country_of_birth: formData.country_of_birth.trim() || null,
        city: formData.city.trim() || null,
        zip: formData.zip.trim() || null,
        residential_address: formData.residential_address.trim() || null,
      };

      // Parse and format date of birth
      if (formData.dob.trim()) {
        const parsedDOB = parseDOB(formData.dob.trim());
        if (parsedDOB) {
          updateData.dob = parsedDOB;
        }
      } else {
        updateData.dob = null;
      }

      // Remove null/empty values to avoid unnecessary updates
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === null || updateData[key] === '') {
          delete updateData[key];
        }
      });

      // Update user profile in database
      const { data: updatedProfile, error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('user_uuid', userId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        setError('Failed to save profile. Please try again.');
        setSaving(false);
        return;
      }

      // Update local state with new data
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        // Update form data with saved values
        setFormData({
          first_name: updatedProfile.first_name || '',
          last_name: updatedProfile.last_name || '',
          gender: updatedProfile.gender || '',
          dob: formatDOB(updatedProfile.dob) || '',
          phone_number: updatedProfile.phone_number || '',
          country_of_birth: updatedProfile.country_of_birth || '',
          city: updatedProfile.city || '',
          zip: updatedProfile.zip || '',
          residential_address: updatedProfile.residential_address || '',
        });
      }

      // Show success message (you can replace this with a toast notification)
      alert('Profile updated successfully!');
      
    } catch (err) {
      console.error('Exception while saving profile:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSecurity = async () => {
    try {
      setUpdatingSecurity(true);
      setError(null);

      // Get user ID using the same pattern as fetchUserData
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          // If session user ID is not a UUID, try to find the user in users table
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('User not found. Please log in again.');
        setUpdatingSecurity(false);
        return;
      }

      const updates: any = {};
      let updateUsersTable = false;


      // Update password if it was changed
      if (editingPassword && securityFormData.password) {
        if (securityFormData.password !== securityFormData.confirmPassword) {
          setError('Passwords do not match. Please try again.');
          setUpdatingSecurity(false);
          return;
        }

        if (securityFormData.password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setUpdatingSecurity(false);
          return;
        }

        // Try to update via Supabase Auth if we have an auth user
        if (authUser) {
          const { error: passwordError } = await supabase.auth.updateUser({
            password: securityFormData.password,
          });

          if (passwordError) {
            setError(`Failed to update password: ${passwordError.message}`);
            setUpdatingSecurity(false);
            return;
          }
        } else {
          // If no auth user, update password in users table directly
          updates.password = securityFormData.password;
        }

        // Clear password fields after successful update
        setSecurityFormData({
          ...securityFormData,
          password: '',
          confirmPassword: '',
        });
      }

      // Update users table if password was changed
      if (editingPassword && securityFormData.password && !authUser) {
        const updateData: any = {};
        if (updates.password) updateData.password = updates.password;

        if (Object.keys(updateData).length > 0) {
          const { error: updateError } = await supabase
            .from('users')
            .update(updateData)
            .eq('user_uuid', userId);

          if (updateError) {
            console.error('Error updating users table:', updateError);
            setError(`Failed to update: ${updateError.message}`);
            setUpdatingSecurity(false);
            return;
          }
        }
      }

      // Refresh user profile data
      await fetchUserData();

      // Exit edit mode
      setEditingPassword(false);

      alert('Security settings updated successfully!');
    } catch (err) {
      console.error('Exception while updating security:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setUpdatingSecurity(false);
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A2E1D]' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-[#0F1B14] border-[#A0C8A9]/20' : 'bg-white border-gray-200'} border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`p-6 border-b ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <Image
              src="/logo/raz-capitals-logo.png"
              alt="RAZ CAPITALS"
              width={170}
              height={63}
              priority
              className="h-14 w-auto"
            />
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </a>
            {/* Wallets menu item temporarily removed */}
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            {/* New Account menu item temporarily removed */}
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
            </a>
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Withdraw</span>
            </a>
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
          </nav>
        </div>
        
        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Settings Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Settings Tabs */}
          <div className="flex space-x-1 bg-[#2D4A35] p-1 rounded-lg max-w-4xl border border-[#A0C8A9]/30">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('withdraw-accounts')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'withdraw-accounts'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Withdraw Accounts
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'kyc'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              KYC
            </button>
            <button
              onClick={() => setActiveTab('agreements')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'agreements'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Agreements
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tools'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Tools
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile Summary */}
              <div className="lg:col-span-1">
                {/* Green Background Section */}
                <div className="bg-[#0A2E1D] rounded-t-lg p-6 text-center text-white">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 bg-[#A0C8A9] rounded-full mx-auto flex items-center justify-center">
                      <div className="w-24 h-24 bg-[#B8D4C1] rounded-full flex items-center justify-center">
                        <span className="text-3xl">😊</span>
                      </div>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#A0C8A9] p-2 rounded-lg shadow-lg hover:bg-[#8BBF9F] transition-colors">
                      <svg className="w-4 h-4 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* White Content Section */}
                <div className="bg-white rounded-b-lg p-6 shadow">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2E1D]"></div>
                      <p className="mt-2 text-gray-600">Loading profile...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <p className="text-red-600">{error}</p>
                    </div>
                  ) : userProfile ? (
                    <>
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {formData.first_name || userProfile.first_name} {(formData.last_name || userProfile.last_name) || ''}
                        </h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm mb-2 ${
                          profileDetails.verificationStatus === 'verified'
                            ? 'bg-green-100 text-green-800'
                            : profileDetails.verificationStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : profileDetails.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-[#0A2E1D] text-white'
                        }`}>
                          {profileDetails.verificationStatus === 'verified' 
                            ? 'Verified' 
                            : profileDetails.verificationStatus === 'pending'
                            ? 'Pending'
                            : profileDetails.verificationStatus === 'rejected'
                            ? 'Rejected'
                            : 'Unverified'}
                        </span>
                        <p className="text-gray-600">{formData.country_of_birth || userProfile.country_of_birth || 'N/A'}</p>
                      </div>
                      
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Member since:</span>
                          <span className="font-medium">{formatDate(userProfile.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Customer Group:</span>
                          <span className="font-medium">{profileDetails.customerGroup || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Profile:</span>
                          <span className="font-medium">{profileDetails.riskProfile || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>KYC Level:</span>
                          <span className="font-medium">{profileDetails.kycLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>IB Member:</span>
                          <span className="font-medium">{profileDetails.ibMemberStatus || 'Unprocessed'}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No profile data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Account Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Account Balance */}
                <div className="bg-white rounded-lg p-4 shadow">
                  <h3 className="text-sm text-gray-600 mb-1">Balance</h3>
                  <p className="text-xl font-bold text-gray-900">
                    {loading ? '...' : formatCurrency(totalBalance)}
                  </p>
                </div>

                {/* Personal Information Form */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2E1D]"></div>
                      <p className="mt-2 text-gray-600">Loading...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input 
                            type="text" 
                            name="first_name"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input 
                            type="text" 
                            name="last_name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                          <input 
                            type="text" 
                            name="username"
                            value={userProfile?.email?.split('@')[0] || ''}
                            className="w-full px-3 py-2 bg-gray-50 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Trading ID</label>
                          <div className="relative">
                            {loading ? (
                              <div className="w-full px-3 py-2 bg-gray-50 text-gray-400 border border-gray-300 rounded-md">
                                Loading...
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={tradingId || 'N/A'}
                                  className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent cursor-not-allowed"
                                  disabled
                                  readOnly
                                />
                                {tradingId && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        await navigator.clipboard.writeText(tradingId);
                                        alert('Trading ID copied to clipboard!');
                                      } catch (error) {
                                        console.error('Failed to copy:', error);
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    title="Copy Trading ID"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                          <select 
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Of Birth</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              name="dob"
                              placeholder="dd-mm-yyyy"
                              value={formData.dob}
                              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                              className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent pr-10 placeholder:text-gray-400"
                            />
                            <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            value={userProfile?.email || ''}
                            className="w-full px-3 py-2 bg-gray-50 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <div className="flex">
                            <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                              <span className="text-sm text-gray-500">
                                {formData.country_of_birth === 'India' ? '🇮🇳 +91' : '📞'}
                              </span>
                            </div>
                            <input 
                              type="tel" 
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                              className="flex-1 px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                          <input 
                            type="text" 
                            name="country_of_birth"
                            value={formData.country_of_birth}
                            onChange={(e) => setFormData({ ...formData, country_of_birth: e.target.value })}
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input 
                            type="text" 
                            name="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
                          <input 
                            type="text" 
                            name="zip"
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            placeholder="Zip Code"
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea 
                            name="residential_address"
                            placeholder="Enter your full address"
                            rows={3}
                            value={formData.residential_address}
                            onChange={(e) => setFormData({ ...formData, residential_address: e.target.value })}
                            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent placeholder:text-gray-400 resize-none"
                          />
                        </div>
                      </div>
                      
                      {/* Save Button */}
                      <div className="flex justify-end pt-4">
                        <button 
                          type="submit"
                          disabled={saving}
                          className="px-8 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {saving && (
                            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          )}
                          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab === 'withdraw-accounts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <h2 className="text-xl font-semibold text-[#0A2E1D] mb-4">Withdraw Accounts</h2>
                <p className="text-gray-600 mb-6">Manage your bank accounts and payment methods for withdrawals.</p>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2E1D]"></div>
                    <p className="mt-2 text-gray-600">Loading accounts...</p>
                  </div>
                ) : accounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No trading accounts found.</p>
                    <a href="/dashboard/my-accounts" className="text-[#0A2E1D] hover:underline font-medium">
                      View your trading accounts
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <div key={account.account_uid} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {account.account_type === 'standard' ? 'Standard Account' : 
                               account.account_type === 'premium' ? 'Premium Account' :
                               account.account_type === 'vip' ? 'VIP Account' : 'Trading Account'}
                            </h3>
                            <p className="text-sm text-gray-600">Account UID: {account.account_uid}</p>
                            <p className="text-sm text-gray-600">Balance: {formatCurrency(account.balance || 0)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              account.status === 'active' ? 'bg-green-100 text-green-800' :
                              account.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {account.status || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Security Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <h2 className="text-xl font-semibold text-[#0A2E1D] mb-2">Strengthen Your Online Security</h2>
                <p className="text-gray-600">It&apos;s your primary defense.</p>
              </div>

              {/* Password Section */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#0A2E1D]">Security</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-2">Authorization</h4>
                  <p className="text-gray-600 mb-4">Information for logging in to Raz Capitals.</p>
                  <p className="text-gray-600 mb-4">Change your password whenever you think it might have been compromised.</p>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {/* Email Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="mb-2">
                        <label className="text-sm text-gray-500">Email address</label>
                      </div>
                      <p className="font-medium text-gray-900">{userProfile?.email || 'N/A'}</p>
                    </div>
                    
                    {/* Password Field */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-500">Current password</label>
                        {!editingPassword && (
                          <button 
                            onClick={() => {
                              setEditingPassword(true);
                              setSecurityFormData({ ...securityFormData, password: '', confirmPassword: '' });
                            }}
                            className="px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-md hover:bg-[#8BBF9F] transition-colors font-medium text-sm"
                          >
                            Change
                          </button>
                        )}
                      </div>
                      {editingPassword ? (
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={securityFormData.password}
                              onChange={(e) => setSecurityFormData({ ...securityFormData, password: e.target.value })}
                              className="w-full px-3 py-2 pr-10 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={securityFormData.confirmPassword}
                              onChange={(e) => setSecurityFormData({ ...securityFormData, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 pr-10 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                              {showConfirmPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-medium text-gray-900">••••••••</p>
                      )}
                    </div>
                  </div>
                  
                  {editingPassword && (
                    <div className="mt-4 flex space-x-3">
                      <button 
                        onClick={handleUpdateSecurity}
                        disabled={updatingSecurity}
                        className="px-6 py-2 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {updatingSecurity && (
                          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        )}
                        <span>{updatingSecurity ? 'Updating...' : 'Update'}</span>
                      </button>
                      <button 
                        onClick={() => {
                          setEditingPassword(false);
                          setSecurityFormData({
                            ...securityFormData,
                            password: '',
                            confirmPassword: '',
                          });
                          setShowPassword(false);
                          setShowConfirmPassword(false);
                          setError(null);
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-6">
              {/* KYC Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <p className="text-gray-600 mb-4">To maintain a secure and compliant trading environment, identity verification is required.</p>
                <p className="text-gray-600">Complete your KYC steps to unlock full access including deposits, trading, and withdrawals.</p>
              </div>

              {/* Step 1: Confirm Trading Account */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">1</div>
                    <h3 className="text-lg font-semibold text-[#0A2E1D]">Confirm Trading Account</h3>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    profileDetails.verificationStatus === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profileDetails.verificationStatus === 'verified' ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-900 font-medium mb-2">
                    {activeAccount?.account_uid || tradingId || 'No trading account found'}
                  </p>
                  {profileDetails.verificationStatus !== 'verified' && (
                    <p className="text-sm text-yellow-600">Please complete KYC verification to unlock full access.</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Account Verification</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Update your full profile securely.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Deposit funds without restrictions.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Open demo and real trading accounts.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Transfer funds internally.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Create support ticket for assistance.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    profileDetails.verificationStatus === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profileDetails.verificationStatus === 'verified' ? 'Completed' : 'In Progress'}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agreements' && (
            <div className="space-y-6">
              {/* Agreements Description */}
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <p className="text-gray-600">Stay informed and compliant; review all legal agreements linked to your profile.</p>
              </div>

              {/* Agreements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Terms & Conditions */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Cookies Policy */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍪</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Cookies Policy</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>

                {/* Risk Disclosure */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="text-[#A0C8A9] group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2">Risk Disclosure</h3>
                  <p className="text-sm text-gray-500 font-medium">PDF</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6">
              {/* Calculator Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Exchange Rate */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Exchange Rate</h3>
                  <p className="text-sm text-gray-600 text-center">Convert between different currencies using live exchange rates</p>
                </div>

                {/* Pip Value */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💰</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Pip Value</h3>
                  <p className="text-sm text-gray-600 text-center">Calculate the monetary value of pips based on position size</p>
                </div>

                {/* Margin */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">💻</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Margin</h3>
                  <p className="text-sm text-gray-600 text-center">Determine required margin based on lot size and leverage</p>
                </div>

                {/* Position Size */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Position Size</h3>
                  <p className="text-sm text-gray-600 text-center">Find the optimal position size based on your risk parameters</p>
                </div>

                {/* Profit/Loss */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">📈</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Profit/Loss</h3>
                  <p className="text-sm text-gray-600 text-center">Calculate potential profit or loss for a forex position</p>
                </div>

                {/* Swap */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">🕒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Swap</h3>
                  <p className="text-sm text-gray-600 text-center">Determine overnight fees for holding positions</p>
                </div>

                {/* Risk/Reward */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">⚖️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Risk/Reward</h3>
                  <p className="text-sm text-gray-600 text-center">Analyze the risk/reward ratio of your trade setups</p>
                </div>

                {/* Lot Size Converter */}
                <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
                    <span className="text-3xl text-[#0A2E1D]">🔄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Lot Size Converter</h3>
                  <p className="text-sm text-gray-600 text-center">Convert between standard, mini, and micro lots</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#0A2E1D]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9]"></div>
          <p className="mt-2 text-[#A0C8A9]">Loading settings...</p>
        </div>
      </div>
    }>
      <SettingsPageContent />
    </Suspense>
  );
}
