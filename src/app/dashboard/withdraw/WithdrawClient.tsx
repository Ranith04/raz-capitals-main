'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { TradingAccount } from '@/types';

interface WithdrawalStats {
  availableBalance: number;
  pendingWithdrawals: number;
  totalWithdrawn: number;
}

interface Transaction {
  id: number;
  type: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  account_id: string;
  mode_of_payment?: string;
  transaction_comments?: string;
}

export default function WithdrawClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>('');
  const [stats, setStats] = useState<WithdrawalStats>({
    availableBalance: 0,
    pendingWithdrawals: 0,
    totalWithdrawn: 0,
  });
  const [recentWithdrawals, setRecentWithdrawals] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Bank details form fields
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID (same logic as My Accounts page)
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
        console.error('Error fetching trading accounts:', accountsError);
        setError('Failed to fetch accounts. Please try again.');
        setLoading(false);
        return;
      }

      if (tradingAccounts && tradingAccounts.length > 0) {
        const transformedAccounts: TradingAccount[] = tradingAccounts.map((account: any) => ({
          id: account.id,
          account_uid: account.account_uid,
          account_password: account.account_password,
          levarage: account.levarage || 0,
          balance: account.balance || 0,
          currency: account.currency || 'USD',
          status: account.status || 'active',
          created_at: account.created_at,
          free_margin: account.free_margin || 0,
          equity: account.equity || account.balance || 0,
          user_id: account.user_id,
          margin: account.margin || 0,
          watchlist: account.watchlist || [],
          account_type: account.account_type || 'standard',
        }));

        setAccounts(transformedAccounts);
        
        // Set default selected account
        if (transformedAccounts.length > 0) {
          setSelectedAccountId(transformedAccounts[0].account_uid);
        }

        // Calculate available balance (sum of equity from all accounts)
        const availableBalance = transformedAccounts.reduce(
          (sum, acc) => sum + (acc.equity || acc.balance || 0),
          0
        );

        // Get all account UIDs for this user
        const accountUids = transformedAccounts.map(acc => acc.account_uid);

        // Fetch withdrawal transactions for user's accounts
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('type', 'withdrawal')
          .in('account_id', accountUids)
          .order('created_at', { ascending: false });

        if (transactionsError) {
          console.error('Error fetching transactions:', transactionsError);
        } else if (transactions) {
          // Calculate pending withdrawals
          const pending = transactions
            .filter(tx => tx.status === 'pending')
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);

          // Calculate total withdrawn this month (completed withdrawals)
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const totalWithdrawn = transactions
            .filter(tx => 
              tx.status === 'completed' && 
              new Date(tx.created_at) >= startOfMonth
            )
            .reduce((sum, tx) => sum + (tx.amount || 0), 0);

          setStats({
            availableBalance,
            pendingWithdrawals: pending,
            totalWithdrawn,
          });

          // Set recent withdrawals (last 5)
          setRecentWithdrawals(transactions.slice(0, 5));
        } else {
          setStats({
            availableBalance,
            pendingWithdrawals: 0,
            totalWithdrawn: 0,
          });
        }
      } else {
        setAccounts([]);
        setStats({
          availableBalance: 0,
          pendingWithdrawals: 0,
          totalWithdrawn: 0,
        });
      }
    } catch (err) {
      console.error('Exception while fetching data:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'standard': 'Standard Trading Account',
      'premium': 'Premium Trading Account',
      'vip': 'VIP Trading Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
  };

  const formatPaymentMethod = (method?: string): string => {
    if (!method) return 'Unknown';
    return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed') {
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          Completed
        </span>
      );
    } else if (statusLower === 'pending') {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
          Processing
        </span>
      );
    } else if (statusLower === 'failed') {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
          Failed
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
          {status || 'Pending'}
        </span>
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccountId || !withdrawalAmount || !withdrawalMethod) {
      setError('Please fill in all required fields.');
      return;
    }

    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }

    // Check minimum and maximum
    if (amount < 50) {
      setError('Minimum withdrawal amount is $50.');
      return;
    }

    if (amount > 10000) {
      setError('Maximum withdrawal amount is $10,000 per day.');
      return;
    }

    // Check if selected account has sufficient balance
    const selectedAccount = accounts.find(acc => acc.account_uid === selectedAccountId);
    if (!selectedAccount) {
      setError('Selected account not found.');
      return;
    }

    const availableBalance = selectedAccount.equity || selectedAccount.balance || 0;
    if (amount > availableBalance) {
      setError(`Insufficient balance. Available: ${formatCurrency(availableBalance, selectedAccount.currency)}`);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Create withdrawal transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          type: 'withdrawal',
          amount: amount,
          currency: selectedAccount.currency || 'USD',
          status: 'pending',
          account_id: selectedAccountId,
          mode_of_payment: withdrawalMethod,
          transaction_comments: `Withdrawal request from ${formatAccountType(selectedAccount.account_type)} - Account ${selectedAccountId}`,
        })
        .select()
        .single();

      if (transactionError) {
        console.error('Error creating withdrawal:', transactionError);
        setError('Failed to submit withdrawal request. Please try again.');
        return;
      }

      // Success - reset form and refresh data
      setWithdrawalAmount('');
      setWithdrawalMethod('');
      setBankDetails({
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
      });
      
      // Refresh data to show new transaction
      await fetchUserData();
      
      alert('Withdrawal request submitted successfully! It will be processed within 1-5 business days.');
    } catch (err) {
      console.error('Exception while submitting withdrawal:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
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
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="font-medium">Withdraw</span>
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
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Withdraw Content */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">Withdraw Funds</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">Securely withdraw your funds from your trading account.</p>
          </div>

          {/* Account Balance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Available Balance</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(stats.availableBalance, accounts[0]?.currency || 'USD')}
                </p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Ready for Withdrawal</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Pending Withdrawals</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(stats.pendingWithdrawals, accounts[0]?.currency || 'USD')}
                </p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Processing</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Withdrawn</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(stats.totalWithdrawn, accounts[0]?.currency || 'USD')}
                </p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">This Month</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Withdrawal Form */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Withdrawal Request</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mb-4"></div>
                  <p className="text-[#A0C8A9]">Loading...</p>
                </div>
              </div>
            ) : accounts.length === 0 ? (
              <div className="bg-[#B8D4C1] rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-[#2D4A35] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-[#1E2E23] font-medium mb-2">No trading accounts found</p>
                <p className="text-[#2D4A35] text-sm mb-4">You need a trading account to make withdrawals.</p>
                <a href="/dashboard/new-account" className="inline-block bg-[#A0C8A9] text-[#1E2E23] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8FB89A] transition-colors">
                  Create New Account
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">From Account</label>
                    <select 
                      value={selectedAccountId}
                      onChange={(e) => setSelectedAccountId(e.target.value)}
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                      required
                    >
                      {accounts.map((account) => (
                        <option key={account.id} value={account.account_uid}>
                          {formatAccountType(account.account_type)} - {formatCurrency(account.equity || account.balance || 0, account.currency)} (Account: {account.account_uid})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Amount ({accounts.find(acc => acc.account_uid === selectedAccountId)?.currency || 'USD'})</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="50"
                      max="10000"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="Enter withdrawal amount"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      required
                    />
                    <p className="text-[#A0C8A9]/70 text-xs mt-1">Minimum: $50, Maximum: $10,000 per day</p>
                    {selectedAccountId && (() => {
                      const selectedAccount = accounts.find(acc => acc.account_uid === selectedAccountId);
                      const available = selectedAccount?.equity || selectedAccount?.balance || 0;
                      return (
                        <p className="text-[#A0C8A9]/70 text-xs mt-1">
                          Available: {formatCurrency(available, selectedAccount?.currency || 'USD')}
                        </p>
                      );
                    })()}
                  </div>
                </div>

              <div>
                <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Withdrawal Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input 
                      type="radio" 
                      name="method" 
                      value="Bank_Transfer" 
                      checked={withdrawalMethod === 'Bank_Transfer'}
                      onChange={(e) => setWithdrawalMethod(e.target.value)}
                      className="mr-3" 
                      required
                    />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">Bank Transfer</span>
                      <p className="text-[#2D4A35] text-xs">3-5 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors">
                    <input 
                      type="radio" 
                      name="method" 
                      value="PayPal" 
                      checked={withdrawalMethod === 'PayPal'}
                      onChange={(e) => setWithdrawalMethod(e.target.value)}
                      className="mr-3" 
                      required
                    />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">PayPal</span>
                      <p className="text-[#2D4A35] text-xs">1-2 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-[#B8D4C1] rounded-lg cursor-pointer hover:bg-[#A0C8A9] transition-colors md:col-span-3 lg:col-span-1">
                    <input 
                      type="radio" 
                      name="method" 
                      value="Cryptocurrency" 
                      checked={withdrawalMethod === 'Cryptocurrency'}
                      onChange={(e) => setWithdrawalMethod(e.target.value)}
                      className="mr-3" 
                      required
                    />
                    <div>
                      <span className="text-[#1E2E23] font-medium text-sm">Cryptocurrency</span>
                      <p className="text-[#2D4A35] text-xs">10-30 minutes</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Bank Details - Show only if Bank Transfer is selected */}
              {withdrawalMethod === 'Bank_Transfer' && (
                <div className="space-y-4 border-t border-[#A0C8A9]/20 pt-4">
                  <h4 className="text-[#A0C8A9] font-medium">Bank Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account Holder Name</label>
                      <input 
                        type="text" 
                        value={bankDetails.accountHolderName}
                        onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                        placeholder="Full name as on bank account"
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Bank Name</label>
                      <input 
                        type="text" 
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                        placeholder="Name of the bank"
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Account Number</label>
                      <input 
                        type="text" 
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                        placeholder="Bank account number"
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Routing Number</label>
                      <input 
                        type="text" 
                        value={bankDetails.routingNumber}
                        onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                        placeholder="Bank routing number"
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#A0C8A9] text-[#1E2E23] py-3 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Withdrawal Request'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setWithdrawalAmount('');
                    setWithdrawalMethod('');
                    setBankDetails({
                      accountHolderName: '',
                      bankName: '',
                      accountNumber: '',
                      routingNumber: '',
                    });
                    setError(null);
                  }}
                  className="px-6 py-3 border border-[#A0C8A9] text-[#A0C8A9] rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
            )}
          </div>

          {/* Recent Withdrawals */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4">Recent Withdrawals</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#A0C8A9] mb-2"></div>
                  <p className="text-[#A0C8A9] text-sm">Loading...</p>
                </div>
              </div>
            ) : recentWithdrawals.length === 0 ? (
              <div className="bg-[#B8D4C1] rounded-lg p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-[#2D4A35] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#1E2E23] font-medium text-sm">No withdrawal history</p>
                <p className="text-[#2D4A35] text-xs mt-1">Your recent withdrawals will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentWithdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                    <div>
                      <p className="font-medium text-[#1E2E23] text-sm sm:text-base">
                        {formatCurrency(withdrawal.amount || 0, withdrawal.currency || 'USD')}
                      </p>
                      <p className="text-xs sm:text-sm text-[#2D4A35]">
                        {formatPaymentMethod(withdrawal.mode_of_payment)} - {formatDate(withdrawal.created_at)}
                      </p>
                      {withdrawal.transaction_comments && (
                        <p className="text-xs text-[#2D4A35]/70 mt-1 truncate">
                          {withdrawal.transaction_comments}
                        </p>
                      )}
                    </div>
                    {getStatusBadge(withdrawal.status)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
