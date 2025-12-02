'use client';

import UserInitial from '@/components/UserInitial';
import UserName from '@/components/UserName';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';

interface UserProfile {
  id: number;
  user_uuid: string;
  email: string;
  kyc_status?: string;
  account_status?: string;
  created_at: string;
}

interface KYCDocument {
  id: number;
  user_id: string;
  document_type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploaded_at: string;
  reviewed_at?: string;
}

export default function KYCPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [kycDocuments, setKycDocuments] = useState<KYCDocument[]>([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserKYCData();
  }, []);

  const fetchUserKYCData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
        // Check if email is verified
        setEmailVerified(authUser.email_confirmed_at !== null);
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
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
        setError('No user session found. Please log in again.');
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
      }

      // Fetch KYC documents
      const { data: kycData, error: kycError } = await supabase
        .from('kyc_documents')
        .select('*')
        .eq('user_id', userId)
        .order('uploaded_at', { ascending: false });

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      } else if (kycData) {
        setKycDocuments(kycData);
      }

      // If no email verified from auth, check from profile
      if (!emailVerified && profileData?.email) {
        // Check if user has verified email by checking if they have any completed transactions or accounts
        // For now, we'll assume email is verified if user exists
        setEmailVerified(true);
      }
    } catch (err) {
      console.error('Exception while fetching KYC data:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIdentityVerificationStatus = (): 'pending' | 'verified' | 'rejected' | 'not_started' => {
    if (kycDocuments.length === 0) {
      return 'not_started';
    }
    
    // Check if any document is verified
    const hasVerified = kycDocuments.some(doc => doc.status === 'verified');
    if (hasVerified) {
      return 'verified';
    }
    
    // Check if any document is rejected
    const hasRejected = kycDocuments.some(doc => doc.status === 'rejected');
    if (hasRejected) {
      return 'rejected';
    }
    
    // Otherwise pending
    return 'pending';
  };

  const handleBack = () => {
    router.push('/dashboard/settings');
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
        {/* Logo */}
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
            
            <a href="/dashboard/wallets" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Wallets</span>
            </a>
            
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            
            <a href="/dashboard/new-account" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>New Account</span>
            </a>
            
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
            </a>
            
            <a href="/dashboard/transfer" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transfer</span>
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
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-black px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Left side - Mobile Menu, Back Button, and Title */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="w-10 h-10 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
                title="Go back to Dashboard"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              
              {/* Page Title */}
              <h1 className="text-lg sm:text-xl font-medium text-white">KYC Verification Center</h1>
            </div>
            
            {/* Right side - User Info and Icons */}
            <div className="flex items-center space-x-4">
              {/* User Name - Hidden on mobile, shown on desktop */}
              <h1 className="hidden lg:block text-lg sm:text-xl font-medium text-white">
                <UserName fallback="User" />
              </h1>
              
              {/* Full Screen Toggle */}
              <button 
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
                className="text-white hover:text-gray-300 p-2 transition-colors"
                title="Toggle Full Screen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Notification Bell */}
              <button 
                onClick={() => router.push('/dashboard/notifications')}
                className="text-white hover:text-gray-300 p-2 transition-colors relative"
                title="View notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-semibold">1</span>
              </button>

              {/* Profile Avatar */}
              <button className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <UserInitial className="text-black font-bold text-sm" fallback="U" />
              </button>
            </div>
          </div>
        </div>

        {/* KYC Content - Scrollable */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto">
            {/* KYC Description */}
            <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
              <p className="text-gray-600 mb-4">To maintain a secure and compliant trading environment, identity verification is required.</p>
              <p className="text-gray-600">Complete your KYC steps to unlock full access including deposits, trading, and withdrawals.</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2E1D]"></div>
                  <p className="mt-2 text-gray-600">Loading KYC information...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Step 1: Confirm Email */}
            {!loading && (
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">1</div>
                    <h3 className="text-lg font-semibold text-[#0A2E1D]">Confirm Email</h3>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    emailVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {emailVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-900 font-medium mb-2">
                    {userProfile?.email || 'No email found'}
                  </p>
                  {!emailVerified && (
                    <p className="text-sm text-yellow-600">
                      Please verify your email address to continue.
                    </p>
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
                    emailVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {emailVerified ? 'Completed' : 'In Progress'}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Automated</span>
                </div>
              </div>
            )}

            {/* Step 2: Verify Identity */}
            {!loading && (
              <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#A0C8A9] rounded-full flex items-center justify-center text-[#0A2E1D] font-bold">2</div>
                    <h3 className="text-lg font-semibold text-[#0A2E1D]">Verify your identity using Sumsub</h3>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    getIdentityVerificationStatus() === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : getIdentityVerificationStatus() === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {getIdentityVerificationStatus() === 'verified' 
                      ? 'Verified' 
                      : getIdentityVerificationStatus() === 'rejected'
                      ? 'Rejected'
                      : getIdentityVerificationStatus() === 'pending'
                      ? 'Pending'
                      : 'Automated'}
                  </span>
                </div>
                
                <div className="mb-4">
                  {getIdentityVerificationStatus() === 'not_started' && (
                    <>
                      <p className="text-gray-600 mb-2">Provide a document confirming your name</p>
                      <p className="text-gray-600">Verify your details please</p>
                    </>
                  )}
                  {getIdentityVerificationStatus() === 'pending' && (
                    <>
                      <p className="text-yellow-600 mb-2 font-medium">Your identity verification is under review</p>
                      <p className="text-gray-600">We are currently reviewing your submitted documents. You will be notified once the verification is complete.</p>
                    </>
                  )}
                  {getIdentityVerificationStatus() === 'verified' && (
                    <>
                      <p className="text-green-600 mb-2 font-medium">✓ Your identity has been verified</p>
                      <p className="text-gray-600">Verification completed on {kycDocuments.find(d => d.status === 'verified')?.reviewed_at ? new Date(kycDocuments.find(d => d.status === 'verified')!.reviewed_at!).toLocaleDateString() : 'N/A'}</p>
                    </>
                  )}
                  {getIdentityVerificationStatus() === 'rejected' && (
                    <>
                      <p className="text-red-600 mb-2 font-medium">Your identity verification was rejected</p>
                      <p className="text-gray-600">Please review the rejection reason and resubmit your documents.</p>
                    </>
                  )}
                </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-md font-medium text-[#0A2E1D] mb-3">Privileges of Profile Verification</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Withdraw funds from verified accounts.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Make external transfers securely.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Get approved for higher trading limits.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Unlock advanced account features.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Faster processing of requests and reviews.</span>
                  </li>
                </ul>
              </div>

                {getIdentityVerificationStatus() !== 'verified' && (
                  <div className="flex justify-end">
                    <button 
                      onClick={() => {
                        // TODO: Integrate with Sumsub API
                        alert('Sumsub integration will be implemented here');
                      }}
                      className="px-6 py-3 bg-[#0A2E1D] text-white rounded-md hover:bg-[#1A3E2D] transition-colors font-medium"
                    >
                      {getIdentityVerificationStatus() === 'not_started' 
                        ? 'Go to Sumsub' 
                        : getIdentityVerificationStatus() === 'rejected'
                        ? 'Resubmit Documents'
                        : 'View Status'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}