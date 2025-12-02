'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { TradingAccount } from '@/types';

interface DepositMethod {
  id: string;
  title: string;
  icon: JSX.Element;
  processingTime: string;
  fee: string;
  limits: string;
  minAmount: number;
  maxAmount: number;
  available: boolean;
}

export default function DepositClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Deposit form state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const depositMethods: DepositMethod[] = [
    {
      id: 'cash',
      title: 'Cash Payments',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0A2E1D]">100</span>
          </div>
        </div>
      ),
      processingTime: 'Instant On Payment',
      fee: '0',
      limits: '10 - 5000000 USD',
      minAmount: 10,
      maxAmount: 5000000,
      available: true
    },
    {
      id: 'upi',
      title: 'Pay Through UPI-ID/QR',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>
      ),
      processingTime: 'Instant On Payment',
      fee: '0',
      limits: '10 - 5000000 USD',
      minAmount: 10,
      maxAmount: 5000000,
      available: true
    },
    {
      id: 'bank-transfer',
      title: 'Bank Transfer',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      ),
      processingTime: '1-3 Business Days',
      fee: '0',
      limits: '100 - 10000000 USD',
      minAmount: 100,
      maxAmount: 10000000,
      available: true
    },
    {
      id: 'credit-card',
      title: 'Credit Card',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
      ),
      processingTime: 'Instant',
      fee: '2.5%',
      limits: '50 - 50000 USD',
      minAmount: 50,
      maxAmount: 50000,
      available: true
    }
  ];

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  const fetchUserAccounts = async () => {
    try {
      setLoading(true);
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

      // Fetch user's trading accounts
      const { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
        setError('Failed to load trading accounts.');
      } else if (tradingAccounts) {
        setAccounts(tradingAccounts);
        if (tradingAccounts.length > 0) {
          setSelectedAccountId(tradingAccounts[0].account_uid);
        }
      }
    } catch (err) {
      console.error('Exception while fetching accounts:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepositClick = (method: DepositMethod) => {
    if (accounts.length === 0) {
      setError('Please create a trading account first.');
      return;
    }
    setSelectedMethod(method);
    setShowDepositModal(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setSelectedMethod(null);
    setDepositAmount('');
    setPaymentDetails('');
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmitDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethod || !selectedAccountId || !depositAmount) {
      setError('Please fill in all required fields.');
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid deposit amount.');
      return;
    }

    // Validate amount limits
    if (amount < selectedMethod.minAmount) {
      setError(`Minimum deposit amount is $${selectedMethod.minAmount}.`);
      return;
    }

    if (amount > selectedMethod.maxAmount) {
      setError(`Maximum deposit amount is $${selectedMethod.maxAmount}.`);
      return;
    }

    const selectedAccount = accounts.find(acc => acc.account_uid === selectedAccountId);
    if (!selectedAccount) {
      setError('Selected account not found.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Calculate fee if applicable
      let finalAmount = amount;
      if (selectedMethod.fee.includes('%')) {
        const feePercent = parseFloat(selectedMethod.fee.replace('%', ''));
        const feeAmount = (amount * feePercent) / 100;
        finalAmount = amount + feeAmount;
      }

      // Create deposit transaction in Supabase
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          type: 'deposit',
          amount: amount,
          currency: selectedAccount.currency || 'USD',
          status: 'pending',
          account_id: selectedAccountId,
          mode_of_payment: selectedMethod.id,
          transaction_comments: paymentDetails || `Deposit via ${selectedMethod.title} - Account ${selectedAccountId}`,
        })
        .select()
        .single();

      if (transactionError) {
        console.error('Error creating deposit:', transactionError);
        setError('Failed to submit deposit request. Please try again.');
        return;
      }

      // Success
      setSuccessMessage(`Deposit request submitted successfully! Amount: $${amount.toFixed(2)}. Your deposit will be processed and credited to your account once approved.`);
      setDepositAmount('');
      setPaymentDetails('');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    } catch (err) {
      console.error('Exception while submitting deposit:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'standard': 'Standard Account',
      'premium': 'Premium Account',
      'vip': 'VIP Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
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
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="font-medium">Deposit</span>
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
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
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
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Deposit Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0A2E1D] mb-3">Deposits</h1>
            <p className="text-lg text-[#2D4A35]">Choose your preferred deposit method</p>
          </div>

          {/* Deposit Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {depositMethods.map((method) => (
              <div key={method.id} className="bg-[#0A2E1D] border border-[#A0C8A9]/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative">
                {/* Available Badge */}
                {method.available && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-[#A0C8A9] text-[#0A2E1D] rounded-full">
                    Available
                  </span>
                )}

                {/* Method Header */}
                <div className="flex items-center space-x-4 mb-6">
                  {method.icon}
                  <h2 className="text-xl font-bold text-white flex-1">{method.title}</h2>
                </div>

                {/* Method Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Processing Time</p>
                    <p className="text-base font-semibold text-white">{method.processingTime}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Fee</p>
                    <p className="text-base font-semibold text-white">
                      {method.fee.includes('%') ? method.fee : `$${method.fee}`}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Limits</p>
                    <p className="text-base font-semibold text-white">{method.limits}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleDepositClick(method)}
                  disabled={!method.available || accounts.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-lg shadow-md ${
                    method.available && accounts.length > 0
                      ? 'bg-[#A0C8A9] text-[#0A2E1D] hover:bg-[#8BBF9F]'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Deposit
                </button>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2E1D]"></div>
              <p className="mt-4 text-[#2D4A35]">Loading deposit methods...</p>
            </div>
          )}

          {/* No Accounts Message */}
          {!loading && accounts.length === 0 && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800 mb-4">You need to create a trading account before making a deposit.</p>
                <a href="/dashboard/new-account" className="inline-block px-6 py-2 bg-[#0A2E1D] text-white rounded-lg hover:bg-[#1A3E2D] transition-colors">
                  Create Account
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && selectedMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Deposit via {selectedMethod.title}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Deposit Form */}
              <form onSubmit={handleSubmitDeposit} className="space-y-4">
                {/* Account Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Account
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white"
                    required
                  >
                    {accounts.map((account) => (
                      <option key={account.account_uid} value={account.account_uid} className="text-gray-900">
                        {formatAccountType(account.account_type)} - {formatCurrency(account.balance || 0, account.currency)} (Account: {account.account_uid})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Deposit Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min={selectedMethod.minAmount}
                    max={selectedMethod.maxAmount}
                    step="0.01"
                    placeholder={`Min: $${selectedMethod.minAmount} - Max: $${selectedMethod.maxAmount}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-600">
                    Limits: {selectedMethod.limits}
                  </p>
                  {selectedMethod.fee !== '0' && (
                    <p className="mt-1 text-xs text-orange-600 font-medium">
                      Fee: {selectedMethod.fee} will be added to your deposit
                    </p>
                  )}
                </div>

                {/* Payment Details (for specific methods) */}
                {(selectedMethod.id === 'upi' || selectedMethod.id === 'bank-transfer') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {selectedMethod.id === 'upi' ? 'UPI ID or Transaction Reference' : 'Transaction Reference Number'}
                    </label>
                    <input
                      type="text"
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder={selectedMethod.id === 'upi' ? 'Enter your UPI ID or transaction reference' : 'Enter bank transaction reference'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                )}

                {/* Method Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Processing Time:</span>
                    <span className="font-semibold text-gray-900">{selectedMethod.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Fee:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMethod.fee.includes('%') ? selectedMethod.fee : `$${selectedMethod.fee}`}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-[#0A2E1D] text-white font-semibold rounded-lg hover:bg-[#1A3E2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {submitting ? 'Submitting...' : 'Submit Deposit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
